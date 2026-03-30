<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

        $banners = $query->get();

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

    // Create banner (admin only)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'background_color' => 'required|string|max:255',
            'cta_text' => 'nullable|string|max:100',
            'cta_link' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'active' => 'nullable|boolean',
            'type' => 'required|in:hero,promotional,announcement',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $banner = Banner::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Banner created successfully',
            'data' => $banner
        ], 201);
    }

    // Update banner (admin only)
    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'background_color' => 'sometimes|required|string|max:255',
            'cta_text' => 'nullable|string|max:100',
            'cta_link' => 'nullable|string|max:255',
            'display_order' => 'nullable|integer',
            'active' => 'nullable|boolean',
            'type' => 'sometimes|required|in:hero,promotional,announcement',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $banner->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Banner updated successfully',
            'data' => $banner
        ]);
    }

    // Delete banner (admin only)
    public function destroy($id)
    {
        $banner = Banner::findOrFail($id);
        $banner->delete();

        return response()->json([
            'success' => true,
            'message' => 'Banner deleted successfully'
        ]);
    }

    // Toggle banner active status (admin only)
    public function toggleActive($id)
    {
        $banner = Banner::findOrFail($id);
        $banner->active = !$banner->active;
        $banner->save();

        return response()->json([
            'success' => true,
            'message' => 'Banner status updated successfully',
            'data' => $banner
        ]);
    }
}
