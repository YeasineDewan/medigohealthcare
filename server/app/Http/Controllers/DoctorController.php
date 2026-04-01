<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class DoctorController extends Controller
{
    /**
     * Display a listing of doctors
     */
    public function index(Request $request)
    {
        $query = Doctor::query();

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('specialization', 'like', "%{$search}%")
                  ->orWhere('department', 'like', "%{$search}%");
            });
        }

        // Filter by department
        if ($request->has('department') && $request->department !== 'all') {
            $query->where('department', $request->department);
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Sort functionality
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');
        
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $doctors = $query->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $doctors,
            'message' => 'Doctors retrieved successfully'
        ], 200);
    }

    /**
     * Store a newly created doctor
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:doctors,email',
            'phone' => 'required|string|max:20',
            'specialization' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'experience' => 'required|integer|min:0',
            'education' => 'required|array',
            'license_number' => 'required|string|max:255',
            'consultation_fee' => 'required|numeric|min:0',
            'languages' => 'array',
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
            $doctorData = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'specialization' => $request->specialization,
                'department' => $request->department,
                'experience' => $request->experience,
                'education' => json_encode($request->education),
                'license_number' => $request->license_number,
                'consultation_fee' => $request->consultation_fee,
                'languages' => json_encode($request->languages ?? []),
                'status' => 'active',
                'join_date' => now()->format('Y-m-d'),
                'patients' => 0,
                'appointments' => 0,
                'availability' => 'Available',
                'rating' => 0.0,
            ];

            // Handle profile image upload
            if ($request->hasFile('profile_image')) {
                $image = $request->file('profile_image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/doctors'), $imageName);
                $doctorData['profile_image'] = 'images/doctors/' . $imageName;
            }

            $doctor = Doctor::create($doctorData);

            return response()->json([
                'success' => true,
                'message' => 'Doctor created successfully',
                'data' => $doctor
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified doctor
     */
    public function show($id)
    {
        try {
            $doctor = Doctor::with(['appointments', 'patients'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $doctor,
                'message' => 'Doctor retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified doctor
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:doctors,email,' . $id,
            'phone' => 'required|string|max:20',
            'specialization' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'experience' => 'required|integer|min:0',
            'education' => 'required|array',
            'license_number' => 'required|string|max:255',
            'consultation_fee' => 'required|numeric|min:0',
            'languages' => 'array',
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
            $doctor = Doctor::findOrFail($id);

            $doctorData = [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'specialization' => $request->specialization,
                'department' => $request->department,
                'experience' => $request->experience,
                'education' => json_encode($request->education),
                'license_number' => $request->license_number,
                'consultation_fee' => $request->consultation_fee,
                'languages' => json_encode($request->languages ?? []),
            ];

            // Handle profile image update
            if ($request->hasFile('profile_image')) {
                // Delete old image if exists
                if ($doctor->profile_image) {
                    $oldImagePath = public_path($doctor->profile_image);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                $image = $request->file('profile_image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images/doctors'), $imageName);
                $doctorData['profile_image'] = 'images/doctors/' . $imageName;
            }

            $doctor->update($doctorData);

            return response()->json([
                'success' => true,
                'message' => 'Doctor updated successfully',
                'data' => $doctor
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified doctor
     */
    public function destroy($id)
    {
        try {
            $doctor = Doctor::findOrFail($id);

            // Delete profile image if exists
            if ($doctor->profile_image) {
                $imagePath = public_path($doctor->profile_image);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }

            $doctor->delete();

            return response()->json([
                'success' => true,
                'message' => 'Doctor deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Doctor deletion failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get doctor's appointments
     */
    public function appointments($id, Request $request)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            $appointments = $doctor->appointments()
                ->with('patient')
                ->orderBy('appointment_date', 'desc')
                ->paginate($request->get('per_page', 10));

            return response()->json([
                'success' => true,
                'data' => $appointments,
                'message' => 'Doctor appointments retrieved successfully'
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
     * Get doctor's patients
     */
    public function patients($id, Request $request)
    {
        try {
            $doctor = Doctor::findOrFail($id);
            $patients = $doctor->patients()
                ->orderBy('created_at', 'desc')
                ->paginate($request->get('per_page', 10));

            return response()->json([
                'success' => true,
                'data' => $patients,
                'message' => 'Doctor patients retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve patients',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update doctor availability
     */
    public function updateAvailability(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'availability' => 'required|in:Available,Unavailable,Busy',
            'available_slots' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $doctor = Doctor::findOrFail($id);
            $doctor->update([
                'availability' => $request->availability,
                'available_slots' => json_encode($request->available_slots ?? []),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Doctor availability updated successfully',
                'data' => $doctor
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update availability',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
