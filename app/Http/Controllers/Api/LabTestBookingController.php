<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabTestBooking;
use Illuminate\Http\Request;

class LabTestBookingController extends Controller
{
    public function index(Request $request)
    {
        $query = LabTestBooking::with('labTest');

        if ($request->user()->role !== 'admin') {
            $query->where('user_id', $request->user()->id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $bookings = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($bookings);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'lab_test_id' => 'required|exists:lab_tests,id',
            'preferred_date' => 'required|date|after_or_equal:today',
            'preferred_time' => 'nullable',
            'collection_type' => 'required|in:home,center',
            'patient_name' => 'required|string',
            'patient_phone' => 'required|string',
            'address' => 'required_if:collection_type,home|string',
            'city' => 'required|string',
        ]);

        $labTest = \App\Models\LabTest::findOrFail($validated['lab_test_id']);
        $price = $labTest->discount_price ?? $labTest->price;

        $booking = LabTestBooking::create([
            'user_id' => $request->user()->id,
            'lab_test_id' => $validated['lab_test_id'],
            'preferred_date' => $validated['preferred_date'],
            'preferred_time' => $validated['preferred_time'] ?? null,
            'collection_type' => $validated['collection_type'],
            'patient_name' => $validated['patient_name'],
            'patient_phone' => $validated['patient_phone'],
            'address' => $validated['address'] ?? null,
            'city' => $validated['city'],
            'price' => $price,
            'status' => 'pending',
            'payment_status' => 'pending',
        ]);

        return response()->json($booking->load('labTest'), 201);
    }

    public function show($id)
    {
        $booking = LabTestBooking::with('labTest')->findOrFail($id);
        return response()->json($booking);
    }

    public function update(Request $request, $id)
    {
        $booking = LabTestBooking::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,confirmed,sample_collected,processing,completed,cancelled',
            'payment_status' => 'sometimes|in:pending,paid,refunded',
        ]);

        $booking->update($validated);

        return response()->json($booking);
    }
}
