<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Prescription;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    public function index(Request $request)
    {
        $query = Prescription::with(['doctor.user', 'patient', 'items']);

        if ($request->user()->role === 'patient') {
            $query->where('patient_id', $request->user()->id);
        } elseif ($request->user()->role === 'doctor') {
            $query->where('doctor_id', $request->user()->doctor->id);
        }

        $prescriptions = $query->orderBy('prescription_date', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($prescriptions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'appointment_id' => 'required|exists:appointments,id',
            'diagnosis' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.medicine_name' => 'required|string',
            'items.*.dosage' => 'nullable|string',
            'items.*.frequency' => 'nullable|string',
            'items.*.duration' => 'nullable|string',
        ]);

        $appointment = \App\Models\Appointment::findOrFail($validated['appointment_id']);

        $prescription = Prescription::create([
            'appointment_id' => $validated['appointment_id'],
            'doctor_id' => $appointment->doctor_id,
            'patient_id' => $appointment->patient_id,
            'diagnosis' => $validated['diagnosis'] ?? null,
            'prescription_date' => now(),
        ]);

        foreach ($validated['items'] as $item) {
            $prescription->items()->create($item);
        }

        return response()->json($prescription->load('items'), 201);
    }

    public function show($id)
    {
        $prescription = Prescription::with(['doctor.user', 'patient', 'items', 'appointment'])
            ->findOrFail($id);
        return response()->json($prescription);
    }
}
