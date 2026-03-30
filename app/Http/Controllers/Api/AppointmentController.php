<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Appointment::with(['patient', 'doctor.user']);

        if ($request->user()->role === 'patient') {
            $query->where('patient_id', $request->user()->id);
        } elseif ($request->user()->role === 'doctor') {
            $query->where('doctor_id', $request->user()->doctor->id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $appointments = $query->orderBy('appointment_date', 'desc')
            ->orderBy('appointment_time', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($appointments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'doctor_id' => 'required|exists:doctors,id',
            'type' => 'required|in:in-person,video',
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required',
            'symptoms' => 'nullable|string',
        ]);

        $doctor = \App\Models\Doctor::findOrFail($validated['doctor_id']);
        $fee = $validated['type'] === 'video' 
            ? $doctor->video_consultation_fee 
            : $doctor->consultation_fee;

        $appointment = Appointment::create([
            'patient_id' => $request->user()->id,
            'doctor_id' => $validated['doctor_id'],
            'type' => $validated['type'],
            'appointment_date' => $validated['appointment_date'],
            'appointment_time' => $validated['appointment_time'],
            'symptoms' => $validated['symptoms'] ?? null,
            'fee' => $fee,
            'status' => 'pending',
        ]);

        return response()->json($appointment->load(['patient', 'doctor.user']), 201);
    }

    public function show($id)
    {
        $appointment = Appointment::with(['patient', 'doctor.user', 'prescription.items'])
            ->findOrFail($id);
        return response()->json($appointment);
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,confirmed,completed,cancelled,no-show',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($validated);

        return response()->json($appointment);
    }
}
