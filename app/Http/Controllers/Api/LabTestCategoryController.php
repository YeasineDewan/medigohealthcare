<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabTestCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LabTestCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = LabTestCategory::query();

        // Search
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }

        // Filter by department
        if ($request->has('department') && $request->get('department') !== 'all') {
            $query->where('department', $request->get('department'));
        }

        $categories = $query->orderBy('name')->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:lab_test_categories,code',
            'description' => 'nullable|string',
            'department' => 'nullable|string|max:100',
            'price_range' => 'nullable|array',
            'avg_turnaround' => 'nullable|string|max:50',
            'container_type' => 'nullable|string|max:100',
            'volume' => 'nullable|string|max:50',
            'instructions' => 'nullable|string',
            'requires_fasting' => 'boolean',
            'accredited' => 'boolean',
            'home_collection' => 'boolean',
            'reports_available' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $category = LabTestCategory::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Test category created successfully',
        ]);
    }

    public function show($id)
    {
        $category = LabTestCategory::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $category,
        ]);
    }

    public function update(Request $request, $id)
    {
        $category = LabTestCategory::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:10|unique:lab_test_categories,code,' . $id,
            'description' => 'nullable|string',
            'department' => 'nullable|string|max:100',
            'price_range' => 'nullable|array',
            'avg_turnaround' => 'nullable|string|max:50',
            'container_type' => 'nullable|string|max:100',
            'volume' => 'nullable|string|max:50',
            'instructions' => 'nullable|string',
            'requires_fasting' => 'boolean',
            'accredited' => 'boolean',
            'home_collection' => 'boolean',
            'reports_available' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $category->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $category,
            'message' => 'Test category updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $category = LabTestCategory::findOrFail($id);
        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Test category deleted successfully',
        ]);
    }

    public function getStats()
    {
        $total = LabTestCategory::count();
        $active = LabTestCategory::where('status', 'active')->count();
        $inactive = LabTestCategory::where('status', 'inactive')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'active' => $active,
                'inactive' => $inactive,
            ],
        ]);
    }
}
