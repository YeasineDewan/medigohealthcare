<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('items.product');

        if ($request->user()->role !== 'admin') {
            $query->where('user_id', $request->user()->id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_name' => 'required|string',
            'shipping_phone' => 'required|string',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string',
            'payment_method' => 'required|string',
        ]);

        $subtotal = 0;
        $items = [];

        foreach ($validated['items'] as $item) {
            $product = \App\Models\Product::findOrFail($item['product_id']);
            $price = $product->discount_price ?? $product->price;
            $total = $price * $item['quantity'];
            $subtotal += $total;

            $items[] = [
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $price,
                'total' => $total,
            ];
        }

        $order = Order::create([
            'user_id' => $request->user()->id,
            'subtotal' => $subtotal,
            'tax' => $subtotal * 0.05, // 5% tax
            'shipping' => 50, // Fixed shipping
            'total' => $subtotal * 1.05 + 50,
            'status' => 'pending',
            'payment_status' => 'pending',
            'payment_method' => $validated['payment_method'],
            'shipping_name' => $validated['shipping_name'],
            'shipping_phone' => $validated['shipping_phone'],
            'shipping_address' => $validated['shipping_address'],
            'shipping_city' => $validated['shipping_city'],
        ]);

        foreach ($items as $item) {
            OrderItem::create(array_merge($item, ['order_id' => $order->id]));
        }

        return response()->json($order->load('items.product'), 201);
    }

    public function show($id)
    {
        $order = Order::with('items.product')->findOrFail($id);
        return response()->json($order);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'status' => 'sometimes|in:pending,processing,shipped,delivered,cancelled',
            'payment_status' => 'sometimes|in:pending,paid,failed,refunded',
        ]);

        $order->update($validated);

        return response()->json($order);
    }
}
