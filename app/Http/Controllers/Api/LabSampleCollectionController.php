<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabSampleCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LabSampleCollectionController extends Controller
{
    public function index(Request $request)
    {
        $query = LabSampleCollection::with('user');

        // Search
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('patient_name', 'like', "%{$search}%")
                  ->orWhere('sample_id', 'like', "%{$search}%")
                  ->orWhere('patient_phone', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }

        // Filter by collection type
        if ($request->has('collection_type') && $request->get('collection_type') !== 'all') {
            $query->where('collection_type', $request->get('collection_type'));
        }

        // Filter by date range
        if ($request->has('date_from')) {
            $query->whereDate('collection_date', '>=', $request->get('date_from'));
        }
        if ($request->has('date_to')) {
            $query->whereDate('collection_date', '<=', $request->get('date_to'));
        }

        $samples = $query->orderBy('collection_date', 'desc')
                      ->orderBy('scheduled_time', 'desc')
                      ->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $samples,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_name' => 'required|string|max:255',
            'patient_phone' => 'required|string|max:20',
            'patient_email' => 'nullable|email|max:255',
            'patient_age' => 'nullable|integer|min:0|max:150',
            'patient_gender' => 'nullable|in:male,female,other',
            'tests' => 'required|array|min:1',
            'category' => 'nullable|string|max:100',
            'collection_type' => 'required|in:Walk-in,Home Collection,Referral',
            'collection_address' => 'nullable|string',
            'referrer' => 'nullable|string|max:255',
            'phlebotomist' => 'nullable|string|max:255',
            'sample_type' => 'required|string|max:100',
            'container_type' => 'nullable|string|max:255',
            'volume' => 'nullable|string|max:50',
            'collection_date' => 'required|date',
            'scheduled_time' => 'nullable|date_format:H:i',
            'priority' => 'required|in:normal,urgent',
            'instructions' => 'nullable|string',
            'notes' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'payment_status' => 'required|in:paid,pending',
            'reports_delivery' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $sample = LabSampleCollection::create($request->all());

        return response()->json([
            'success' => true,
            'data' => $sample,
            'message' => 'Sample collection created successfully',
        ]);
    }

    public function show($id)
    {
        $sample = LabSampleCollection::with('user')->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $sample,
        ]);
    }

    public function update(Request $request, $id)
    {
        $sample = LabSampleCollection::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'patient_name' => 'required|string|max:255',
            'patient_phone' => 'required|string|max:20',
            'patient_email' => 'nullable|email|max:255',
            'patient_age' => 'nullable|integer|min:0|max:150',
            'patient_gender' => 'nullable|in:male,female,other',
            'tests' => 'required|array|min:1',
            'category' => 'nullable|string|max:100',
            'collection_type' => 'required|in:Walk-in,Home Collection,Referral',
            'collection_address' => 'nullable|string',
            'referrer' => 'nullable|string|max:255',
            'phlebotomist' => 'nullable|string|max:255',
            'sample_type' => 'required|string|max:100',
            'container_type' => 'nullable|string|max:255',
            'volume' => 'nullable|string|max:50',
            'collection_date' => 'required|date',
            'scheduled_time' => 'nullable|date_format:H:i',
            'status' => 'required|in:scheduled,pending,collected,delivered,cancelled',
            'priority' => 'required|in:normal,urgent',
            'instructions' => 'nullable|string',
            'notes' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'payment_status' => 'required|in:paid,pending',
            'reports_delivery' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $sample->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $sample,
            'message' => 'Sample collection updated successfully',
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $sample = LabSampleCollection::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:scheduled,pending,collected,delivered,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $sample->update(['status' => $request->get('status')]);

        return response()->json([
            'success' => true,
            'data' => $sample,
            'message' => 'Sample status updated successfully',
        ]);
    }

    public function destroy($id)
    {
        $sample = LabSampleCollection::findOrFail($id);
        $sample->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sample collection deleted successfully',
        ]);
    }

    public function getStats()
    {
        $total = LabSampleCollection::count();
        $collected = LabSampleCollection::where('status', 'collected')->count();
        $pending = LabSampleCollection::where('status', 'pending')->count();
        $scheduled = LabSampleCollection::where('status', 'scheduled')->count();
        $homeCollection = LabSampleCollection::where('collection_type', 'Home Collection')->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'collected' => $collected,
                'pending' => $pending,
                'scheduled' => $scheduled,
                'home_collection' => $homeCollection,
            ],
        ]);
    }
}
