<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DoctorProfileController extends Controller
{
    /**
     * Get doctor profile with all details
     */
    public function getProfile($id)
    {
        try {
            $doctor = Doctor::with(['user'])->findOrFail($id);
            
            return response()->json([
                'success' => true,
                'data' => [
                    'personal_info' => [
                        'title' => $doctor->user->title ?? 'Dr.',
                        'first_name' => $doctor->user->first_name,
                        'last_name' => $doctor->user->last_name,
                        'email' => $doctor->user->email,
                        'phone' => $doctor->user->phone,
                        'date_of_birth' => $doctor->user->date_of_birth,
                        'gender' => $doctor->user->gender,
                        'address' => $doctor->user->address,
                        'emergency_contact' => $doctor->emergency_contact,
                        'marital_status' => $doctor->marital_status,
                        'bio' => $doctor->bio,
                        'website' => $doctor->website,
                        'linkedin' => $doctor->linkedin,
                        'profile_picture' => $doctor->user->profile_picture,
                    ],
                    'professional_info' => [
                        'specialization' => $doctor->specialty,
                        'qualifications' => json_decode($doctor->qualifications) ?? [],
                        'experience' => $doctor->experience_years . ' years',
                        'current_hospital' => $doctor->hospital,
                        'consultation_fee' => $doctor->consultation_fee,
                        'available_days' => $doctor->available_days ?? [],
                        'available_time' => $doctor->start_time . ' - ' . $doctor->end_time,
                        'languages' => json_decode($doctor->languages) ?? [],
                        'medical_license' => $doctor->license_number,
                        'department' => $doctor->department,
                        'designation' => $doctor->designation,
                        'npi_number' => $doctor->npi_number,
                        'dea_number' => $doctor->dea_number,
                    ],
                    'expertise_info' => [
                        'areas_of_expertise' => json_decode($doctor->areas_of_expertise) ?? [],
                        'services_offered' => json_decode($doctor->services_offered) ?? [],
                        'awards' => json_decode($doctor->awards) ?? [],
                        'publications' => json_decode($doctor->publications) ?? [],
                        'memberships' => json_decode($doctor->memberships) ?? [],
                        'research_interests' => json_decode($doctor->research_interests) ?? [],
                    ],
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch profile: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update personal information
     */
    public function updatePersonalInfo(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:10',
            'first_name' => 'sometimes|string|min:2|max:50',
            'last_name' => 'sometimes|string|min:2|max:50',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'phone' => 'sometimes|string|max:20',
            'date_of_birth' => 'sometimes|date',
            'gender' => 'sometimes|in:Male,Female,Other',
            'address' => 'sometimes|string|max:500',
            'emergency_contact' => 'sometimes|string|max:20',
            'marital_status' => 'sometimes|in:Single,Married,Divorced,Widowed',
            'bio' => 'sometimes|string|max:1000',
            'website' => 'sometimes|url|max:255',
            'linkedin' => 'sometimes|url|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            DB::beginTransaction();

            $doctor = Doctor::findOrFail($id);
            $user = $doctor->user;

            // Update user table fields
            $userFields = ['title', 'first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'gender', 'address'];
            foreach ($userFields as $field) {
                if ($request->has($field)) {
                    $user->$field = $request->$field;
                }
            }
            $user->save();

            // Update doctor table fields
            $doctorFields = ['emergency_contact', 'marital_status', 'bio', 'website', 'linkedin'];
            foreach ($doctorFields as $field) {
                if ($request->has($field)) {
                    $doctor->$field = $request->$field;
                }
            }
            $doctor->save();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Personal information updated successfully',
                'data' => $doctor->fresh(['user']),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => 'Failed to update personal information: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update professional information
     */
    public function updateProfessionalInfo(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'specialization' => 'sometimes|string|max:100',
            'qualifications' => 'sometimes|array',
            'experience' => 'sometimes|string|max:50',
            'current_hospital' => 'sometimes|string|max:200',
            'consultation_fee' => 'sometimes|numeric|min:0',
            'available_days' => 'sometimes|array',
            'available_time' => 'sometimes|string|max:50',
            'languages' => 'sometimes|array',
            'medical_license' => 'sometimes|string|max:100',
            'department' => 'sometimes|string|max:100',
            'designation' => 'sometimes|string|max:100',
            'npi_number' => 'sometimes|string|max:50',
            'dea_number' => 'sometimes|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $doctor = Doctor::findOrFail($id);

            if ($request->has('specialization')) {
                $doctor->specialty = $request->specialization;
            }
            if ($request->has('qualifications')) {
                $doctor->qualifications = json_encode($request->qualifications);
            }
            if ($request->has('experience')) {
                $doctor->experience_years = (int) filter_var($request->experience, FILTER_SANITIZE_NUMBER_INT);
            }
            if ($request->has('current_hospital')) {
                $doctor->hospital = $request->current_hospital;
            }
            if ($request->has('consultation_fee')) {
                $doctor->consultation_fee = $request->consultation_fee;
            }
            if ($request->has('available_days')) {
                $doctor->available_days = $request->available_days;
            }
            if ($request->has('available_time')) {
                $times = explode(' - ', $request->available_time);
                if (count($times) === 2) {
                    $doctor->start_time = $times[0];
                    $doctor->end_time = $times[1];
                }
            }
            if ($request->has('languages')) {
                $doctor->languages = json_encode($request->languages);
            }
            if ($request->has('medical_license')) {
                $doctor->license_number = $request->medical_license;
            }
            if ($request->has('department')) {
                $doctor->department = $request->department;
            }
            if ($request->has('designation')) {
                $doctor->designation = $request->designation;
            }
            if ($request->has('npi_number')) {
                $doctor->npi_number = $request->npi_number;
            }
            if ($request->has('dea_number')) {
                $doctor->dea_number = $request->dea_number;
            }

            $doctor->save();

            return response()->json([
                'success' => true,
                'message' => 'Professional information updated successfully',
                'data' => $doctor,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update professional information: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update expertise information
     */
    public function updateExpertiseInfo(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'areas_of_expertise' => 'sometimes|array',
            'services_offered' => 'sometimes|array',
            'awards' => 'sometimes|array',
            'publications' => 'sometimes|array',
            'memberships' => 'sometimes|array',
            'research_interests' => 'sometimes|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $doctor = Doctor::findOrFail($id);

            if ($request->has('areas_of_expertise')) {
                $doctor->areas_of_expertise = json_encode($request->areas_of_expertise);
            }
            if ($request->has('services_offered')) {
                $doctor->services_offered = json_encode($request->services_offered);
            }
            if ($request->has('awards')) {
                $doctor->awards = json_encode($request->awards);
            }
            if ($request->has('publications')) {
                $doctor->publications = json_encode($request->publications);
            }
            if ($request->has('memberships')) {
                $doctor->memberships = json_encode($request->memberships);
            }
            if ($request->has('research_interests')) {
                $doctor->research_interests = json_encode($request->research_interests);
            }

            $doctor->save();

            return response()->json([
                'success' => true,
                'message' => 'Expertise information updated successfully',
                'data' => $doctor,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update expertise information: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Upload profile picture
     */
    public function uploadProfilePicture(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $doctor = Doctor::findOrFail($id);
            $user = $doctor->user;

            // Delete old profile picture if exists
            if ($user->profile_picture) {
                Storage::disk('public')->delete($user->profile_picture);
            }

            // Store new profile picture
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
            $user->profile_picture = $path;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Profile picture uploaded successfully',
                'data' => [
                    'profile_picture' => Storage::url($path),
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload profile picture: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get profile statistics
     */
    public function getProfileStats($id)
    {
        try {
            $doctor = Doctor::findOrFail($id);

            $stats = [
                'profile_views' => $doctor->profile_views ?? 0,
                'patient_rating' => $doctor->rating ?? 0,
                'total_patients' => $doctor->appointments()->distinct('patient_id')->count(),
                'total_earnings' => $doctor->earnings()->sum('amount'),
                'this_month_earnings' => $doctor->earnings()
                    ->whereMonth('created_at', now()->month)
                    ->sum('amount'),
                'total_appointments' => $doctor->appointments()->count(),
                'completed_appointments' => $doctor->appointments()->where('status', 'completed')->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update availability
     */
    public function updateAvailability(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'is_available' => 'required|boolean',
            'available_days' => 'sometimes|array',
            'start_time' => 'sometimes|date_format:H:i',
            'end_time' => 'sometimes|date_format:H:i',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $doctor = Doctor::findOrFail($id);

            $doctor->is_available = $request->is_available;
            if ($request->has('available_days')) {
                $doctor->available_days = $request->available_days;
            }
            if ($request->has('start_time')) {
                $doctor->start_time = $request->start_time;
            }
            if ($request->has('end_time')) {
                $doctor->end_time = $request->end_time;
            }

            $doctor->save();

            return response()->json([
                'success' => true,
                'message' => 'Availability updated successfully',
                'data' => $doctor,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update availability: ' . $e->getMessage(),
            ], 500);
        }
    }
}
