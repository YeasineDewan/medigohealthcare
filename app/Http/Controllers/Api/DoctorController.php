<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DoctorController extends Controller
{
    public function index(Request $request)
    {
        $query = Doctor::with('user')->where('is_available', true);

        if ($request->has('specialty')) {
            $query->where('specialty', 'like', '%' . $request->specialty . '%');
        }

        if ($request->has('search')) {
            $search = $request->search;
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            })->orWhere('specialty', 'like', '%' . $search . '%');
        }

        $doctors = $query->paginate($request->get('per_page', 15));

        return response()->json($doctors);
    }

    public function show($id)
    {
        $doctor = Doctor::with(['user', 'schedules', 'reviews'])->findOrFail($id);
        return response()->json($doctor);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'specialty' => 'required|string|max:100',
            'qualifications' => 'nullable|string',
            'bio' => 'nullable|string',
            'license_number' => 'nullable|string|unique:doctors',
            'consultation_fee' => 'required|numeric|min:0',
            'video_consultation_fee' => 'nullable|numeric|min:0',
            'hospital' => 'nullable|string',
            'location' => 'nullable|string',
        ]);

        $doctor = Doctor::create($validated);

        return response()->json($doctor, 201);
    }

    public function updateProfile(Request $request, $id)
    {
        $doctor = Doctor::findOrFail($id);

        $request->validate([
            'specialty' => 'sometimes|string|max:100',
            'qualifications' => 'nullable|string',
            'bio' => 'nullable|string',
            'consultation_fee' => 'sometimes|numeric|min:0',
            'consultation_fee_online' => 'nullable|numeric|min:0',
            'consultation_fee_emergency' => 'nullable|numeric|min:0',
            'is_available' => 'sometimes|boolean',
            'experience' => 'nullable|array',
            'education' => 'nullable|array',
            'services' => 'nullable|array',
            'publications' => 'nullable|array',
            'awards' => 'nullable|array',
            'affiliations' => 'nullable|array',
            'memberships' => 'nullable|array',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'signature_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle image uploads
        if ($request->hasFile('profile_image')) {
            // Delete old image
            if ($doctor->profile_image) {
                Storage::disk('public')->delete($doctor->profile_image);
            }
            $path = $request->file('profile_image')->store('doctor_profiles', 'public');
            $doctor->profile_image = $path;
        }

        if ($request->hasFile('signature_image')) {
            // Delete old image
            if ($doctor->signature_image) {
                Storage::disk('public')->delete($doctor->signature_image);
            }
            $path = $request->file('signature_image')->store('doctor_signatures', 'public');
            $doctor->signature_image = $path;
        }

        $doctor->update($request->except(['profile_image', 'signature_image']));

        return response()->json($doctor);
    }

    public function update(Request $request, $id)
    {
        $doctor = Doctor::findOrFail($id);

        $validated = $request->validate([
            'specialty' => 'sometimes|string|max:100',
            'qualifications' => 'nullable|string',
            'bio' => 'nullable|string',
            'consultation_fee' => 'sometimes|numeric|min:0',
            'video_consultation_fee' => 'nullable|numeric|min:0',
            'is_available' => 'sometimes|boolean',
        ]);

        $doctor->update($validated);

        return response()->json($doctor);
    }
}
