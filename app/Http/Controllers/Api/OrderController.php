<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $query = Order::with(['items.product', 'patient.user']);

        // Filter based on user role
        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        // Apply filters
        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->payment_status) {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->date_from) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->date_to) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $orders = $query->orderBy('created_at', 'desc')
                       ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'Orders retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|string|max:500',
            'shipping_city' => 'required|string|max:100',
            'shipping_district' => 'required|string|max:100',
            'shipping_postal_code' => 'nullable|string|max:20',
            'shipping_phone' => 'required|string|max:20',
            'shipping_email' => 'nullable|email|max:255',
            'payment_method' => 'required|in:cash_on_delivery,online,card,mobile_banking',
            'order_notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $user = Auth::user();
        
        return DB::transaction(function () use ($request, $user) {
            $orderNumber = 'ORD' . date('Ymd') . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
            
            $subtotal = 0;
            $orderItems = [];

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                // Check stock
                if ($product->stock_quantity < $item['quantity']) {
                    return response()->json([
                        'success' => false,
                        'message' => "Insufficient stock for product: {$product->name}"
                    ], 400);
                }

                $itemTotal = ($product->discount_price ?? $product->price) * $item['quantity'];
                $subtotal += $itemTotal;

                $orderItems[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'product_sku' => $product->sku ?? '',
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'discount_price' => $product->discount_price ?? $product->price,
                    'total_price' => $itemTotal,
                ];

                // Update stock
                $product->decrement('stock_quantity', $item['quantity']);
            }

            $deliveryFee = $this->calculateDeliveryFee($request->shipping_city, $subtotal);
            $taxAmount = $subtotal * 0.05; // 5% tax
            $totalAmount = $subtotal + $deliveryFee + $taxAmount;

            $order = Order::create([
                'order_number' => $orderNumber,
                'user_id' => $user->id,
                'patient_id' => $user->patient->id ?? null,
                'status' => 'pending',
                'payment_status' => 'pending',
                'payment_method' => $request->payment_method,
                'subtotal' => $subtotal,
                'discount_amount' => 0,
                'delivery_fee' => $deliveryFee,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'currency' => 'BDT',
                'shipping_address' => $request->shipping_address,
                'shipping_city' => $request->shipping_city,
                'shipping_district' => $request->shipping_district,
                'shipping_postal_code' => $request->shipping_postal_code,
                'shipping_phone' => $request->shipping_phone,
                'shipping_email' => $request->shipping_email,
                'order_notes' => $request->order_notes,
                'created_by' => $user->id,
            ]);

            // Create order items
            foreach ($orderItems as $item) {
                OrderItem::create(array_merge($item, ['order_id' => $order->id]));
            }

            return response()->json([
                'success' => true,
                'data' => $order->load(['items.product', 'patient.user']),
                'message' => 'Order placed successfully'
            ], 201);
        });
    }

    public function show($id)
    {
        $user = Auth::user();
        $order = Order::with(['items.product', 'patient.user'])
                     ->findOrFail($id);

        // Check authorization
        if ($user->role !== 'admin' && $order->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => $order,
            'message' => 'Order retrieved successfully'
        ]);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $user = Auth::user();

        // Check authorization
        if ($user->role !== 'admin' && $order->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        // Only allow updating certain fields for patients
        if ($user->role !== 'admin') {
            $validator = Validator::make($request->all(), [
                'shipping_address' => 'sometimes|required|string|max:500',
                'shipping_city' => 'sometimes|required|string|max:100',
                'shipping_district' => 'sometimes|required|string|max:100',
                'shipping_postal_code' => 'nullable|string|max:20',
                'shipping_phone' => 'sometimes|required|string|max:20',
                'shipping_email' => 'nullable|email|max:255',
                'order_notes' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            // Only allow updates if order is pending
            if ($order->status !== 'pending') {
                return response()->json([
                    'success' => false,
                    'message' => 'Order cannot be updated'
                ], 400);
            }

            $order->update($request->only([
                'shipping_address',
                'shipping_city',
                'shipping_district',
                'shipping_postal_code',
                'shipping_phone',
                'shipping_email',
                'order_notes'
            ]));
        } else {
            // Admin can update status and payment status
            $validator = Validator::make($request->all(), [
                'status' => 'sometimes|required|in:pending,confirmed,processing,shipped,delivered,cancelled,refunded',
                'payment_status' => 'sometimes|required|in:pending,paid,failed,refunded',
                'tracking_number' => 'nullable|string|max:100',
                'courier_service' => 'nullable|string|max:100',
                'admin_notes' => 'nullable|string|max:1000',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                    'message' => 'Validation failed'
                ], 422);
            }

            $updateData = $request->only([
                'status',
                'payment_status',
                'tracking_number',
                'courier_service',
                'admin_notes'
            ]);

            // Add timestamps for status changes
            if ($request->status === 'confirmed') {
                $updateData['confirmed_at'] = now();
            } elseif ($request->status === 'processing') {
                $updateData['processed_at'] = now();
            } elseif ($request->status === 'shipped') {
                $updateData['shipped_at'] = now();
            } elseif ($request->status === 'delivered') {
                $updateData['delivered_at'] = now();
            } elseif ($request->status === 'cancelled') {
                $updateData['cancelled_at'] = now();
                $updateData['cancellation_reason'] = $request->cancellation_reason ?? 'Cancelled by admin';
                
                // Restore stock for cancelled orders
                foreach ($order->items as $item) {
                    $product = Product::find($item->product_id);
                    if ($product) {
                        $product->increment('stock_quantity', $item->quantity);
                    }
                }
            }

            $order->update($updateData);
        }

        return response()->json([
            'success' => true,
            'data' => $order->fresh()->load(['items.product', 'patient.user']),
            'message' => 'Order updated successfully'
        ]);
    }

    public function cancel(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $user = Auth::user();

        // Check authorization
        if ($user->role !== 'admin' && $order->user_id !== $user->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        // Only allow cancellation if order is pending or confirmed
        if (!in_array($order->status, ['pending', 'confirmed'])) {
            return response()->json([
                'success' => false,
                'message' => 'Order cannot be cancelled'
            ], 400);
        }

        $validator = Validator::make($request->all(), [
            'cancellation_reason' => 'required|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        return DB::transaction(function () use ($order, $request) {
            // Restore stock
            foreach ($order->items as $item) {
                $product = Product::find($item->product_id);
                if ($product) {
                    $product->increment('stock_quantity', $item->quantity);
                }
            }

            $order->update([
                'status' => 'cancelled',
                'cancelled_at' => now(),
                'cancellation_reason' => $request->cancellation_reason
            ]);

            return response()->json([
                'success' => true,
                'data' => $order->fresh(),
                'message' => 'Order cancelled successfully'
            ]);
        });
    }

    public function track($orderNumber)
    {
        $order = Order::with(['items.product'])
                     ->where('order_number', $orderNumber)
                     ->firstOrFail();

        return response()->json([
            'success' => true,
            'data' => [
                'order' => $order,
                'tracking_timeline' => $this->getTrackingTimeline($order)
            ],
            'message' => 'Order tracking information retrieved successfully'
        ]);
    }

    public function myOrders(Request $request)
    {
        $user = Auth::user();
        
        $query = Order::with(['items.product'])
                     ->where('user_id', $user->id);

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $orders = $query->orderBy('created_at', 'desc')
                       ->paginate($request->per_page ?? 15);

        return response()->json([
            'success' => true,
            'data' => $orders,
            'message' => 'My orders retrieved successfully'
        ]);
    }

    public function statistics(Request $request)
    {
        $user = Auth::user();
        $query = Order::query();

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $total = $query->count();
        $pending = $query->where('status', 'pending')->count();
        $confirmed = $query->where('status', 'confirmed')->count();
        $processing = $query->where('status', 'processing')->count();
        $shipped = $query->where('status', 'shipped')->count();
        $delivered = $query->where('status', 'delivered')->count();
        $cancelled = $query->where('status', 'cancelled')->count();

        $totalRevenue = $query->where('payment_status', 'paid')->sum('total_amount');
        $thisMonthRevenue = $query->where('payment_status', 'paid')
                                 ->whereMonth('created_at', now()->month)
                                 ->whereYear('created_at', now()->year)
                                 ->sum('total_amount');

        return response()->json([
            'success' => true,
            'data' => [
                'total_orders' => $total,
                'pending' => $pending,
                'confirmed' => $confirmed,
                'processing' => $processing,
                'shipped' => $shipped,
                'delivered' => $delivered,
                'cancelled' => $cancelled,
                'total_revenue' => $totalRevenue,
                'this_month_revenue' => $thisMonthRevenue,
            ],
            'message' => 'Order statistics retrieved successfully'
        ]);
    }

    private function calculateDeliveryFee($city, $subtotal)
    {
        // Simple delivery fee calculation
        $freeDeliveryThreshold = 1000; // Free delivery for orders over 1000 BDT
        
        if ($subtotal >= $freeDeliveryThreshold) {
            return 0;
        }

        // Different delivery fees for different cities
        $deliveryFees = [
            'Dhaka' => 60,
            'Chittagong' => 80,
            'Sylhet' => 100,
            'Rajshahi' => 100,
            'Khulna' => 100,
            'Barisal' => 120,
            'Rangpur' => 120,
            'Mymensingh' => 100,
        ];

        return $deliveryFees[$city] ?? 120;
    }

    private function getTrackingTimeline($order)
    {
        $timeline = [
            [
                'status' => 'Order Placed',
                'date' => $order->created_at->format('Y-m-d H:i:s'),
                'completed' => true,
                'description' => 'Your order has been placed successfully'
            ]
        ];

        if ($order->confirmed_at) {
            $timeline[] = [
                'status' => 'Order Confirmed',
                'date' => $order->confirmed_at->format('Y-m-d H:i:s'),
                'completed' => true,
                'description' => 'Your order has been confirmed'
            ];
        }

        if ($order->processed_at) {
            $timeline[] = [
                'status' => 'Processing',
                'date' => $order->processed_at->format('Y-m-d H:i:s'),
                'completed' => true,
                'description' => 'Your order is being processed'
            ];
        }

        if ($order->shipped_at) {
            $timeline[] = [
                'status' => 'Shipped',
                'date' => $order->shipped_at->format('Y-m-d H:i:s'),
                'completed' => true,
                'description' => 'Your order has been shipped via ' . $order->courier_service
            ];
        }

        if ($order->delivered_at) {
            $timeline[] = [
                'status' => 'Delivered',
                'date' => $order->delivered_at->format('Y-m-d H:i:s'),
                'completed' => true,
                'description' => 'Your order has been delivered successfully'
            ];
        }

        if ($order->cancelled_at) {
            $timeline[] = [
                'status' => 'Cancelled',
                'date' => $order->cancelled_at->format('Y-m-d H:i:s'),
                'completed' => true,
                'description' => 'Order cancelled: ' . $order->cancellation_reason
            ];
        }

        return $timeline;
    }
}
