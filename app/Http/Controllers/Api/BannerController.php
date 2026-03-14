<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class BannerController extends Controller
{
    // Get all active banners
    public function index(Request $request)
    {
        $query = Banner::query();

        // Filter by type if provided
        if ($request->has('type')) {
            $query->byType($request->type);
        }

        // Only active banners for public API
        if (!$request->has('include_inactive')) {
            $query->active();
        }

        $banners = $query->orderBy('display_order', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $banners
        ]);
    }

    // Get single banner
    public function show($id)
    {
        $banner = Banner::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $banner
        ]);
    }

    // Upload banner image
    public function uploadImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('banners', $filename, 'public');
                
                $url = Storage::url($path);
                
                return response()->json([
                    'success' => true,
                    'message' => 'Image uploaded successfully',
                    'url' => $url,
                    'filename' => $filename
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'No image file provided'
            ], 400);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload image: ' . $e->getMessage()
            ], 500);
        }
    }

    // Create banner (admin only)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'image' => 'nullable|string',
            'background_color' => 'required|string|max:255',
            'cta_text' => 'nullable|string|max:100',
            'cta_link' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer|min:0',
            'active' => 'nullable|boolean',
            'type' => 'required|in:hero,promotional,announcement',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'target_audience' => 'nullable|in:all,patients,doctors,general',
            'priority' => 'nullable|in:low,medium,high',
            'animation_type' => 'nullable|in:fade,slide,zoom,flip',
            'overlay_opacity' => 'nullable|integer|min:0|max:100'
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
            
            // Set default values
            $data['display_order'] = $data['display_order'] ?? 0;
            $data['active'] = $data['active'] ?? true;
            $data['target_audience'] = $data['target_audience'] ?? 'all';
            $data['priority'] = $data['priority'] ?? 'medium';
            $data['animation_type'] = $data['animation_type'] ?? 'fade';
            $data['overlay_opacity'] = $data['overlay_opacity'] ?? 20;

            $banner = Banner::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Banner created successfully',
                'data' => $banner
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create banner: ' . $e->getMessage()
            ], 500);
        }
    }

    // Update banner (admin only)
    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'image' => 'nullable|string',
            'background_color' => 'sometimes|required|string|max:255',
            'cta_text' => 'nullable|string|max:100',
            'cta_link' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer|min:0',
            'active' => 'nullable|boolean',
            'type' => 'sometimes|required|in:hero,promotional,announcement',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'target_audience' => 'nullable|in:all,patients,doctors,general',
            'priority' => 'nullable|in:low,medium,high',
            'animation_type' => 'nullable|in:fade,slide,zoom,flip',
            'overlay_opacity' => 'nullable|integer|min:0|max:100'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $banner->update($validator->validated());

            return response()->json([
                'success' => true,
                'message' => 'Banner updated successfully',
                'data' => $banner
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update banner: ' . $e->getMessage()
            ], 500);
        }
    }

    // Delete banner (admin only)
    public function destroy($id)
    {
        try {
            $banner = Banner::findOrFail($id);
            
            // Delete associated image file if exists
            if ($banner->image && Storage::disk('public')->exists($banner->image)) {
                Storage::disk('public')->delete($banner->image);
            }
            
            $banner->delete();

            return response()->json([
                'success' => true,
                'message' => 'Banner deleted successfully'
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete banner: ' . $e->getMessage()
            ], 500);
        }
    }

    // Toggle banner active status (admin only)
    public function toggleActive($id)
    {
        try {
            $banner = Banner::findOrFail($id);
            $banner->active = !$banner->active;
            $banner->save();

            return response()->json([
                'success' => true,
                'message' => 'Banner status updated successfully',
                'data' => $banner
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update banner status: ' . $e->getMessage()
            ], 500);
        }
    }

    // Get banner statistics
    public function getStats()
    {
        try {
            $stats = [
                'total_banners' => Banner::count(),
                'active_banners' => Banner::where('active', true)->count(),
                'inactive_banners' => Banner::where('active', false)->count(),
                'hero_banners' => Banner::where('type', 'hero')->count(),
                'promotional_banners' => Banner::where('type', 'promotional')->count(),
                'announcement_banners' => Banner::where('type', 'announcement')->count(),
                'high_priority' => Banner::where('priority', 'high')->count(),
                'medium_priority' => Banner::where('priority', 'medium')->count(),
                'low_priority' => Banner::where('priority', 'low')->count(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics: ' . $e->getMessage()
            ], 500);
        }
    }
}
