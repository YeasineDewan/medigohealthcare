<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HospitalApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class HospitalApplicationController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'hospital_name' => 'required|string|max:255',
            'hospital_type' => 'required|in:government,private,non_profit,specialty',
            'established_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'registration_number' => 'required|string|unique:hospital_applications,registration_number',
            'contact_person_name' => 'required|string|max:255',
            'contact_person_designation' => 'required|string|max:255',
            'email' => 'required|email|unique:hospital_applications,email',
            'phone' => 'required|string|max:20',
            'alternate_phone' => 'nullable|string|max:20',
            'address' => 'required|string|max:1000',
            'city' => 'required|string|max:100',
            'district' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'total_beds' => 'required|integer|min:1',
            'icu_beds' => 'nullable|integer|min:0',
            'emergency_beds' => 'nullable|integer|min:0',
            'website' => 'nullable|url|max:255',
            'about' => 'nullable|string|max:5000',
            'mission' => 'nullable|string|max:2000',
            'vision' => 'nullable|string|max:2000',
            'documents' => 'nullable|array|max:20',
            'documents.*' => 'file|mimes:pdf,jpg,jpeg,png|max:10240'
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
            $documentsPaths = [];

            if ($request->hasFile('documents')) {
                foreach ($request->file('documents') as $document) {
                    $path = $document->store('hospital-applications/documents', 'public');
                    $documentsPaths[] = $path;
                }
            }

            // Create application
            $application = HospitalApplication::create([
                'hospital_name' => $data['hospital_name'],
                'hospital_type' => $data['hospital_type'],
                'established_year' => $data['established_year'] ?? null,
                'registration_number' => $data['registration_number'],
                'contact_person_name' => $data['contact_person_name'],
                'contact_person_designation' => $data['contact_person_designation'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'alternate_phone' => $data['alternate_phone'] ?? null,
                'address' => $data['address'],
                'city' => $data['city'],
                'district' => $data['district'],
                'postal_code' => $data['postal_code'] ?? null,
                'total_beds' => $data['total_beds'],
                'icu_beds' => $data['icu_beds'] ?? 0,
                'emergency_beds' => $data['emergency_beds'] ?? 0,
                'website' => $data['website'] ?? null,
                'about' => $data['about'] ?? null,
                'mission' => $data['mission'] ?? null,
                'vision' => $data['vision'] ?? null,
                'documents_paths' => $documentsPaths,
                'status' => 'pending'
            ]);

            // Store JSON fields
            if ($request->has('emergency_services')) {
                $application->emergency_services = $request->emergency_services;
            }
            if ($request->has('specializations')) {
                $application->specializations = $request->specializations;
            }
            if ($request->has('departments')) {
                $application->departments = $request->departments;
            }
            if ($request->has('facilities')) {
                $application->facilities = $request->facilities;
            }
            if ($request->has('medical_equipment')) {
                $application->medical_equipment = $request->medical_equipment;
            }
            if ($request->has('social_media')) {
                $application->social_media = $request->social_media;
            }
            if ($request->has('achievements')) {
                $application->achievements = $request->achievements;
            }
            if ($request->has('awards')) {
                $application->awards = $request->awards;
            }
            if ($request->has('accreditations')) {
                $application->accreditations = $request->accreditations;
            }
            if ($request->has('partnerships')) {
                $application->partnerships = $request->partnerships;
            }
            if ($request->has('bank_details')) {
                $application->bank_details = $request->bank_details;
            }
            if ($request->has('emergency_contact')) {
                $application->emergency_contact = $request->emergency_contact;
            }
            if ($request->has('technical_contact')) {
                $application->technical_contact = $request->technical_contact;
            }
            if ($request->has('services_offered')) {
                $application->services_offered = $request->services_offered;
            }
            if ($request->has('integration_capabilities')) {
                $application->integration_capabilities = $request->integration_capabilities;
            }

            $application->save();

            return response()->json([
                'success' => true,
                'message' => 'Partnership application submitted successfully! Our team will contact you within 48 hours.',
                'data' => [
                    'application_id' => $application->id,
                    'status' => $application->status,
                    'email' => $application->email
                ]
            ], 201);

        } catch (\Exception $e) {
            // Cleanup uploaded files if there was an error
            foreach ($documentsPaths as $path) {
                Storage::disk('public')->delete($path);
            }

            return response()->json([
                'success' => false,
                'message' => 'Application submission failed. Please try again.',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function show(HospitalApplication $application): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $application->load(['reviewer', 'siteVisitConductor'])
        ]);
    }

    public function checkStatus(string $email): JsonResponse
    {
        $application = HospitalApplication::where('email', $email)->first();
        
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
                'site_visit_scheduled_at' => $application->site_visit_scheduled_at?->format('Y-m-d H:i:s'),
                'admin_notes' => $application->admin_notes,
                'rejection_reason' => $application->rejection_reason
            ]
        ]);
    }

    public function getCities(): JsonResponse
    {
        $cities = [
            'dhaka' => 'Dhaka',
            'chittagong' => 'Chittagong',
            'sylhet' => 'Sylhet',
            'rajshahi' => 'Rajshahi',
            'khulna' => 'Khulna',
            'barisal' => 'Barisal',
            'rangpur' => 'Rangpur',
            'mymensingh' => 'Mymensingh',
            'narayanganj' => 'Narayanganj',
            'comilla' => 'Comilla',
            'gazipur' => 'Gazipur',
            'narsingdi' => 'Narsingdi',
            'manikganj' => 'Manikganj',
            'munshiganj' => 'Munshiganj',
            'faridpur' => 'Faridpur',
            'madaripur' => 'Madaripur',
            'gopalganj' => 'Gopalganj',
            'shariatpur' => 'Shariatpur',
            'tangail' => 'Tangail',
            'kishoreganj' => 'Kishoreganj',
            'brahmanbaria' => 'Brahmanbaria',
            'chandpur' => 'Chandpur',
            'lakshmipur' => 'Lakshmipur',
            'noakhali' => 'Noakhali',
            'feni' => 'Feni',
            'coxsbazar' => "Cox's Bazar",
            'bandarban' => 'Bandarban',
            'rangamati' => 'Rangamati',
            'khagrachari' => 'Khagrachari',
            'habiganj' => 'Habiganj',
            'moulvibazar' => 'Moulvibazar',
            'sunamganj' => 'Sunamganj',
            'sirajganj' => 'Sirajganj',
            'pabna' => 'Pabna',
            'bogura' => 'Bogura',
            'joypurhat' => 'Joypurhat',
            'naogaon' => 'Naogaon',
            'chapainawabganj' => 'Chapainawabganj',
            'natore' => 'Natore',
            'kushtia' => 'Kushtia',
            'magura' => 'Magura',
            'jhenaidah' => 'Jhenaidah',
            'jashore' => 'Jashore',
            'satkhira' => 'Satkhira',
            'meherpur' => 'Meherpur',
            'chuadanga' => 'Chuadanga',
            'lalmonirhat' => 'Lalmonirhat',
            'nilphamari' => 'Nilphamari',
            'dinajpur' => 'Dinajpur',
            'thakurgaon' => 'Thakurgaon',
            'panchagarh' => 'Panchagarh',
            'pirojpur' => 'Pirojpur',
            'bhola' => 'Bhola',
            'patuakhali' => 'Patuakhali',
            'barguna' => 'Barguna',
            'jhalokathi' => 'Jhalokathi'
        ];

        return response()->json([
            'success' => true,
            'data' => $cities
        ]);
    }

    public function getSpecializations(): JsonResponse
    {
        $specializations = [
            'general_medicine' => 'General Medicine',
            'cardiology' => 'Cardiology',
            'neurology' => 'Neurology',
            'pediatrics' => 'Pediatrics',
            'obstetrics_gynecology' => 'Obstetrics & Gynecology',
            'orthopedics' => 'Orthopedics',
            'surgery_general' => 'General Surgery',
            'surgery_cardiothoracic' => 'Cardiothoracic Surgery',
            'surgery_neuro' => 'Neurosurgery',
            'oncology' => 'Oncology',
            'nephrology' => 'Nephrology',
            'gastroenterology' => 'Gastroenterology',
            'pulmonology' => 'Pulmonology',
            'endocrinology' => 'Endocrinology',
            'rheumatology' => 'Rheumatology',
            'dermatology' => 'Dermatology',
            'psychiatry' => 'Psychiatry',
            'anesthesiology' => 'Anesthesiology',
            'radiology' => 'Radiology',
            'pathology' => 'Pathology',
            'ophthalmology' => 'Ophthalmology',
            'ent' => 'ENT (Otolaryngology)',
            'emergency_medicine' => 'Emergency Medicine',
            'critical_care' => 'Critical Care Medicine',
            'physical_medicine_rehabilitation' => 'Physical Medicine & Rehabilitation',
            'nuclear_medicine' => 'Nuclear Medicine',
            'infectious_diseases' => 'Infectious Diseases',
            'family_medicine' => 'Family Medicine',
            'preventive_medicine' => 'Preventive Medicine',
            'occupational_medicine' => 'Occupational Medicine',
            'forensic_medicine' => 'Forensic Medicine',
            'clinical_pharmacology' => 'Clinical Pharmacology',
            'immunology' => 'Immunology',
            'genetics' => 'Genetics',
            'hematology' => 'Hematology',
            'allergy_immunology' => 'Allergy & Immunology',
            'palliative_medicine' => 'Palliative Medicine'
        ];

        return response()->json([
            'success' => true,
            'data' => $specializations
        ]);
    }

    public function getStatistics(): JsonResponse
    {
        $stats = [
            'total_applications' => HospitalApplication::count(),
            'pending_applications' => HospitalApplication::pending()->count(),
            'under_review_applications' => HospitalApplication::underReview()->count(),
            'approved_applications' => HospitalApplication::approved()->count(),
            'rejected_applications' => HospitalApplication::rejected()->count(),
            'site_visit_required' => HospitalApplication::siteVisitRequired()->count(),
            'applications_this_month' => HospitalApplication::whereMonth('created_at', now()->month)->count(),
            'applications_this_year' => HospitalApplication::whereYear('created_at', now()->year)->count(),
            'by_type' => HospitalApplication::selectRaw('hospital_type, COUNT(*) as count')
                ->groupBy('hospital_type')
                ->orderBy('count', 'desc')
                ->get(),
            'by_city' => HospitalApplication::selectRaw('city, COUNT(*) as count')
                ->groupBy('city')
                ->orderBy('count', 'desc')
                ->limit(10)
                ->get(),
            'total_beds' => HospitalApplication::sum('total_beds'),
            'total_icu_beds' => HospitalApplication::sum('icu_beds'),
            'average_beds' => HospitalApplication::avg('total_beds')
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }
}
