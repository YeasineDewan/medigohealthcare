<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PharmacyOrder;
use App\Models\PharmacyOrderItem;
use App\Models\MedicalDevice;
use App\Models\Medicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PharmacyOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = PharmacyOrder::with(['patient', 'doctor', 'prescription', 'items']);

        // Search
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('order_number', 'like', '%' . $request->search . '%')
                  ->orWhereHas('patient', function($subQ) use ($request) {
                      $subQ->where('name', 'like', '%' . $request->search . '%');
                  })
                  ->orWhereHas('doctor', function($subQ) use ($request) {
                      $subQ->where('name', 'like', '%' . $request->search . '%');
                  });
            });
        }

        // Filters
        if ($request->status) {
            $query->where('status', $request->status);
        }
        
        if ($request->payment_status) {
            $query->where('payment_status', $request->payment_status);
        }
        
        if ($request->patient_id) {
            $query->where('patient_id', $request->patient_id);
        }
        
        if ($request->doctor_id) {
            $query->where('doctor_id', $request->doctor_id);
        }

        // Date range
        if ($request->date_from) {
            $query->whereDate('order_date', '>=', $request->date_from);
        }
        
        if ($request->date_to) {
            $query->whereDate('order_date', '<=', $request->date_to);
        }

        // Sort
        $sortBy = $request->sort_by ?? 'order_date';
        $sortOrder = $request->sort_order ?? 'desc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->per_page ?? 15;
        $orders = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'Pharmacy orders retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'prescription_id' => 'nullable|exists:prescriptions,id',
            'items' => 'required|array|min:1',
            'items.*.type' => 'required|in:medical_device,medicine',
            'items.*.medical_device_id' => 'required_if:items.*.type,medical_device|exists:medical_devices,id',
            'items.*.medicine_id' => 'required_if:items.*.type,medicine|exists:medicines,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.notes' => 'nullable|string',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        return DB::transaction(function () use ($request) {
            // Generate order number
            $orderNumber = 'PO' . date('Y') . str_pad(PharmacyOrder::count() + 1, 6, '0', STR_PAD_LEFT);
            
            // Calculate totals
            $subtotal = 0;
            $orderItems = [];
            
            foreach ($request->items as $item) {
                $unitPrice = 0;
                $name = '';
                
                if ($item['type'] === 'medical_device') {
                    $device = MedicalDevice::find($item['medical_device_id']);
                    $unitPrice = $device->selling_price;
                    $name = $device->name;
                    
                    // Check stock
                    if ($device->current_stock < $item['quantity']) {
                        return response()->json([
                            'success' => false,
                            'message' => "Insufficient stock for device: {$device->name}"
                        ], 422);
                    }
                    
                    // Update stock
                    $device->decrement('current_stock', $item['quantity']);
                } else {
                    $medicine = Medicine::find($item['medicine_id']);
                    $unitPrice = $medicine->selling_price;
                    $name = $medicine->name;
                    
                    // Check stock
                    if ($medicine->current_stock < $item['quantity']) {
                        return response()->json([
                            'success' => false,
                            'message' => "Insufficient stock for medicine: {$medicine->name}"
                        ], 422);
                    }
                    
                    // Update stock
                    $medicine->decrement('current_stock', $item['quantity']);
                }
                
                $totalPrice = $unitPrice * $item['quantity'];
                $subtotal += $totalPrice;
                
                $orderItems[] = [
                    'type' => $item['type'],
                    'medical_device_id' => $item['medical_device_id'] ?? null,
                    'medicine_id' => $item['medicine_id'] ?? null,
                    'name' => $name,
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'total_price' => $totalPrice,
                    'notes' => $item['notes'] ?? null
                ];
            }
            
            $tax = $subtotal * 0.1; // 10% tax
            $total = $subtotal + $tax;
            
            // Create order
            $order = PharmacyOrder::create([
                'order_number' => $orderNumber,
                'patient_id' => $request->patient_id,
                'doctor_id' => $request->doctor_id,
                'prescription_id' => $request->prescription_id,
                'status' => 'pending',
                'payment_status' => 'pending',
                'subtotal' => $subtotal,
                'tax' => $tax,
                'total' => $total,
                'notes' => $request->notes,
                'order_date' => now()
            ]);
            
            // Create order items
            foreach ($orderItems as $item) {
                $item['pharmacy_order_id'] = $order->id;
                PharmacyOrderItem::create($item);
            }
            
            return response()->json([
                'success' => true,
                'data' => $order->load(['patient', 'doctor', 'prescription', 'items']),
                'message' => 'Pharmacy order created successfully'
            ], 201);
        });
    }

    public function show($id)
    {
        $order = PharmacyOrder::with(['patient', 'doctor', 'prescription', 'items.medicalDevice', 'items.medicine'])->find($id);
        
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Pharmacy order not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Pharmacy order retrieved successfully'
        ]);
    }

    public function update(Request $request, $id)
    {
        $order = PharmacyOrder::find($id);
        
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Pharmacy order not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,processing,completed,cancelled',
            'payment_status' => 'required|in:pending,paid,refunded',
            'notes' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();
        
        // Update timestamps based on status
        if ($request->status === 'processing' && $order->status !== 'processing') {
            $data['processed_date'] = now();
        }
        
        if ($request->status === 'completed' && $order->status !== 'completed') {
            $data['completed_date'] = now();
        }
        
        if ($request->status === 'cancelled' && $order->status !== 'cancelled') {
            $data['cancelled_date'] = now();
            
            // Return items to stock
            foreach ($order->items as $item) {
                if ($item->type === 'medical_device' && $item->medicalDevice) {
                    $item->medicalDevice->increment('current_stock', $item->quantity);
                } elseif ($item->type === 'medicine' && $item->medicine) {
                    $item->medicine->increment('current_stock', $item->quantity);
                }
            }
        }

        $order->update($data);

        return response()->json([
            'success' => true,
            'data' => $order->load(['patient', 'doctor', 'prescription', 'items']),
            'message' => 'Pharmacy order updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $order = PharmacyOrder::find($id);
        
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Pharmacy order not found'
            ], 404);
        }

        // Return items to stock if not completed
        if ($order->status !== 'completed') {
            foreach ($order->items as $item) {
                if ($item->type === 'medical_device' && $item->medicalDevice) {
                    $item->medicalDevice->increment('current_stock', $item->quantity);
                } elseif ($item->type === 'medicine' && $item->medicine) {
                    $item->medicine->increment('current_stock', $item->quantity);
                }
            }
        }

        $order->delete();

        return response()->json([
            'success' => true,
            'message' => 'Pharmacy order deleted successfully'
        ]);
    }

    public function getStats()
    {
        $total = PharmacyOrder::count();
        $pending = PharmacyOrder::pending()->count();
        $processing = PharmacyOrder::processing()->count();
        $completed = PharmacyOrder::completed()->count();
        $cancelled = PharmacyOrder::cancelled()->count();
        $paid = PharmacyOrder::paid()->count();
        $unpaid = PharmacyOrder::unpaid()->count();
        $totalRevenue = PharmacyOrder::paid()->sum('total');

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'pending' => $pending,
                'processing' => $processing,
                'completed' => $completed,
                'cancelled' => $cancelled,
                'paid' => $paid,
                'unpaid' => $unpaid,
                'total_revenue' => $totalRevenue
            ],
            'message' => 'Stats retrieved successfully'
        ]);
    }

    public function processOrder($id)
    {
        $order = PharmacyOrder::find($id);
        
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Pharmacy order not found'
            ], 404);
        }

        if ($order->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending orders can be processed'
            ], 422);
        }

        $order->markAsProcessing();

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order processed successfully'
        ]);
    }

    public function completeOrder($id)
    {
        $order = PharmacyOrder::find($id);
        
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Pharmacy order not found'
            ], 404);
        }

        if ($order->status !== 'processing') {
            return response()->json([
                'success' => false,
                'message' => 'Only processing orders can be completed'
            ], 422);
        }

        $order->markAsCompleted();

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order completed successfully'
        ]);
    }

    public function cancelOrder($id)
    {
        $order = PharmacyOrder::find($id);
        
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Pharmacy order not found'
            ], 404);
        }

        if ($order->status === 'completed') {
            return response()->json([
                'success' => false,
                'message' => 'Completed orders cannot be cancelled'
            ], 422);
        }

        $order->markAsCancelled();

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order cancelled successfully'
        ]);
    }
}
