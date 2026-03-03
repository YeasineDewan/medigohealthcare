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

    public function search(Request $request)
    {
        $query = $request->get('q', '');
        $status = $request->get('status');
        $priority = $request->get('priority');
        
        $prescriptions = Prescription::with(['doctor.user', 'patient', 'items'])
            ->when($query, function($q) use ($query) {
                $q->where('id', 'like', "%{$query}%")
                  ->orWhereHas('patient', function($q) use ($query) {
                      $q->where('name', 'like', "%{$query}%");
                  });
            })
            ->when($status, function($q) use ($status) {
                $q->where('status', $status);
            })
            ->when($priority, function($q) use ($priority) {
                $q->where('priority', $priority);
            })
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($prescriptions);
    }

    public function upload(Request $request)
    {
        $validated = $request->validate([
            'customerId' => 'required',
            'doctorName' => 'nullable|string',
            'doctorLicense' => 'nullable|string',
            'notes' => 'nullable|string',
            'urgency' => 'nullable|string',
            'deliveryMethod' => 'nullable|string',
            'prescriptionImage' => 'required|image|max:10240',
        ]);

        $imagePath = $request->file('prescriptionImage')->store('prescriptions', 'public');

        $prescription = Prescription::create([
            'patient_id' => $validated['customerId'],
            'doctor_name' => $validated['doctorName'] ?? null,
            'doctor_license' => $validated['doctorLicense'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'priority' => $validated['urgency'] ?? 'normal',
            'delivery_method' => $validated['deliveryMethod'] ?? 'pickup',
            'prescription_image' => $imagePath,
            'status' => 'pending_verification',
            'prescription_date' => now(),
        ]);

        return response()->json($prescription, 201);
    }

    public function getByCustomer($customerId)
    {
        $prescriptions = Prescription::with(['items'])
            ->where('patient_id', $customerId)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($prescriptions);
    }

    public function analytics(Request $request)
    {
        $range = $request->get('range', '30d');
        
        $stats = [
            'total' => Prescription::count(),
            'pending' => Prescription::where('status', 'pending_verification')->count(),
            'verified' => Prescription::where('status', 'verified')->count(),
            'completed' => Prescription::where('status', 'completed')->count(),
        ];

        return response()->json($stats);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'pharmacistId' => 'required',
            'notes' => 'nullable|string',
        ]);

        $prescription = Prescription::findOrFail($id);
        $prescription->update([
            'status' => $validated['status'],
            'pharmacist_id' => $validated['pharmacistId'],
            'verification_notes' => $validated['notes'] ?? null,
            'verified_at' => now(),
        ]);

        return response()->json(['success' => true, 'prescription' => $prescription]);
    }

    public function process(Request $request, $id)
    {
        $validated = $request->validate([
            'items' => 'nullable|array',
            'notes' => 'nullable|string',
        ]);

        $prescription = Prescription::findOrFail($id);
        $orderId = 'ORD-' . strtoupper(uniqid());
        
        $prescription->update([
            'status' => 'processing',
            'order_id' => $orderId,
            'processed_at' => now(),
        ]);

        return response()->json(['success' => true, 'orderId' => $orderId]);
    }

    public function destroy($id)
    {
        $prescription = Prescription::findOrFail($id);
        $prescription->delete();

        return response()->json(['success' => true]);
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
