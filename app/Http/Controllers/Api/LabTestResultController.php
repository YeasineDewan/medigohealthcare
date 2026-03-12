<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabTestResult;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LabTestResultController extends Controller
{
    public function index(Request $request)
    {
        $query = LabTestResult::with('user');

        // Search
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('patient_name', 'like', "%{$search}%")
                  ->orWhere('result_id', 'like', "%{$search}%")
                  ->orWhere('sample_id', 'like', "%{$search}%");
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

        // Filter by priority
        if ($request->has('priority') && $request->get('priority') !== 'all') {
            $query->where('priority', $request->get('priority'));
        }

        $results = $query->orderBy('test_date', 'desc')
                     ->orderBy('received_time', 'desc')
                     ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $results,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sample_id' => 'nullable|string|max:50',
            'patient_name' => 'required|string|max:255',
            'patient_phone' => 'required|string|max:20',
            'patient_age' => 'nullable|integer|min:0|max:150',
            'patient_gender' => 'nullable|in:male,female,other',
            'referrer' => 'nullable|string|max:255',
            'tests' => 'required|array|min:1',
            'category' => 'nullable|string|max:100',
            'test_date' => 'required|date',
            'received_time' => 'nullable|date_format:H:i',
            'due_date' => 'nullable|date',
            'priority' => 'required|in:normal,urgent',
            'parameters' => 'required|array',
            'amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $result = LabTestResult::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $result,
            'message' => 'Test result created successfully',
        ]);
    }

    public function show($id)
    {
        $result = LabTestResult::with('user')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    public function update(Request $request, $id)
    {
        $result = LabTestResult::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'sample_id' => 'nullable|string|max:50',
            'patient_name' => 'required|string|max:255',
            'patient_phone' => 'required|string|max:20',
            'patient_age' => 'nullable|integer|min:0|max:150',
            'patient_gender' => 'nullable|in:male,female,other',
            'referrer' => 'nullable|string|max:255',
            'tests' => 'required|array|min:1',
            'category' => 'nullable|string|max:100',
            'test_date' => 'required|date',
            'received_time' => 'nullable|date_format:H:i',
            'due_date' => 'nullable|date',
            'status' => 'required|in:pending,in-progress,completed',
            'priority' => 'required|in:normal,urgent',
            'parameters' => 'required|array',
            'amount' => 'required|numeric|min:0',
            'notes' => 'nullable|string',
            'published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $result->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $result,
            'message' => 'Test result updated successfully',
        ]);
    }

    public function publishResult($id)
    {
        $result = LabTestResult::findOrFail($id);
        
        $result->update([
            'published' => true,
            'published_date' => now()->format('Y-m-d'),
            'published_time' => now()->format('H:i'),
        ]);

        return response()->json([
            'success' => true,
            'data' => $result,
            'message' => 'Test result published successfully',
        ]);
    }

    public function destroy($id)
    {
        $result = LabTestResult::findOrFail($id);
        $result->delete();

        return response()->json([
            'success' => true,
            'message' => 'Test result deleted successfully',
        ]);
    }

    public function getStats()
    {
        $total = LabTestResult::count();
        $pending = LabTestResult::where('status', 'pending')->count();
        $inProgress = LabTestResult::where('status', 'in-progress')->count();
        $completed = LabTestResult::where('status', 'completed')->count();
        $published = LabTestResult::where('published', true)->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'pending' => $pending,
                'in_progress' => $inProgress,
                'completed' => $completed,
                'published' => $published,
            ],
        ]);
    }
}
