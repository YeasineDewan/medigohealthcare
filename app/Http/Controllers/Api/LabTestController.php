<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabTest;
use App\Models\LabTestBooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LabTestController extends Controller
{
    public function index(Request $request)
    {
        $query = LabTest::with('category');

        // Apply filters
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('test_code', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Legacy category filtering (string-based)
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->is_popular !== null) {
            $query->where('is_popular', $request->is_popular);
        }

        if ($request->is_home_collection !== null) {
            $query->where('is_home_collection', $request->is_home_collection);
        }

        // Apply sorting
        $sortBy = $request->sort_by ?? 'name';
        $sortOrder = $request->sort_order ?? 'asc';
        
        switch ($sortBy) {
            case 'price':
                $query->orderBy('price', $sortOrder);
                break;
            case 'popularity':
                $query->orderBy('booking_count', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'name':
                $query->orderBy('name', $sortOrder);
                break;
            default:
                $query->orderBy($sortBy, $sortOrder);
        }

        $labTests = $query->where('is_active', true)->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $labTests,
            'message' => 'Lab tests retrieved successfully'
        ]);
    }

    public function show($id)
    {
        $labTest = LabTest::with(['category', 'bookings.patient'])
                         ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $labTest,
            'message' => 'Lab test retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'test_code' => 'required|string|max:50|unique:lab_tests,test_code',
            'category_id' => 'nullable|exists:lab_test_categories,id',
                        'type' => 'required|in:blood,urine,imaging,pathology,other',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'sample_type' => 'required|in:blood,urine,swab,tissue,other',
            'collection_method' => 'required|string|max:500',
            'preparation_instructions' => 'nullable|array',
            'test_duration' => 'required|integer|min:1',
            'result_delivery_time' => 'required|string|max:100',
            'is_home_collection' => 'boolean',
            'home_collection_fee' => 'nullable|numeric|min:0',
            'is_popular' => 'boolean',
            'normal_range' => 'nullable|string|max:1000',
            'abnormal_indicators' => 'nullable|array',
            'required_equipment' => 'nullable|array',
            'test_parameters' => 'nullable|array',
            'interpretation_guide' => 'nullable|string|max:2000',
            'contraindications' => 'nullable|array',
            'risks' => 'nullable|array',
            'after_care_instructions' => 'nullable|array',
            'doctor_consultation_required' => 'boolean',
            'consultation_fee' => 'nullable|numeric|min:0',
            'images' => 'nullable|array',
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
        $data['slug'] = \Illuminate\Support\Str::slug($request->name) . '-' . time();
        $data['is_active'] = true;
        $data['created_by'] = auth()->id();

        $labTest = LabTest::create($data);

        return response()->json([
            'success' => true,
            'data' => $labTest->load('category'),
            'message' => 'Lab test created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $labTest = LabTest::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'test_code' => 'sometimes|required|string|max:50|unique:lab_tests,test_code,' . $id,
            'category_id' => 'sometimes|exists:lab_test_categories,id',
                        'type' => 'sometimes|required|in:blood,urine,imaging,pathology,other',
            'price' => 'sometimes|required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'sample_type' => 'sometimes|required|in:blood,urine,swab,tissue,other',
            'collection_method' => 'sometimes|required|string|max:500',
            'preparation_instructions' => 'nullable|array',
            'test_duration' => 'sometimes|required|integer|min:1',
            'result_delivery_time' => 'sometimes|required|string|max:100',
            'is_home_collection' => 'boolean',
            'home_collection_fee' => 'nullable|numeric|min:0',
            'is_popular' => 'boolean',
            'is_active' => 'boolean',
            'normal_range' => 'nullable|string|max:1000',
            'abnormal_indicators' => 'nullable|array',
            'required_equipment' => 'nullable|array',
            'test_parameters' => 'nullable|array',
            'interpretation_guide' => 'nullable|string|max:2000',
            'contraindications' => 'nullable|array',
            'risks' => 'nullable|array',
            'after_care_instructions' => 'nullable|array',
            'doctor_consultation_required' => 'boolean',
            'consultation_fee' => 'nullable|numeric|min:0',
            'images' => 'nullable|array',
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
        
        if ($request->has('name') && $request->name !== $labTest->name) {
            $data['slug'] = \Illuminate\Support\Str::slug($request->name) . '-' . time();
        }
        
        $data['updated_by'] = auth()->id();

        $labTest->update($data);

        return response()->json([
            'success' => true,
            'data' => $labTest->fresh()->load('category'),
            'message' => 'Lab test updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $labTest = LabTest::findOrFail($id);

        // Check if test has active bookings
        if ($labTest->bookings()->whereIn('status', ['pending', 'confirmed', 'sample_collected'])->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete lab test with active bookings'
            ], 400);
        }

        $labTest->delete();

        return response()->json([
            'success' => true,
            'message' => 'Lab test deleted successfully'
        ]);
    }

    public function popular(Request $request)
    {
        $labTests = LabTest::with('category')
                          ->where('is_popular', true)
                          ->where('is_active', true)
                          ->orderBy('booking_count', 'desc')
                          ->limit($request->limit ?? 20)
                          ->get();

        return response()->json([
            'success' => true,
            'data' => $labTests,
            'message' => 'Popular lab tests retrieved successfully'
        ]);
    }

    public function byCategory($categoryId, Request $request)
    {
        $query = LabTest::with('category')
                       ->where('category_id', $categoryId)
                       ->where('is_active', true);

        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        $labTests = $query->orderBy('name', 'asc')
                         ->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $labTests,
            'message' => 'Lab tests by category retrieved successfully'
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

        $labTests = LabTest::with('category')
                          ->where('is_active', true)
                          ->where(function($q) use ($request) {
                              $q->where('name', 'like', '%' . $request->query . '%')
                                ->orWhere('description', 'like', '%' . $request->query . '%')
                                ->orWhere('test_code', 'like', '%' . $request->query . '%');
                          })
                          ->orderBy('booking_count', 'desc')
                          ->limit($request->limit ?? 50)
                          ->get();

        return response()->json([
            'success' => true,
            'data' => $labTests,
            'message' => 'Lab test search completed successfully'
        ]);
    }

    public function book(Request $request, $testId)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'booking_date' => 'required|date|after_or_equal:today',
            'booking_time' => 'required|string|max:20',
            'is_home_collection' => 'boolean',
            'collection_address' => 'nullable|required_if:is_home_collection,true|string|max:500',
            'collection_city' => 'nullable|required_if:is_home_collection,true|string|max:100',
            'collection_phone' => 'nullable|required_if:is_home_collection,true|string|max:20',
            'doctor_referral' => 'nullable|string|max:255',
            'medical_history' => 'nullable|string|max:1000',
            'current_medications' => 'nullable|array',
            'allergies' => 'nullable|array',
            'special_instructions' => 'nullable|string|max:500',
            'payment_method' => 'required|in:cash,online,card,mobile_banking',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $labTest = LabTest::findOrFail($testId);
        $user = Auth::user();

        return DB::transaction(function () use ($request, $labTest, $user) {
            $bookingNumber = 'LAB' . date('Ymd') . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
            
            $totalAmount = $labTest->discount_price ?? $labTest->price;
            
            if ($request->is_home_collection) {
                $totalAmount += $labTest->home_collection_fee;
            }

            $booking = LabTestBooking::create([
                'booking_number' => $bookingNumber,
                'lab_test_id' => $labTest->id,
                'patient_id' => $request->patient_id,
                'user_id' => $user->id,
                'booking_date' => $request->booking_date,
                'booking_time' => $request->booking_time,
                'is_home_collection' => $request->is_home_collection ?? false,
                'collection_address' => $request->collection_address,
                'collection_city' => $request->collection_city,
                'collection_phone' => $request->collection_phone,
                'doctor_referral' => $request->doctor_referral,
                'medical_history' => $request->medical_history,
                'current_medications' => $request->current_medications,
                'allergies' => $request->allergies,
                'special_instructions' => $request->special_instructions,
                'test_price' => $labTest->price,
                'discount_amount' => $labTest->discount_price ? ($labTest->price - $labTest->discount_price) : 0,
                'collection_fee' => $request->is_home_collection ? $labTest->home_collection_fee : 0,
                'total_amount' => $totalAmount,
                'currency' => 'BDT',
                'payment_method' => $request->payment_method,
                'payment_status' => 'pending',
                'status' => 'pending',
                'created_by' => $user->id,
            ]);

            // Update booking count
            $labTest->increment('booking_count');

            return response()->json([
                'success' => true,
                'data' => $booking->load(['labTest', 'patient.user']),
                'message' => 'Lab test booking created successfully'
            ], 201);
        });
    }

    public function bookings(Request $request)
    {
        $user = Auth::user();
        $query = LabTestBooking::with(['labTest', 'patient.user']);

        // Filter based on user role
        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        // Apply filters
        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->date_from) {
            $query->whereDate('booking_date', '>=', $request->date_from);
        }

        if ($request->date_to) {
            $query->whereDate('booking_date', '<=', $request->date_to);
        }

        $bookings = $query->orderBy('booking_date', 'desc')
                         ->orderBy('booking_time', 'desc')
                         ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $bookings,
            'message' => 'Lab test bookings retrieved successfully'
        ]);
    }

    public function updateBookingStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,confirmed,sample_collected,processing,completed,cancelled',
            'collection_notes' => 'nullable|string|max:1000',
            'result_file_path' => 'nullable|string|max:500',
            'result_notes' => 'nullable|string|max:2000',
            'admin_notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $booking = LabTestBooking::with(['labTest', 'patient.user'])
                                ->findOrFail($id);

        $updateData = $request->only([
            'status',
            'collection_notes',
            'result_file_path',
            'result_notes',
            'admin_notes'
        ]);

        // Add timestamps for status changes
        if ($request->status === 'confirmed') {
            $updateData['confirmed_at'] = now();
        } elseif ($request->status === 'sample_collected') {
            $updateData['sample_collected_at'] = now();
        } elseif ($request->status === 'processing') {
            $updateData['processing_started_at'] = now();
        } elseif ($request->status === 'completed') {
            $updateData['completed_at'] = now();
            $updateData['result_delivered_at'] = now();
        } elseif ($request->status === 'cancelled') {
            $updateData['cancelled_at'] = now();
            $updateData['cancellation_reason'] = $request->cancellation_reason ?? 'Cancelled by admin';
        }

        $booking->update($updateData);

        return response()->json([
            'success' => true,
            'data' => $booking->fresh(),
            'message' => 'Lab test booking status updated successfully'
        ]);
    }

    public function statistics()
    {
        $total = LabTest::where('is_active', true)->count();
        $popular = LabTest::where('is_popular', true)->where('is_active', true)->count();
        $homeCollection = LabTest::where('is_home_collection', true)->where('is_active', true)->count();
        
        $totalBookings = LabTestBooking::count();
        $pendingBookings = LabTestBooking::where('status', 'pending')->count();
        $confirmedBookings = LabTestBooking::where('status', 'confirmed')->count();
        $completedBookings = LabTestBooking::where('status', 'completed')->count();
        $cancelledBookings = LabTestBooking::where('status', 'cancelled')->count();

        $totalRevenue = LabTestBooking::where('payment_status', 'paid')->sum('total_amount');
        $thisMonthRevenue = LabTestBooking::where('payment_status', 'paid')
                                        ->whereMonth('created_at', now()->month)
                                        ->whereYear('created_at', now()->year)
                                        ->sum('total_amount');

        return response()->json([
            'success' => true,
            'data' => [
                'total_tests' => $total,
                'popular_tests' => $popular,
                'home_collection_tests' => $homeCollection,
                'total_bookings' => $totalBookings,
                'pending_bookings' => $pendingBookings,
                'confirmed_bookings' => $confirmedBookings,
                'completed_bookings' => $completedBookings,
                'cancelled_bookings' => $cancelledBookings,
                'total_revenue' => $totalRevenue,
                'this_month_revenue' => $thisMonthRevenue,
            ],
            'message' => 'Lab test statistics retrieved successfully'
        ]);
    }
}
