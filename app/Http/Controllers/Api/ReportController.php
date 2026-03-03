<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{Appointment, Order, LabTestBooking, User};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function appointments(Request $request)
    {
        $query = Appointment::with(['user', 'doctor.user']);

        if ($request->has('start_date')) {
            $query->whereDate('appointment_date', '>=', $request->start_date);
        }
        if ($request->has('end_date')) {
            $query->whereDate('appointment_date', '<=', $request->end_date);
        }
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $appointments = $query->get();
        
        $summary = [
            'total' => $appointments->count(),
            'by_status' => $appointments->groupBy('status')->map->count(),
            'total_revenue' => $appointments->where('status', 'completed')->sum('consultation_fee'),
        ];

        return response()->json([
            'data' => $appointments,
            'summary' => $summary,
        ]);
    }

    public function sales(Request $request)
    {
        $query = Order::with(['user', 'items.product']);

        if ($request->has('start_date')) {
            $query->whereDate('created_at', '>=', $request->start_date);
        }
        if ($request->has('end_date')) {
            $query->whereDate('created_at', '<=', $request->end_date);
        }

        $orders = $query->get();
        
        $summary = [
            'total_orders' => $orders->count(),
            'total_revenue' => $orders->where('status', 'completed')->sum('total_amount'),
            'by_status' => $orders->groupBy('status')->map->count(),
            'top_products' => $orders->flatMap->items->groupBy('product_id')
                ->map(fn($items) => [
                    'product' => $items->first()->product,
                    'quantity' => $items->sum('quantity'),
                    'revenue' => $items->sum('subtotal'),
                ])
                ->sortByDesc('revenue')
                ->take(10)
                ->values(),
        ];

        return response()->json([
            'data' => $orders,
            'summary' => $summary,
        ]);
    }

    public function labTests(Request $request)
    {
        $query = LabTestBooking::with(['user', 'labTest']);

        if ($request->has('start_date')) {
            $query->whereDate('booking_date', '>=', $request->start_date);
        }
        if ($request->has('end_date')) {
            $query->whereDate('booking_date', '<=', $request->end_date);
        }

        $bookings = $query->get();
        
        $summary = [
            'total' => $bookings->count(),
            'by_status' => $bookings->groupBy('status')->map->count(),
            'total_revenue' => $bookings->where('status', 'completed')->sum('price'),
        ];

        return response()->json([
            'data' => $bookings,
            'summary' => $summary,
        ]);
    }

    public function users(Request $request)
    {
        $users = User::withCount(['appointments', 'orders'])
            ->when($request->has('role'), fn($q) => $q->where('role', $request->role))
            ->get();

        $summary = [
            'total' => $users->count(),
            'by_role' => $users->groupBy('role')->map->count(),
            'active' => $users->where('is_active', true)->count(),
        ];

        return response()->json([
            'data' => $users,
            'summary' => $summary,
        ]);
    }
}
