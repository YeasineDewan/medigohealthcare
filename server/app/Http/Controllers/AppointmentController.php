<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppointmentConfirmation;
use App\Mail\AppointmentReminder;

class AppointmentController extends Controller
{
    /**
     * Display a listing of appointments
     */
    public function index(Request $request)
    {
        $query = Appointment::with(['doctor', 'patient']);

        // Filter by doctor
        if ($request->has('doctor_id')) {
            $query->where('doctor_id', $request->doctor_id);
        }

        // Filter by patient
        if ($request->has('patient_id')) {
            $query->where('patient_id', $request->patient_id);
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by date range
        if ($request->has('from_date')) {
            $query->where('appointment_date', '>=', $request->from_date);
        }
        if ($request->has('to_date')) {
            $query->where('appointment_date', '<=', $request->to_date);
        }

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('appointment_number', 'like', "%{$search}%")
                  ->orWhereHas('doctor', function($doctorQuery) use ($search) {
                      $doctorQuery->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('patient', function($patientQuery) use ($search) {
                      $patientQuery->where('name', 'like', "%{$search}%");
                  });
            });
        }

        // Sort functionality
        $sortBy = $request->get('sort_by', 'appointment_date');
        $sortOrder = $request->get('sort_order', 'desc');
        
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $appointments = $query->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $appointments,
            'message' => 'Appointments retrieved successfully'
        ], 200);
    }

    /**
     * Store a newly created appointment
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'appointment_date' => 'required|date|after:today',
            'appointment_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:15|max:240',
            'type' => 'required|in:consultation,follow_up,surgery,emergency',
            'status' => 'required|in:scheduled,confirmed,cancelled,completed',
            'notes' => 'nullable|string|max:1000',
            'consultation_fee' => 'required|numeric|min:0',
            'payment_status' => 'required|in:pending,paid,refunded',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Check doctor availability
            $doctor = Doctor::findOrFail($request->doctor_id);
            $existingAppointment = Appointment::where('doctor_id', $request->doctor_id)
                ->where('appointment_date', $request->appointment_date)
                ->where('appointment_time', $request->appointment_time)
                ->where('status', '!=', 'cancelled')
                ->first();

            if ($existingAppointment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Doctor is not available at this time'
                ], 422);
            }

            $appointmentData = [
                'appointment_number' => $this->generateAppointmentNumber(),
                'doctor_id' => $request->doctor_id,
                'patient_id' => $request->patient_id,
                'appointment_date' => $request->appointment_date,
                'appointment_time' => $request->appointment_time,
                'duration' => $request->duration,
                'type' => $request->type,
                'status' => $request->status,
                'notes' => $request->notes,
                'consultation_fee' => $request->consultation_fee,
                'payment_status' => $request->payment_status,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $appointment = Appointment::create($appointmentData);

            // Send confirmation email
            try {
                Mail::to($appointment->patient->email)->send(new AppointmentConfirmation($appointment));
            } catch (\Exception $e) {
                // Log email error but don't fail the appointment creation
            }

            return response()->json([
                'success' => true,
                'message' => 'Appointment created successfully',
                'data' => $appointment
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified appointment
     */
    public function show($id)
    {
        try {
            $appointment = Appointment::with(['doctor', 'patient'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $appointment,
                'message' => 'Appointment retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified appointment
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'doctor_id' => 'required|exists:doctors,id',
            'patient_id' => 'required|exists:patients,id',
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
            'duration' => 'required|integer|min:15|max:240',
            'type' => 'required|in:consultation,follow_up,surgery,emergency',
            'status' => 'required|in:scheduled,confirmed,cancelled,completed',
            'notes' => 'nullable|string|max:1000',
            'consultation_fee' => 'required|numeric|min:0',
            'payment_status' => 'required|in:pending,paid,refunded',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $appointment = Appointment::findOrFail($id);

            $appointmentData = [
                'doctor_id' => $request->doctor_id,
                'patient_id' => $request->patient_id,
                'appointment_date' => $request->appointment_date,
                'appointment_time' => $request->appointment_time,
                'duration' => $request->duration,
                'type' => $request->type,
                'status' => $request->status,
                'notes' => $request->notes,
                'consultation_fee' => $request->consultation_fee,
                'payment_status' => $request->payment_status,
                'updated_at' => now(),
            ];

            $appointment->update($appointmentData);

            return response()->json([
                'success' => true,
                'message' => 'Appointment updated successfully',
                'data' => $appointment
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified appointment
     */
    public function destroy($id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Appointment deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment deletion failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Cancel appointment
     */
    public function cancel(Request $request, $id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            
            $appointment->update([
                'status' => 'cancelled',
                'cancellation_reason' => $request->cancellation_reason,
                'cancelled_at' => now(),
                'updated_at' => now(),
            ]);

            // Send cancellation notification
            try {
                Mail::to($appointment->patient->email)->send(new AppointmentCancelled($appointment));
            } catch (\Exception $e) {
                // Log email error but don't fail the cancellation
            }

            return response()->json([
                'success' => true,
                'message' => 'Appointment cancelled successfully',
                'data' => $appointment
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment cancellation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Confirm appointment
     */
    public function confirm(Request $request, $id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            
            $appointment->update([
                'status' => 'confirmed',
                'confirmed_at' => now(),
                'updated_at' => now(),
            ]);

            // Send confirmation notification
            try {
                Mail::to($appointment->patient->email)->send(new AppointmentConfirmed($appointment));
            } catch (\Exception $e) {
                // Log email error but don't fail the confirmation
            }

            return response()->json([
                'success' => true,
                'message' => 'Appointment confirmed successfully',
                'data' => $appointment
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment confirmation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get doctor's available slots
     */
    public function availableSlots(Request $request, $doctorId)
    {
        try {
            $doctor = Doctor::findOrFail($doctorId);
            $date = $request->get('date', now()->format('Y-m-d'));

            $slots = $this->generateAvailableSlots($doctor, $date);

            return response()->json([
                'success' => true,
                'data' => $slots,
                'message' => 'Available slots retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve available slots',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate appointment number
     */
    private function generateAppointmentNumber()
    {
        $prefix = 'APT';
        $date = now()->format('Ymd');
        $random = mt_rand(1000, 9999);
        
        return $prefix . $date . $random;
    }

    /**
     * Generate available time slots for a doctor on a specific date
     */
    private function generateAvailableSlots($doctor, $date)
    {
        $slots = [];
        $startTime = '09:00';
        $endTime = '17:00';
        $slotDuration = 30; // 30 minutes per slot
        
        // Get existing appointments for the date
        $existingAppointments = Appointment::where('doctor_id', $doctor->id)
            ->where('appointment_date', $date)
            ->where('status', '!=', 'cancelled')
            ->get();

        $currentTime = strtotime($startTime);
        $endTime = strtotime($endTime);

        while ($currentTime < $endTime) {
            $slotTime = date('H:i', $currentTime);
            $slotEndTime = date('H:i', $currentTime + ($slotDuration * 60));
            
            // Check if slot is available
            $isAvailable = true;
            foreach ($existingAppointments as $appointment) {
                $appointmentTime = strtotime($appointment->appointment_time);
                $appointmentEndTime = $appointmentTime + ($appointment->duration * 60);
                
                if (($currentTime >= $appointmentTime && $currentTime < $appointmentEndTime) ||
                    ($slotEndTime > $appointmentTime && $slotEndTime <= $appointmentEndTime)) {
                    $isAvailable = false;
                    break;
                }
            }

            if ($isAvailable) {
                $slots[] = [
                    'time' => $slotTime,
                    'end_time' => $slotEndTime,
                    'available' => true
                ];
            }

            $currentTime += ($slotDuration * 60);
        }

        return $slots;
    }
}
