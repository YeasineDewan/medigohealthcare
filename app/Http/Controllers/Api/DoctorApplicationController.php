<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DoctorApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class DoctorApplicationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:doctor_applications,email',
            'phone' => 'required|string|max:20',
            'date_of_birth' => 'nullable|date|before:today',
            'gender' => 'nullable|in:male,female,other',
            'specialization' => 'required|string|max:255',
            'sub_specialization' => 'nullable|string|max:255',
            'experience_years' => 'required|integer|min:0|max:70',
            'qualification' => 'required|string|max:255',
            'post_graduation' => 'nullable|string|max:255',
            'bmdc_number' => 'required|string|unique:doctor_applications,bmdc_number',
            'bmdc_registration_date' => 'required|date|before:today',
            'current_hospital' => 'nullable|string|max:255',
            'designation' => 'nullable|string|max:255',
            'consultation_fee' => 'nullable|numeric|min:0|max:999999.99',
            'online_consultation_fee' => 'nullable|numeric|min:0|max:999999.99',
            'about' => 'nullable|string|max:5000',
            'profile_photo' => 'nullable|file|image|max:2048',
            'identity_document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'certificates' => 'nullable|array|max:10',
            'certificates.*' => 'file|mimes:pdf,jpg,jpeg,png|max:5120'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $validator->validated();
            
            // Handle file uploads
            $profilePhotoPath = null;
            $identityDocumentPath = null;
            $certificatesPaths = [];

            if ($request->hasFile('profile_photo')) {
                $profilePhotoPath = $request->file('profile_photo')->store('doctor-applications/profile-photos', 'public');
            }

            if ($request->hasFile('identity_document')) {
                $identityDocumentPath = $request->file('identity_document')->store('doctor-applications/identity-documents', 'public');
            }

            if ($request->hasFile('certificates')) {
                foreach ($request->file('certificates') as $certificate) {
                    $path = $certificate->store('doctor-applications/certificates', 'public');
                    $certificatesPaths[] = $path;
                }
            }

            // Create application
            $application = DoctorApplication::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'date_of_birth' => $data['date_of_birth'] ?? null,
                'gender' => $data['gender'] ?? null,
                'specialization' => $data['specialization'],
                'sub_specialization' => $data['sub_specialization'] ?? null,
                'experience_years' => $data['experience_years'],
                'qualification' => $data['qualification'],
                'post_graduation' => $data['post_graduation'] ?? null,
                'bmdc_number' => $data['bmdc_number'],
                'bmdc_registration_date' => $data['bmdc_registration_date'],
                'current_hospital' => $data['current_hospital'] ?? null,
                'designation' => $data['designation'] ?? null,
                'consultation_fee' => $data['consultation_fee'] ?? null,
                'online_consultation_fee' => $data['online_consultation_fee'] ?? null,
                'about' => $data['about'] ?? null,
                'profile_photo_path' => $profilePhotoPath,
                'identity_document_path' => $identityDocumentPath,
                'certificates_paths' => $certificatesPaths,
                'status' => 'pending'
            ]);

            // Store JSON fields
            if ($request->has('availability')) {
                $application->availability = $request->availability;
            }
            if ($request->has('languages')) {
                $application->languages = $request->languages;
            }
            if ($request->has('services')) {
                $application->services = $request->services;
            }
            if ($request->has('achievements')) {
                $application->achievements = $request->achievements;
            }
            if ($request->has('publications')) {
                $application->publications = $request->publications;
            }
            if ($request->has('memberships')) {
                $application->memberships = $request->memberships;
            }
            if ($request->has('bank_account')) {
                $application->bank_account = $request->bank_account;
            }
            if ($request->has('emergency_contact')) {
                $application->emergency_contact = $request->emergency_contact;
            }
            if ($request->has('social_links')) {
                $application->social_links = $request->social_links;
            }
            if ($request->has('preferences')) {
                $application->preferences = $request->preferences;
            }

            $application->save();

            return response()->json([
                'success' => true,
                'message' => 'Application submitted successfully! We will contact you within 24 hours.',
                'data' => [
                    'application_id' => $application->id,
                    'status' => $application->status,
                    'email' => $application->email
                ]
            ], 201);

        } catch (\Exception $e) {
            // Cleanup uploaded files if there was an error
            if ($profilePhotoPath) {
                Storage::disk('public')->delete($profilePhotoPath);
            }
            if ($identityDocumentPath) {
                Storage::disk('public')->delete($identityDocumentPath);
            }
            foreach ($certificatesPaths as $path) {
                Storage::disk('public')->delete($path);
            }

            return response()->json([
                'success' => false,
                'message' => 'Application submission failed. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function show(DoctorApplication $application): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $application->load('reviewer')
        ]);
    }

    public function checkStatus(string $email): JsonResponse
    {
        $application = DoctorApplication::where('email', $email)->first();
        
        if (!$application) {
            return response()->json([
                'success' => false,
                'message' => 'No application found with this email address'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'application_id' => $application->id,
                'status' => $application->status,
                'status_label' => $application->status_label,
                'status_color' => $application->status_color,
                'submitted_at' => $application->created_at->format('Y-m-d H:i:s'),
                'reviewed_at' => $application->reviewed_at?->format('Y-m-d H:i:s'),
                'admin_notes' => $application->admin_notes,
                'rejection_reason' => $application->rejection_reason
            ]
        ]);
    }

    public function getSpecializations(): JsonResponse
    {
        $specializations = [
            'cardiology' => 'Cardiology',
            'pediatrics' => 'Pediatrics',
            'gynecology' => 'Gynecology',
            'dermatology' => 'Dermatology',
            'psychiatry' => 'Psychiatry',
            'orthopedics' => 'Orthopedics',
            'general_medicine' => 'General Medicine',
            'neurology' => 'Neurology',
            'oncology' => 'Oncology',
            'nephrology' => 'Nephrology',
            'gastroenterology' => 'Gastroenterology',
            'endocrinology' => 'Endocrinology',
            'pulmonology' => 'Pulmonology',
            'rheumatology' => 'Rheumatology',
            'infectious_diseases' => 'Infectious Diseases',
            'anesthesiology' => 'Anesthesiology',
            'radiology' => 'Radiology',
            'pathology' => 'Pathology',
            'surgery_general' => 'General Surgery',
            'surgery_cardiothoracic' => 'Cardiothoracic Surgery',
            'surgery_neuro' => 'Neurosurgery',
            'surgery_orthopedic' => 'Orthopedic Surgery',
            'surgery_plastic' => 'Plastic Surgery',
            'surgery_urology' => 'Urology',
            'surgery_pediatric' => 'Pediatric Surgery',
            'obstetrics_gynecology' => 'Obstetrics & Gynecology',
            'ophthalmology' => 'Ophthalmology',
            'ent' => 'ENT (Otolaryngology)',
            'emergency_medicine' => 'Emergency Medicine',
            'critical_care' => 'Critical Care Medicine',
            'family_medicine' => 'Family Medicine',
            'preventive_medicine' => 'Preventive Medicine',
            'occupational_medicine' => 'Occupational Medicine',
            'physical_medicine_rehabilitation' => 'Physical Medicine & Rehabilitation',
            'forensic_medicine' => 'Forensic Medicine'
        ];

        return response()->json([
            'success' => true,
            'data' => $specializations
        ]);
    }

    public function getStatistics(): JsonResponse
    {
        $stats = [
            'total_applications' => DoctorApplication::count(),
            'pending_applications' => DoctorApplication::pending()->count(),
            'under_review_applications' => DoctorApplication::underReview()->count(),
            'approved_applications' => DoctorApplication::approved()->count(),
            'rejected_applications' => DoctorApplication::rejected()->count(),
            'applications_this_month' => DoctorApplication::whereMonth('created_at', now()->month)->count(),
            'applications_this_year' => DoctorApplication::whereYear('created_at', now()->year)->count(),
            'top_specializations' => DoctorApplication::selectRaw('specialization, COUNT(*) as count')
                ->groupBy('specialization')
                ->orderBy('count', 'desc')
                ->limit(10)
                ->get()
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
