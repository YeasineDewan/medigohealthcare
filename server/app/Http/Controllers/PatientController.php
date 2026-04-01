<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\Appointment;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class PatientController extends Controller
{
    /**
     * Display a listing of patients
     */
    public function index(Request $request)
    {
        $query = Patient::query();

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('primary_physician', 'like', "%{$search}%")
                  ->orWhere('insurance', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by blood type
        if ($request->has('blood_type') && $request->blood_type !== 'all') {
            $query->where('blood_type', $request->blood_type);
        }

        // Sort functionality
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');
        
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $patients = $query->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $patients,
            'message' => 'Patients retrieved successfully'
        ], 200);
    }

    /**
     * Store a newly created patient
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email',
            'phone' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'blood_type' => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_phone' => 'required|string|max:20',
            'primary_physician' => 'required|string|max:255',
            'insurance_provider' => 'required|string|max:255',
            'policy_number' => 'required|string|max:255',
            'allergies' => 'nullable|array',
            'chronic_conditions' => 'nullable|array',
            'medications' => 'nullable|array',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $patientData = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'date_of_birth' => $request->date_of_birth,
                'gender' => $request->gender,
                'blood_type' => $request->blood_type,
                'age' => $this->calculateAge($request->date_of_birth),
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'zip_code' => $request->zip_code,
                'country' => $request->country,
                'emergency_contact_name' => $request->emergency_contact_name,
                'emergency_contact_phone' => $request->emergency_contact_phone,
                'primary_physician' => $request->primary_physician,
                'insurance_provider' => $request->insurance_provider,
                'policy_number' => $request->policy_number,
                'allergies' => json_encode($request->allergies ?? []),
                'chronic_conditions' => json_encode($request->chronic_conditions ?? []),
                'medications' => json_encode($request->medications ?? []),
                'status' => 'active',
                'registration_date' => now()->format('Y-m-d'),
                'last_visit' => 'Not visited yet',
                'outstanding_balance' => 0,
                'bmi' => $request->bmi ?? 'N/A',
            ];

            // Handle profile image upload
            if ($request->hasFile('profile_image')) {
                $image = $request->file('profile_image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/patients'), $imageName);
                $patientData['profile_image'] = 'images/patients/' . $imageName;
            }

            $patient = Patient::create($patientData);

            return response()->json([
                'success' => true,
                'message' => 'Patient created successfully',
                'data' => $patient
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Patient creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified patient
     */
    public function show($id)
    {
        try {
            $patient = Patient::with(['appointments', 'medicalRecords', 'vitalSigns'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $patient,
                'message' => 'Patient retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Patient not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified patient
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:patients,email,' . $id,
            'phone' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female,other',
            'blood_type' => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'zip_code' => 'required|string|max:20',
            'country' => 'required|string|max:255',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_phone' => 'required|string|max:20',
            'primary_physician' => 'required|string|max:255',
            'insurance_provider' => 'required|string|max:255',
            'policy_number' => 'required|string|max:255',
            'allergies' => 'nullable|array',
            'chronic_conditions' => 'nullable|array',
            'medications' => 'nullable|array',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $patient = Patient::findOrFail($id);

            $patientData = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'date_of_birth' => $request->date_of_birth,
                'gender' => $request->gender,
                'blood_type' => $request->blood_type,
                'age' => $this->calculateAge($request->date_of_birth),
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'zip_code' => $request->zip_code,
                'country' => $request->country,
                'emergency_contact_name' => $request->emergency_contact_name,
                'emergency_contact_phone' => $request->emergency_contact_phone,
                'primary_physician' => $request->primary_physician,
                'insurance_provider' => $request->insurance_provider,
                'policy_number' => $request->policy_number,
                'allergies' => json_encode($request->allergies ?? []),
                'chronic_conditions' => json_encode($request->chronic_conditions ?? []),
                'medications' => json_encode($request->medications ?? []),
            ];

            // Handle profile image update
            if ($request->hasFile('profile_image')) {
                // Delete old image if exists
                if ($patient->profile_image) {
                    $oldImagePath = public_path($patient->profile_image);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                $image = $request->file('profile_image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/patients'), $imageName);
                $patientData['profile_image'] = 'images/patients/' . $imageName;
            }

            $patient->update($patientData);

            return response()->json([
                'success' => true,
                'message' => 'Patient updated successfully',
                'data' => $patient
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Patient update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified patient
     */
    public function destroy($id)
    {
        try {
            $patient = Patient::findOrFail($id);

            // Delete profile image if exists
            if ($patient->profile_image) {
                $imagePath = public_path($patient->profile_image);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }

            $patient->delete();

            return response()->json([
                'success' => true,
                'message' => 'Patient deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Patient deletion failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get patient's appointments
     */
    public function appointments($id, Request $request)
    {
        try {
            $patient = Patient::findOrFail($id);
            $appointments = $patient->appointments()
                ->with('doctor')
                ->orderBy('appointment_date', 'desc')
                ->paginate($request->get('per_page', 10));

            return response()->json([
                'success' => true,
                'data' => $appointments,
                'message' => 'Patient appointments retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve appointments',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get patient's medical records
     */
    public function medicalRecords($id, Request $request)
    {
        try {
            $patient = Patient::findOrFail($id);
            $medicalRecords = $patient->medicalRecords()
                ->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 10));

            return response()->json([
                'success' => true,
                'data' => $medicalRecords,
                'message' => 'Patient medical records retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve medical records',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Calculate age from date of birth
     */
    private function calculateAge($dateOfBirth)
    {
        $birthDate = new \DateTime($dateOfBirth);
        $today = new \DateTime();
        $age = $today->diff($birthDate)->y;
        
        return $age;
    }
}
