<?php

namespace App\Http\Controllers;

use App\Models\Billing;
use App\Models\Appointment;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BillingController extends Controller
{
    /**
     * Display a listing of bills
     */
    public function index(Request $request)
    {
        $query = Billing::with(['patient', 'appointment']);

        // Search functionality
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('bill_number', 'like', "%{$search}%")
                  ->orWhereHas('patient', function($patientQuery) use ($search) {
                      $patientQuery->where('name', 'like', "%{$search}%");
                  })
                  ->orWhereHas('appointment', function($appointmentQuery) use ($search) {
                      $appointmentQuery->where('appointment_number', 'like', "%{$search}%");
                  });
            });
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
        $bills = $query->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $bills,
            'message' => 'Bills retrieved successfully'
        ], 200);
    }

    /**
     * Store a newly created bill
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'bill_number' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string|max:1000',
            'status' => 'required|in:pending,paid,refunded,overdue',
            'due_date' => 'required|date',
            'payment_method' => 'nullable|in:cash,card,insurance,online',
            'insurance_claim_number' => 'nullable|string|max:255',
            'services' => 'required|array',
            'tax_amount' => 'nullable|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $billData = [
                'patient_id' => $request->patient_id,
                'appointment_id' => $request->appointment_id,
                'bill_number' => $this->generateBillNumber(),
                'amount' => $request->amount,
                'description' => $request->description,
                'status' => $request->status,
                'due_date' => $request->due_date,
                'payment_method' => $request->payment_method,
                'insurance_claim_number' => $request->insurance_claim_number,
                'services' => json_encode($request->services),
                'tax_amount' => $request->tax_amount ?? 0,
                'discount_amount' => $request->discount_amount ?? 0,
                'total_amount' => $request->amount + ($request->tax_amount ?? 0) - ($request->discount_amount ?? 0),
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $bill = Billing::create($billData);

            return response()->json([
                'success' => true,
                'message' => 'Bill created successfully',
                'data' => $bill
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Bill creation failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified bill
     */
    public function show($id)
    {
        try {
            $bill = Billing::with(['patient', 'appointment'])->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $bill,
                'message' => 'Bill retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Bill not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified bill
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:patients,id',
            'appointment_id' => 'nullable|exists:appointments,id',
            'amount' => 'required|numeric|min:0',
            'description' => 'required|string|max:1000',
            'status' => 'required|in:pending,paid,refunded,overdue',
            'due_date' => 'required|date',
            'payment_method' => 'nullable|in:cash,card,insurance,online',
            'insurance_claim_number' => 'nullable|string|max:255',
            'services' => 'required|array',
            'tax_amount' => 'nullable|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $bill = Billing::findOrFail($id);

            $billData = [
                'patient_id' => $request->patient_id,
                'appointment_id' => $request->appointment_id,
                'amount' => $request->amount,
                'description' => $request->description,
                'status' => $request->status,
                'due_date' => $request->due_date,
                'payment_method' => $request->payment_method,
                'insurance_claim_number' => $request->insurance_claim_number,
                'services' => json_encode($request->services),
                'tax_amount' => $request->tax_amount ?? 0,
                'discount_amount' => $request->discount_amount ?? 0,
                'total_amount' => $request->amount + ($request->tax_amount ?? 0) - ($request->discount_amount ?? 0),
                'updated_at' => now(),
            ];

            $bill->update($billData);

            return response()->json([
                'success' => true,
                'message' => 'Bill updated successfully',
                'data' => $bill
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Bill update failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified bill
     */
    public function destroy($id)
    {
        try {
            $bill = Billing::findOrFail($id);
            $bill->delete();

            return response()->json([
                'success' => true,
                'message' => 'Bill deleted successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Bill deletion failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Process payment
     */
    public function processPayment(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'payment_method' => 'required|in:cash,card,insurance,online',
            'payment_amount' => 'required|numeric|min:0',
            'transaction_id' => 'nullable|string|max:255',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $bill = Billing::findOrFail($id);

            $paymentData = [
                'status' => 'paid',
                'payment_method' => $request->payment_method,
                'payment_amount' => $request->payment_amount,
                'transaction_id' => $request->transaction_id,
                'payment_date' => $request->payment_date,
                'payment_notes' => $request->notes,
                'paid_at' => now(),
                'updated_at' => now(),
            ];

            $bill->update($paymentData);

            return response()->json([
                'success' => true,
                'message' => 'Payment processed successfully',
                'data' => $bill
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Payment processing failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get billing statistics
     */
    public function statistics(Request $request)
    {
        try {
            $dateRange = $request->get('date_range', 'month'); // month, week, year, custom
            
            $query = Billing::query();
            
            switch ($dateRange) {
                case 'week':
                    $query->whereDate('created_at', '>=', now()->startOfWeek());
                    break;
                case 'month':
                    $query->whereMonth('created_at', now()->month);
                    break;
                case 'year':
                    $query->whereYear('created_at', now()->year);
                    break;
                case 'custom':
                    if ($request->has('from_date')) {
                        $query->whereDate('created_at', '>=', $request->from_date);
                    }
                    if ($request->has('to_date')) {
                        $query->whereDate('created_at', '<=', $request->to_date);
                    }
                    break;
            }

            $stats = [
                'total_bills' => $query->count(),
                'total_amount' => $query->sum('amount'),
                'paid_amount' => $query->where('status', 'paid')->sum('amount'),
                'pending_amount' => $query->where('status', 'pending')->sum('amount'),
                'overdue_amount' => $query->where('status', 'overdue')->sum('amount'),
                'refunded_amount' => $query->where('status', 'refunded')->sum('amount'),
                'average_bill_amount' => $query->avg('amount'),
                'payment_methods' => Billing::select('payment_method', DB::raw('COUNT(*) as count'))
                    ->groupBy('payment_method')
                    ->get(),
                'monthly_trends' => Billing::select(
                        DB::raw('MONTH(created_at) as month'),
                        DB::raw('SUM(amount) as total'),
                        DB::raw('COUNT(*) as count')
                    )
                    ->where('created_at', '>=', now()->subMonths(12))
                    ->groupBy('month')
                    ->orderBy('month', 'asc')
                    ->get(),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Billing statistics retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve billing statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate bill number
     */
    private function generateBillNumber()
    {
        $prefix = 'BILL';
        $date = now()->format('Ymd');
        $random = mt_rand(1000, 9999);
        
        return $prefix . $date . $random;
    }
}
