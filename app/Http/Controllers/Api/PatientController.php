<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class PatientController extends Controller
{
    public function index(Request $request)
    {
        $query = Patient::with('user');

        // Apply filters
        if ($request->search) {
            $query->whereHas('user', function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->blood_group) {
            $query->where('blood_group', $request->blood_group);
        }

        if ($request->gender) {
            $query->where('gender', $request->gender);
        }

        if ($request->city) {
            $query->where('city', $request->city);
        }

        if ($request->is_active !== null) {
            $query->where('is_active', $request->is_active);
        }

        $patients = $query->orderBy('created_at', 'desc')
                         ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $patients,
            'message' => 'Patients retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'required|string|max:20|unique:patients,phone',
            'gender' => 'required|in:male,female,other',
            'date_of_birth' => 'required|date|before:today',
            'blood_group' => 'nullable|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_phone' => 'required|string|max:20',
            'emergency_contact_relation' => 'required|string|max:100',
            'medical_history' => 'nullable|array',
            'family_history' => 'nullable|array',
            'medications' => 'nullable|array',
            'allergies' => 'nullable|array',
            'insurance_info' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        // Create user account
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'patient',
            'phone' => $request->phone,
            'gender' => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'address' => $request->address,
            'city' => $request->city,
            'is_active' => true,
            'email_verified' => false,
            'phone_verified' => false,
        ]);

        // Generate unique patient ID
        $patientId = 'PAT' . date('Ymd') . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);

        // Create patient profile
        $patient = Patient::create([
            'user_id' => $user->id,
            'patient_id' => $patientId,
            'blood_group' => $request->blood_group,
            'gender' => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'phone' => $request->phone,
            'alternate_phone' => $request->alternate_phone,
            'address' => $request->address,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'emergency_contact_name' => $request->emergency_contact_name,
            'emergency_contact_phone' => $request->emergency_contact_phone,
            'emergency_contact_relation' => $request->emergency_contact_relation,
            'medical_history' => $request->medical_history,
            'family_history' => $request->family_history,
            'medications' => $request->medications,
            'allergies' => $request->allergies,
            'insurance_info' => $request->insurance_info,
            'preferred_language' => $request->preferred_language ?? 'Bangla',
            'is_active' => true,
        ]);

        return response()->json([
            'success' => true,
            'data' => $patient->load('user'),
            'message' => 'Patient registered successfully'
        ], 201);
    }

    public function show($id)
    {
        $patient = Patient::with(['user', 'appointments.doctor.user', 'prescriptions.doctor.user', 'medicalRecords.doctor.user'])
                        ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $patient,
            'message' => 'Patient retrieved successfully'
        ]);
    }

    public function update(Request $request, $id)
    {
        $patient = Patient::findOrFail($id);
        $user = $patient->user;

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'phone' => 'sometimes|required|string|max:20|unique:patients,phone,' . $patient->id,
            'blood_group' => 'nullable|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'address' => 'sometimes|required|string|max:500',
            'city' => 'sometimes|required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'emergency_contact_name' => 'sometimes|required|string|max:255',
            'emergency_contact_phone' => 'sometimes|required|string|max:20',
            'emergency_contact_relation' => 'sometimes|required|string|max:100',
            'medical_history' => 'nullable|array',
            'family_history' => 'nullable|array',
            'medications' => 'nullable|array',
            'allergies' => 'nullable|array',
            'insurance_info' => 'nullable|array',
            'is_active' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        // Update user
        $user->update($request->only(['name', 'email', 'phone', 'address', 'city']));

        // Update patient
        $patient->update($request->except(['name', 'email']));

        return response()->json([
            'success' => true,
            'data' => $patient->fresh()->load('user'),
            'message' => 'Patient updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $patient = Patient::findOrFail($id);
        
        // Check if patient has active appointments
        if ($patient->appointments()->whereIn('status', ['pending', 'confirmed'])->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete patient with active appointments'
            ], 400);
        }

        $patient->delete();
        $patient->user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Patient deleted successfully'
        ]);
    }

    public function medicalHistory($id)
    {
        $patient = Patient::findOrFail($id);
        
        $medicalRecords = $patient->medicalRecords()
                                 ->with('doctor.user', 'hospital')
                                 ->orderBy('record_date', 'desc')
                                 ->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $medicalRecords,
            'message' => 'Medical history retrieved successfully'
        ]);
    }

    public function appointments($id, Request $request)
    {
        $patient = Patient::findOrFail($id);
        
        $query = $patient->appointments()
                        ->with('doctor.user', 'hospital');

        if ($request->status) {
            $query->byStatus($request->status);
        }

        if ($request->date_from) {
            $query->whereDate('appointment_datetime', '>=', $request->date_from);
        }

        if ($request->date_to) {
            $query->whereDate('appointment_datetime', '<=', $request->date_to);
        }

        $appointments = $query->orderBy('appointment_datetime', 'desc')
                             ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $appointments,
            'message' => 'Appointments retrieved successfully'
        ]);
    }

    public function prescriptions($id, Request $request)
    {
        $patient = Patient::findOrFail($id);
        
        $query = $patient->prescriptions()
                        ->with('doctor.user', 'hospital');

        if ($request->status) {
            $query->byStatus($request->status);
        }

        if ($request->date_from) {
            $query->whereDate('prescription_date', '>=', $request->date_from);
        }

        if ($request->date_to) {
            $query->whereDate('prescription_date', '<=', $request->date_to);
        }

        $prescriptions = $query->orderBy('prescription_date', 'desc')
                             ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $prescriptions,
            'message' => 'Prescriptions retrieved successfully'
        ]);
    }

    public function vitalSigns($id)
    {
        $patient = Patient::findOrFail($id);
        
        $vitalSigns = $patient->vital_signs ?? [];

        return response()->json([
            'success' => true,
            'data' => $vitalSigns,
            'message' => 'Vital signs retrieved successfully'
        ]);
    }

    public function updateVitalSigns(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'blood_pressure_systolic' => 'nullable|integer|min:0|max:300',
            'blood_pressure_diastolic' => 'nullable|integer|min:0|max:200',
            'heart_rate' => 'nullable|integer|min:0|max:300',
            'temperature' => 'nullable|numeric|min:30|max:45',
            'respiratory_rate' => 'nullable|integer|min:0|max:100',
            'oxygen_saturation' => 'nullable|integer|min:0|max:100',
            'weight' => 'nullable|numeric|min:0|max:500',
            'height' => 'nullable|numeric|min:0|max:300',
            'bmi' => 'nullable|numeric|min:0|max:100',
            'blood_sugar' => 'nullable|numeric|min:0|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $patient = Patient::findOrFail($id);
        
        $vitalSigns = $patient->vital_signs ?? [];
        $vitalSigns = array_merge($vitalSigns, $request->all());
        $vitalSigns['updated_at'] = now()->toISOString();

        $patient->update(['vital_signs' => $vitalSigns]);

        return response()->json([
            'success' => true,
            'data' => $patient->vital_signs,
            'message' => 'Vital signs updated successfully'
        ]);
    }

    public function statistics($id)
    {
        $patient = Patient::findOrFail($id);
        
        $totalAppointments = $patient->appointments()->count();
        $completedAppointments = $patient->appointments()->byStatus('completed')->count();
        $cancelledAppointments = $patient->appointments()->byStatus('cancelled')->count();
        $totalPrescriptions = $patient->prescriptions()->count();
        $totalMedicalRecords = $patient->medicalRecords()->count();
        
        $lastVisit = $patient->appointments()->byStatus('completed')->latest('appointment_datetime')->first();
        $lastVisitDate = $lastVisit ? $lastVisit->appointment_datetime->format('Y-m-d') : null;

        return response()->json([
            'success' => true,
            'data' => [
                'total_appointments' => $totalAppointments,
                'completed_appointments' => $completedAppointments,
                'cancelled_appointments' => $cancelledAppointments,
                'total_prescriptions' => $totalPrescriptions,
                'total_medical_records' => $totalMedicalRecords,
                'last_visit_date' => $lastVisitDate,
            ],
            'message' => 'Patient statistics retrieved successfully'
        ]);
    }

    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'required|string|min:2|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $patients = Patient::with('user')
                         ->whereHas('user', function($q) use ($request) {
                             $q->where('name', 'like', '%' . $request->query . '%')
                               ->orWhere('email', 'like', '%' . $request->query . '%');
                         })
                         ->orWhere('patient_id', 'like', '%' . $request->query . '%')
                         ->orWhere('phone', 'like', '%' . $request->query . '%')
                         ->limit(20)
                         ->get();

        return response()->json([
            'success' => true,
            'data' => $patients,
            'message' => 'Patients search completed successfully'
        ]);
    }
}
