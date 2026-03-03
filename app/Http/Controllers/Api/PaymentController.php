<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $payments = Payment::with(['user', 'payable'])
            ->when($request->user()->role !== 'admin', function($q) use ($request) {
                $q->where('user_id', $request->user()->id);
            })
            ->latest()
            ->paginate(20);

        return response()->json($payments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'payable_type' => 'required|string',
            'payable_id' => 'required|integer',
            'payment_method' => 'required|string|in:cash,card,bkash,nagad,rocket',
            'amount' => 'required|numeric|min:0',
        ]);

        $payment = Payment::create([
            'user_id' => $request->user()->id,
            'payable_type' => $validated['payable_type'],
            'payable_id' => $validated['payable_id'],
            'transaction_id' => 'TXN-' . strtoupper(Str::random(12)),
            'payment_method' => $validated['payment_method'],
            'amount' => $validated['amount'],
            'status' => 'pending',
        ]);

        return response()->json($payment, 201);
    }

    public function show($id)
    {
        $payment = Payment::with(['user', 'payable'])->findOrFail($id);
        
        if (request()->user()->role !== 'admin' && $payment->user_id !== request()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($payment);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,completed,failed,refunded',
        ]);

        $payment = Payment::findOrFail($id);
        $payment->update([
            'status' => $validated['status'],
            'paid_at' => $validated['status'] === 'completed' ? now() : null,
        ]);

        return response()->json($payment);
    }
}
