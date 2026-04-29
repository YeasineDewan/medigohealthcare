<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hospital;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class HospitalController extends Controller
{
    public function index(Request $request)
    {
        $query = Hospital::with(['doctors.user', 'departments']);

        // Apply filters
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('address', 'like', '%' . $request->search . '%')
                  ->orWhere('city', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->city) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }

        if ($request->district) {
            $query->where('district', $request->district);
        }

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->is_featured !== null) {
            $query->where('is_featured', $request->is_featured);
        }

        if ($request->is_24_7 !== null) {
            $query->where('is_24_7', $request->is_24_7);
        }

        if ($request->has_emergency !== null) {
            $query->where('has_emergency', $request->has_emergency);
        }

        if ($request->min_rating) {
            $query->where('rating', '>=', $request->min_rating);
        }

        // Apply sorting
        $sortBy = $request->sort_by ?? 'name';
        $sortOrder = $request->sort_order ?? 'asc';
        
        switch ($sortBy) {
            case 'rating':
                $query->orderBy('rating', $sortOrder);
                break;
            case 'name':
                $query->orderBy('name', $sortOrder);
                break;
            case 'established_year':
                $query->orderBy('established_year', $sortOrder);
                break;
            case 'beds':
                $query->orderBy('total_beds', $sortOrder);
                break;
            default:
                $query->orderBy($sortBy, $sortOrder);
        }

        $hospitals = $query->where('is_active', true)->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $hospitals,
            'message' => 'Hospitals retrieved successfully'
        ]);
    }

    public function show($id)
    {
        $hospital = Hospital::with(['doctors.user', 'departments', 'services', 'facilities'])
                           ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $hospital,
            'message' => 'Hospital retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'slug' => 'required|string|unique:hospitals,slug',
            'type' => 'required|in:general,specialized,teaching,clinic,diagnostic',
            'ownership_type' => 'required|in:public,private,ngo,military',
            'established_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'registration_number' => 'nullable|string|max:100',
            'license_number' => 'nullable|string|max:100',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'district' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'total_beds' => 'nullable|integer|min:0',
            'icu_beds' => 'nullable|integer|min:0',
            'ccu_beds' => 'nullable|integer|min:0',
            'hdu_beds' => 'nullable|integer|min:0',
            'general_beds' => 'nullable|integer|min:0',
            'emergency_services' => 'nullable|array',
            'specializations' => 'nullable|array',
            'facilities' => 'nullable|array',
            'services' => 'nullable|array',
            'departments' => 'nullable|array',
            'insurance_partners' => 'nullable|array',
            'accreditations' => 'nullable|array',
            'awards' => 'nullable|array',
            'opening_hours' => 'nullable|array',
            'is_24_7' => 'boolean',
            'has_emergency' => 'boolean',
            'has_pharmacy' => 'boolean',
            'has_laboratory' => 'boolean',
            'has_imaging' => 'boolean',
            'has_ambulance' => 'boolean',
            'has_blood_bank' => 'boolean',
            'is_featured' => 'boolean',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'contact_person' => 'nullable|string|max:255',
            'contact_person_phone' => 'nullable|string|max:20',
            'contact_person_email' => 'nullable|email|max:255',
            'social_links' => 'nullable|array',
            'seo_keywords' => 'nullable|array',
            'meta_description' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $data = $request->all();
        $data['is_active'] = true;
        $data['created_by'] = auth()->id();

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('hospitals/logos', 'public');
            $data['logo'] = $logoPath;
        }

        // Handle images upload
        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('hospitals/images', 'public');
                $images[] = $path;
            }
            $data['images'] = $images;
        }

        $hospital = Hospital::create($data);

        return response()->json([
            'success' => true,
            'data' => $hospital->load(['doctors.user', 'departments']),
            'message' => 'Hospital created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $hospital = Hospital::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'slug' => 'sometimes|required|string|unique:hospitals,slug,' . $id,
            'type' => 'sometimes|required|in:general,specialized,teaching,clinic,diagnostic',
            'ownership_type' => 'sometimes|required|in:public,private,ngo,military',
            'established_year' => 'nullable|integer|min:1800|max:' . date('Y'),
            'registration_number' => 'nullable|string|max:100',
            'license_number' => 'nullable|string|max:100',
            'address' => 'sometimes|required|string|max:500',
            'city' => 'sometimes|required|string|max:100',
            'district' => 'sometimes|required|string|max:100',
            'postal_code' => 'nullable|string|max:20',
            'phone' => 'sometimes|required|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'total_beds' => 'nullable|integer|min:0',
            'icu_beds' => 'nullable|integer|min:0',
            'ccu_beds' => 'nullable|integer|min:0',
            'hdu_beds' => 'nullable|integer|min:0',
            'general_beds' => 'nullable|integer|min:0',
            'emergency_services' => 'nullable|array',
            'specializations' => 'nullable|array',
            'facilities' => 'nullable|array',
            'services' => 'nullable|array',
            'departments' => 'nullable|array',
            'insurance_partners' => 'nullable|array',
            'accreditations' => 'nullable|array',
            'awards' => 'nullable|array',
            'opening_hours' => 'nullable|array',
            'is_24_7' => 'boolean',
            'has_emergency' => 'boolean',
            'has_pharmacy' => 'boolean',
            'has_laboratory' => 'boolean',
            'has_imaging' => 'boolean',
            'has_ambulance' => 'boolean',
            'has_blood_bank' => 'boolean',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'contact_person' => 'nullable|string|max:255',
            'contact_person_phone' => 'nullable|string|max:20',
            'contact_person_email' => 'nullable|email|max:255',
            'social_links' => 'nullable|array',
            'seo_keywords' => 'nullable|array',
            'meta_description' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $data = $request->all();
        $data['updated_by'] = auth()->id();

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo
            if ($hospital->logo) {
                Storage::disk('public')->delete($hospital->logo);
            }
            $logoPath = $request->file('logo')->store('hospitals/logos', 'public');
            $data['logo'] = $logoPath;
        }

        // Handle images upload
        if ($request->hasFile('images')) {
            // Delete old images
            if ($hospital->images) {
                foreach ($hospital->images as $oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }

            $images = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('hospitals/images', 'public');
                $images[] = $path;
            }
            $data['images'] = $images;
        }

        $hospital->update($data);

        return response()->json([
            'success' => true,
            'data' => $hospital->fresh()->load(['doctors.user', 'departments']),
            'message' => 'Hospital updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $hospital = Hospital::findOrFail($id);

        // Check if hospital has active doctors
        if ($hospital->doctors()->where('is_active', true)->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete hospital with active doctors'
            ], 400);
        }

        // Delete logo and images
        if ($hospital->logo) {
            Storage::disk('public')->delete($hospital->logo);
        }

        if ($hospital->images) {
            foreach ($hospital->images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $hospital->delete();

        return response()->json([
            'success' => true,
            'message' => 'Hospital deleted successfully'
        ]);
    }

    public function featured(Request $request)
    {
        $hospitals = Hospital::with(['doctors.user', 'departments'])
                            ->where('is_featured', true)
                            ->where('is_active', true)
                            ->orderBy('rating', 'desc')
                            ->limit($request->limit ?? 20)
                            ->get();

        return response()->json([
            'success' => true,
            'data' => $hospitals,
            'message' => 'Featured hospitals retrieved successfully'
        ]);
    }

    public function byCity($city, Request $request)
    {
        $query = Hospital::with(['doctors.user', 'departments'])
                        ->where('city', 'like', '%' . $city . '%')
                        ->where('is_active', true);

        $hospitals = $query->orderBy('rating', 'desc')
                           ->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $hospitals,
            'message' => 'Hospitals by city retrieved successfully'
        ]);
    }

    public function byDistrict($district, Request $request)
    {
        $query = Hospital::with(['doctors.user', 'departments'])
                        ->where('district', $district)
                        ->where('is_active', true);

        $hospitals = $query->orderBy('rating', 'desc')
                           ->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $hospitals,
            'message' => 'Hospitals by district retrieved successfully'
        ]);
    }

    public function byType($type, Request $request)
    {
        $query = Hospital::with(['doctors.user', 'departments'])
                        ->where('type', $type)
                        ->where('is_active', true);

        $hospitals = $query->orderBy('rating', 'desc')
                           ->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $hospitals,
            'message' => 'Hospitals by type retrieved successfully'
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

        $hospitals = Hospital::with(['doctors.user', 'departments'])
                            ->where('is_active', true)
                            ->where(function($q) use ($request) {
                                $q->where('name', 'like', '%' . $request->query . '%')
                                  ->orWhere('description', 'like', '%' . $request->query . '%')
                                  ->orWhere('address', 'like', '%' . $request->query . '%')
                                  ->orWhere('city', 'like', '%' . $request->query . '%')
                                  ->orWhere('district', 'like', '%' . $request->query . '%');
                            })
                            ->orderBy('rating', 'desc')
                            ->limit($request->limit ?? 50)
                            ->get();

        return response()->json([
            'success' => true,
            'data' => $hospitals,
            'message' => 'Hospital search completed successfully'
        ]);
    }

    public function nearby(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'radius' => 'nullable|integer|min:1|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $latitude = $request->latitude;
        $longitude = $request->longitude;
        $radius = $request->radius ?? 10; // Default 10km

        $hospitals = Hospital::with(['doctors.user', 'departments'])
                            ->where('is_active', true)
                            ->whereNotNull('latitude')
                            ->whereNotNull('longitude')
                            ->selectRaw('*,
                                (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance',
                                [$latitude, $longitude, $latitude])
                            ->having('distance', '<=', $radius)
                            ->orderBy('distance', 'asc')
                            ->limit($request->limit ?? 20)
                            ->get();

        return response()->json([
            'success' => true,
            'data' => $hospitals,
            'message' => 'Nearby hospitals retrieved successfully'
        ]);
    }

    public function statistics()
    {
        $total = Hospital::where('is_active', true)->count();
        $featured = Hospital::where('is_featured', true)->where('is_active', true)->count();
        $general = Hospital::where('type', 'general')->where('is_active', true)->count();
        $specialized = Hospital::where('type', 'specialized')->where('is_active', true)->count();
        $teaching = Hospital::where('type', 'teaching')->where('is_active', true)->count();
        $clinic = Hospital::where('type', 'clinic')->where('is_active', true)->count();
        $diagnostic = Hospital::where('type', 'diagnostic')->where('is_active', true)->count();
        
        $public = Hospital::where('ownership_type', 'public')->where('is_active', true)->count();
        $private = Hospital::where('ownership_type', 'private')->where('is_active', true)->count();
        
        $withEmergency = Hospital::where('has_emergency', true)->where('is_active', true)->count();
        $with247 = Hospital::where('is_24_7', true)->where('is_active', true)->count();

        $totalBeds = Hospital::where('is_active', true)->sum('total_beds');
        $totalIcuBeds = Hospital::where('is_active', true)->sum('icu_beds');

        return response()->json([
            'success' => true,
            'data' => [
                'total_hospitals' => $total,
                'featured' => $featured,
                'by_type' => [
                    'general' => $general,
                    'specialized' => $specialized,
                    'teaching' => $teaching,
                    'clinic' => $clinic,
                    'diagnostic' => $diagnostic,
                ],
                'by_ownership' => [
                    'public' => $public,
                    'private' => $private,
                ],
                'services' => [
                    'with_emergency' => $withEmergency,
                    'with_24_7' => $with247,
                ],
                'capacity' => [
                    'total_beds' => $totalBeds,
                    'total_icu_beds' => $totalIcuBeds,
                ],
            ],
            'message' => 'Hospital statistics retrieved successfully'
        ]);
    }
}
