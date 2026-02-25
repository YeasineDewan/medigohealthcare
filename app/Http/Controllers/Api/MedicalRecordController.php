<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    public function index(Request $request)
    {
        $query = MedicalRecord::with(['doctor.user', 'appointment']);

        if ($request->user()->role === 'patient') {
            $query->where('patient_id', $request->user()->id);
        }

        if ($request->has('record_type')) {
            $query->where('record_type', $request->record_type);
        }

        $records = $query->orderBy('record_date', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($records);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'patient_id' => 'required|exists:users,id',
            'record_type' => 'required|string',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'record_date' => 'required|date',
            'attachments' => 'nullable|array',
        ]);

        $validated['doctor_id'] = $request->user()->doctor->id ?? null;

        $record = MedicalRecord::create($validated);

        return response()->json($record->load(['doctor.user', 'patient']), 201);
    }

    public function show($id)
    {
        $record = MedicalRecord::with(['doctor.user', 'patient', 'appointment'])
            ->findOrFail($id);
        return response()->json($record);
    }
}
