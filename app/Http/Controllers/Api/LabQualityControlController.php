<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabQualityControl;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LabQualityControlController extends Controller
{
    public function index(Request $request)
    {
        $query = LabQualityControl::query();

        // Search
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('control_name', 'like', "%{$search}%")
                  ->orWhere('qc_id', 'like', "%{$search}%")
                  ->orWhere('lot_number', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }

        // Filter by type
        if ($request->has('type') && $request->get('type') !== 'all') {
            $query->where('control_type', $request->get('type'));
        }

        // Filter by control level
        if ($request->has('control_level') && $request->get('control_level') !== 'all') {
            $query->where('control_level', $request->get('control_level'));
        }

        $qcData = $query->orderBy('control_name')->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $qcData,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'control_name' => 'required|string|max:255',
            'lot_number' => 'required|string|max:100',
            'manufacturer' => 'nullable|string|max:255',
            'expiry_date' => 'required|date',
            'control_type' => 'required|in:Internal,External',
            'control_level' => 'required|string|max:20',
            'parameters' => 'required|array|min:1',
            'assigned_to' => 'nullable|string|max:255',
            'status' => 'required|in:active,expired,depleted',
            'opened_date' => 'nullable|date',
            'used_count' => 'integer|min:0',
            'remaining_uses' => 'nullable|integer|min:0',
            'target_values' => 'nullable|array',
            'current_values' => 'nullable|array',
            'last_run_date' => 'nullable|date',
            'last_run_result' => 'nullable|in:passed,failed,warning',
            'sd_values' => 'nullable|array',
            'acceptable_range' => 'nullable|array',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $qc = LabQualityControl::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $qc,
            'message' => 'Quality control record created successfully',
        ]);
    }

    public function show($id)
    {
        $qc = LabQualityControl::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $qc,
        ]);
    }

    public function update(Request $request, $id)
    {
        $qc = LabQualityControl::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'control_name' => 'required|string|max:255',
            'lot_number' => 'required|string|max:100',
            'manufacturer' => 'nullable|string|max:255',
            'expiry_date' => 'required|date',
            'control_type' => 'required|in:Internal,External',
            'control_level' => 'required|string|max:20',
            'parameters' => 'required|array|min:1',
            'assigned_to' => 'nullable|string|max:255',
            'status' => 'required|in:active,expired,depleted',
            'opened_date' => 'nullable|date',
            'used_count' => 'integer|min:0',
            'remaining_uses' => 'nullable|integer|min:0',
            'target_values' => 'nullable|array',
            'current_values' => 'nullable|array',
            'last_run_date' => 'nullable|date',
            'last_run_result' => 'nullable|in:passed,failed,warning',
            'sd_values' => 'nullable|array',
            'acceptable_range' => 'nullable|array',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $qc->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $qc,
            'message' => 'Quality control record updated successfully',
        ]);
    }

    public function runQC(Request $request, $id)
    {
        $qc = LabQualityControl::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'current_values' => 'required|array',
            'last_run_result' => 'required|in:passed,failed,warning',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $qc->update([
            'current_values' => $request->get('current_values'),
            'last_run_result' => $request->get('last_run_result'),
            'last_run_date' => now()->format('Y-m-d'),
            'used_count' => $qc->used_count + 1,
        ]);

        return response()->json([
            'success' => true,
            'data' => $qc,
            'message' => 'Quality control test completed successfully',
        ]);
    }

    public function destroy($id)
    {
        $qc = LabQualityControl::findOrFail($id);
        $qc->delete();

        return response()->json([
            'success' => true,
            'message' => 'Quality control record deleted successfully',
        ]);
    }

    public function getStats()
    {
        $total = LabQualityControl::count();
        $active = LabQualityControl::where('status', 'active')->count();
        $expired = LabQualityControl::where('status', 'expired')->count();
        $depleted = LabQualityControl::where('status', 'depleted')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'active' => $active,
                'expired' => $expired,
                'depleted' => $depleted,
            ],
        ]);
    }
}
