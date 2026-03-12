<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabEquipment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LabEquipmentController extends Controller
{
    public function index(Request $request)
    {
        $query = LabEquipment::query();

        // Search
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('equipment_id', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('serial_number', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }

        // Filter by category
        if ($request->has('category') && $request->get('category') !== 'all') {
            $query->where('category', $request->get('category'));
        }

        // Filter by condition
        if ($request->has('condition') && $request->get('condition') !== 'all') {
            $query->where('condition', $request->get('condition'));
        }

        $equipment = $query->orderBy('name')->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $equipment,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'model' => 'nullable|string|max:255',
            'serial_number' => 'required|string|max:100|unique:lab_equipment,serial_number',
            'manufacturer' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'purchase_cost' => 'nullable|numeric|min:0',
            'warranty_expiry' => 'nullable|date',
            'status' => 'required|in:operational,maintenance,repair,retired',
            'condition' => 'required|in:excellent,good,fair,poor',
            'last_calibration' => 'nullable|date',
            'next_calibration' => 'nullable|date',
            'last_maintenance' => 'nullable|date',
            'next_maintenance' => 'nullable|date',
            'total_tests' => 'integer|min:0',
            'uptime' => 'numeric|min:0|max:100',
            'specifications' => 'nullable|array',
            'image' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $equipment = LabEquipment::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $equipment,
            'message' => 'Lab equipment created successfully',
        ]);
    }

    public function show($id)
    {
        $equipment = LabEquipment::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $equipment,
        ]);
    }

    public function update(Request $request, $id)
    {
        $equipment = LabEquipment::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'model' => 'nullable|string|max:255',
            'serial_number' => 'required|string|max:100|unique:lab_equipment,serial_number,' . $id,
            'manufacturer' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'purchase_cost' => 'nullable|numeric|min:0',
            'warranty_expiry' => 'nullable|date',
            'status' => 'required|in:operational,maintenance,repair,retired',
            'condition' => 'required|in:excellent,good,fair,poor',
            'last_calibration' => 'nullable|date',
            'next_calibration' => 'nullable|date',
            'last_maintenance' => 'nullable|date',
            'next_maintenance' => 'nullable|date',
            'total_tests' => 'integer|min:0',
            'uptime' => 'numeric|min:0|max:100',
            'specifications' => 'nullable|array',
            'image' => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $equipment->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $equipment,
            'message' => 'Lab equipment updated successfully',
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $equipment = LabEquipment::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:operational,maintenance,repair,retired',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $equipment->update(['status' => $request->get('status')]);

        return response()->json([
            'success' => true,
            'data' => $equipment,
            'message' => 'Equipment status updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $equipment = LabEquipment::findOrFail($id);
        $equipment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lab equipment deleted successfully',
        ]);
    }

    public function getStats()
    {
        $total = LabEquipment::count();
        $operational = LabEquipment::where('status', 'operational')->count();
        $maintenance = LabEquipment::where('status', 'maintenance')->count();
        $repair = LabEquipment::where('status', 'repair')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'operational' => $operational,
                'maintenance' => $maintenance,
                'repair' => $repair,
            ],
        ]);
    }
}
