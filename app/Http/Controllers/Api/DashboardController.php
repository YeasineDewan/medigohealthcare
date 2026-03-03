<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\{User, Doctor, Appointment, Order, LabTestBooking, Product};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats(Request $request)
    {
        $stats = [
            'users' => [
                'total' => User::count(),
                'patients' => User::where('role', 'patient')->count(),
                'doctors' => User::where('role', 'doctor')->count(),
                'new_this_month' => User::whereMonth('created_at', now()->month)->count(),
            ],
            'appointments' => [
                'total' => Appointment::count(),
                'pending' => Appointment::where('status', 'pending')->count(),
                'confirmed' => Appointment::where('status', 'confirmed')->count(),
                'completed' => Appointment::where('status', 'completed')->count(),
                'today' => Appointment::whereDate('appointment_date', today())->count(),
            ],
            'orders' => [
                'total' => Order::count(),
                'pending' => Order::where('status', 'pending')->count(),
                'completed' => Order::where('status', 'completed')->count(),
                'revenue' => Order::where('status', 'completed')->sum('total_amount'),
            ],
            'lab_tests' => [
                'total' => LabTestBooking::count(),
                'pending' => LabTestBooking::where('status', 'pending')->count(),
                'completed' => LabTestBooking::where('status', 'completed')->count(),
            ],
            'products' => [
                'total' => Product::count(),
                'low_stock' => Product::where('stock', '<', 10)->count(),
            ],
        ];

        return response()->json($stats);
    }

    public function recentActivities(Request $request)
    {
        $activities = [
            'appointments' => Appointment::with(['user', 'doctor.user'])
                ->latest()
                ->take(5)
                ->get(),
            'orders' => Order::with('user')
                ->latest()
                ->take(5)
                ->get(),
        ];

        return response()->json($activities);
    }

    public function revenueChart(Request $request)
    {
        $period = $request->get('period', 'month');
        
        $data = Order::where('status', 'completed')
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as revenue')
            ->when($period === 'week', fn($q) => $q->where('created_at', '>=', now()->subWeek()))
            ->when($period === 'month', fn($q) => $q->where('created_at', '>=', now()->subMonth()))
            ->when($period === 'year', fn($q) => $q->where('created_at', '>=', now()->subYear()))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json($data);
    }
}
