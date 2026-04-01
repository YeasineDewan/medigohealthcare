<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Appointment;
use App\Models\Order;
use App\Models\Banner;
use App\Models\Notice;
use App\Models\LabTestBooking;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function stats(Request $request)
    {
        $period = $request->get('period', 'month');
        
        $stats = [
            'totalPatients' => User::where('role', 'patient')->count(),
            'totalDoctors' => Doctor::count(),
            'todayAppointments' => Appointment::whereDate('date', today())->count(),
            'monthlyRevenue' => Order::whereMonth('created_at', today()->month)->sum('total_amount') ?? 0,
            'totalOrders' => Order::count(),
            'totalProducts' => DB::table('products')->count(),
            'totalBanners' => Banner::count(),
            'totalNotices' => Notice::count(),
            'pendingReports' => LabTestBooking::where('status', 'pending')->count(),
            'emergencyCases' => Appointment::where('type', 'emergency')->where('status', 'active')->count(),
            'activeCampaigns' => Notice::where('active', true)->count(),
            'satisfactionRate' => 94.5, // Placeholder - implement from reviews
            'bedOccupancy' => 78.3, // Placeholder
            'avgWaitTime' => 12, // Placeholder in minutes
            'systemUptime' => 99.9, // Placeholder
        ];

        return response()->json([
            'success' => true,
            'data' => $stats
        ]);
    }

    public function recentActivity(Request $request)
    {
        $limit = $request->get('limit', 10);
        
        $activities = collect([
            // Recent appointments
            Appointment::latest()->limit(5)->get()->map(function ($apt) {
                return [
                    'id' => $apt->id,
                    'user' => $apt->doctor->user->name ?? 'Doctor',
                    'action' => 'Appointment: ' . $apt->patient->name,
                    'time' => $apt->created_at->diffForHumans(),
                    'type' => 'appointment',
                    'status' => $apt->status,
                    'department' => $apt->doctor->specialty ?? 'General',
                ];
            }),
            // Recent orders
            Order::latest()->limit(5)->get()->map(function ($order) {
                return [
                    'id' => $order->id,
                    'user' => $order->user->name ?? 'Patient',
                    'action' => 'New order #' . $order->id,
                    'time' => $order->created_at->diffForHumans(),
                    'type' => 'order',
                    'status' => $order->status,
                    'amount' => '$' . number_format($order->total_amount, 2),
                    'department' => 'Pharmacy',
                ];
            }),
            // Recent banners/notices
            Banner::latest()->where('active', true)->limit(2)->get()->map(function ($banner) {
                return [
                    'id' => $banner->id,
                    'user' => 'Admin',
                    'action' => 'New banner: ' . $banner->title,
                    'time' => $banner->created_at->diffForHumans(),
                    'type' => 'banner',
                    'status' => 'active',
                    'department' => 'Marketing',
                ];
            }),
        ])->flatten(1)->sortByDesc('created_at')->take($limit)->values()->all();

        return response()->json([
            'success' => true,
            'data' => $activities
        ]);
    }

    public function upcomingAppointments(Request $request)
    {
        $limit = $request->get('limit', 5);
        
        $appointments = Appointment::with(['doctor.user', 'patient'])
            ->where('date', '>=', today())
            ->where('status', '!=', 'cancelled')
            ->orderBy('date')
            ->orderBy('time')
            ->limit($limit)
            ->get()
            ->map(function ($apt) {
                return [
                    'id' => $apt->id,
                    'patient' => $apt->patient->name ?? 'Patient',
                    'doctor' => 'Dr. ' . ($apt->doctor->user->name ?? 'Doctor'),
                    'time' => $apt->time,
                    'type' => ucfirst($apt->type ?? 'Consultation'),
                    'department' => $apt->doctor->specialty ?? 'General',
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $appointments
        ]);
    }

    public function departmentStats(Request $request)
    {
        $departments = [
            ['name' => 'Cardiology', 'patients' => 342, 'revenue' => 28450, 'growth' => 12.5, 'doctors' => 8, 'beds' => 24, 'occupancy' => 85.2],
            ['name' => 'Neurology', 'patients' => 218, 'revenue' => 19800, 'growth' => 8.3, 'doctors' => 5, 'beds' => 16, 'occupancy' => 72.1],
            ['name' => 'Orthopedics', 'patients' => 189, 'revenue' => 15600, 'growth' => -2.1, 'doctors' => 4, 'beds' => 12, 'occupancy' => 68.7],
            // Add more dynamic data here
        ];

        return response()->json([
            'success' => true,
            'data' => $departments
        ]);
    }
}

