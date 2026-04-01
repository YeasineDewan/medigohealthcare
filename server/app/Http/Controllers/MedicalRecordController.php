<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use App\Models\Patient;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedicalRecordController extends Controller
{
    /**
     * Display a listing of medical records
     */
    public function index(Request $request)
    {
        $query = MedicalRecord::with(['patient', 'doctor']);

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('record_number', 'like', "%{$search}%")
                  ->orWhere('diagnosis', 'like', "%{$search}%")
                  ->orWhere('treatment', 'like', "%{$search}%")
                  ->orWhereHas('patient', function($patientQuery) use ($search) {
                      $patientQuery->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('doctor', function($doctorQuery) use ($search) {
                      $doctorQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Filter by patient
        if ($request->has('patient_id')) {
            $query->where('patient_id', $request->patient_id);
        }

        // Filter by doctor
        if ($request->has('doctor_id')) {
            $query->where('doctor_id', $request->doctor_id);
        }

        // Filter by date range
        if ($request->has('from_date')) {
            $query->where('created_at', '>=', $request->from_date);
        }
        if ($request->has('to_date')) {
            $query->where('created_at', '<=', $request->to_date);
        }

        // Sort functionality
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $records = $query->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $records,
            'message' => 'Medical records retrieved successfully'
        ], 200);
    }

    /**
     * Store a newly created medical record
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'record_number' => 'required|string|max:255',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string|max:1000',
            'treatment' => 'required|string|max:1000',
            'symptoms' => 'required|string|max:1000',
            'notes' => 'nullable|string|max:2000',
            'vital_signs' => 'nullable|array',
            'prescriptions' => 'nullable|array',
            'lab_results' => 'nullable|array',
            'follow_up_date' => 'nullable|date|after:visit_date',
            'status' => 'required|in:active,completed,referred',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $recordData = [
                'patient_id' => $request->patient_id,
                'doctor_id' => $request->doctor_id,
                'record_number' => $this->generateRecordNumber(),
                'visit_date' => $request->visit_date,
                'diagnosis' => $request->diagnosis,
                'treatment' => $request->treatment,
                'symptoms' => $request->symptoms,
                'notes' => $request->notes,
                'vital_signs' => json_encode($request->vital_signs ?? []),
                'prescriptions' => json_encode($request->prescriptions ?? []),
                'lab_results' => json_encode($request->lab_results ?? []),
                'follow_up_date' => $request->follow_up_date,
                'status' => $request->status,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $record = MedicalRecord::create($recordData);

            return response()->json([
                'success' => true,
                'message' => 'Medical record created successfully',
                'data' => $record
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Medical record creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified medical record
     */
    public function show($id)
    {
        try {
            $record = MedicalRecord::with(['patient', 'doctor'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $record,
                'message' => 'Medical record retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Medical record not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified medical record
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'doctor_id' => 'required|exists:doctors,id',
            'record_number' => 'required|string|max:255',
            'visit_date' => 'required|date',
            'diagnosis' => 'required|string|max:1000',
            'treatment' => 'required|string|max:1000',
            'symptoms' => 'required|string|max:1000',
            'notes' => 'nullable|string|max:2000',
            'vital_signs' => 'nullable|array',
            'prescriptions' => 'nullable|array',
            'lab_results' => 'nullable|array',
            'follow_up_date' => 'nullable|date|after:visit_date',
            'status' => 'required|in:active,completed,referred',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $record = MedicalRecord::findOrFail($id);

            $recordData = [
                'patient_id' => $request->patient_id,
                'doctor_id' => $request->doctor_id,
                'record_number' => $request->record_number,
                'visit_date' => $request->visit_date,
                'diagnosis' => $request->diagnosis,
                'treatment' => $request->treatment,
                'symptoms' => $request->symptoms,
                'notes' => $request->notes,
                'vital_signs' => json_encode($request->vital_signs ?? []),
                'prescriptions' => json_encode($request->prescriptions ?? []),
                'lab_results' => json_encode($request->lab_results ?? []),
                'follow_up_date' => $request->follow_up_date,
                'status' => $request->status,
                'updated_at' => now(),
            ];

            $record->update($recordData);

            return response()->json([
                'success' => true,
                'message' => 'Medical record updated successfully',
                'data' => $record
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Medical record update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified medical record
     */
    public function destroy($id)
    {
        try {
            $record = MedicalRecord::findOrFail($id);
            $record->delete();

            return response()->json([
                'success' => true,
                'message' => 'Medical record deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Medical record deletion failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get patient medical history
     */
    public function patientHistory($patientId, Request $request)
    {
        try {
            $patient = Patient::findOrFail($patientId);
            $records = MedicalRecord::with('doctor')
                ->where('patient_id', $patientId)
                ->orderBy('visit_date', 'desc')
                ->paginate($request->get('per_page', 10));

            return response()->json([
                'success' => true,
                'data' => $records,
                'message' => 'Patient medical history retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve medical history',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add vital signs to medical record
     */
    public function addVitalSigns(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'vital_signs' => 'required|array',
            'vital_signs.*.type' => 'required|string|max:255',
            'vital_signs.*.value' => 'required|string|max:255',
            'vital_signs.*.unit' => 'required|string|max:50',
            'vital_signs.*.normal_range' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $record = MedicalRecord::findOrFail($id);
            $currentVitalSigns = json_decode($record->vital_signs, true) ?? [];
            
            $newVitalSigns = array_merge($currentVitalSigns, $request->vital_signs);
            
            $record->update([
                'vital_signs' => json_encode($newVitalSigns),
                'updated_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Vital signs added successfully',
                'data' => $record
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to add vital signs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get vital signs trends for patient
     */
    public function vitalSignsTrends($patientId, Request $request)
    {
        try {
            $patient = Patient::findOrFail($patientId);
            $records = MedicalRecord::where('patient_id', $patientId)
                ->whereNotNull('vital_signs')
                ->orderBy('visit_date', 'desc')
                ->limit(50) // Last 50 records
                ->get();

            $trends = [];
            foreach ($records as $record) {
                $vitalSigns = json_decode($record->vital_signs, true) ?? [];
                foreach ($vitalSigns as $vitalSign) {
                    $trends[] = [
                        'date' => $record->visit_date,
                        'type' => $vitalSign->type,
                        'value' => $vitalSign->value,
                        'unit' => $vitalSign->unit,
                        'normal_range' => $vitalSign->normal_range ?? 'N/A',
                    ];
                }
            }

            return response()->json([
                'success' => true,
                'data' => $trends,
                'message' => 'Vital signs trends retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve vital signs trends',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate medical record number
     */
    private function generateRecordNumber()
    {
        $prefix = 'MR';
        $date = now()->format('Ymd');
        $random = mt_rand(1000, 9999);
        
        return $prefix . $date . $random;
    }
}
