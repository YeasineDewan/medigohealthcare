<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\MedicalRecord;
use App\Models\Billing;
use App\Models\LabTest;
use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Get admin dashboard statistics
     */
    public function adminDashboard()
    {
        try {
            $stats = [
                'total_users' => User::count(),
                'total_doctors' => Doctor::count(),
                'total_patients' => Patient::count(),
                'total_appointments' => Appointment::count(),
                'active_doctors' => Doctor::where('status', 'active')->count(),
                'active_patients' => Patient::where('status', 'active')->count(),
                'today_appointments' => Appointment::whereDate('appointment_date', today())->count(),
                'pending_appointments' => Appointment::where('status', 'pending')->count(),
                'completed_appointments' => Appointment::where('status', 'completed')->count(),
                'total_revenue' => Billing::sum('amount'),
                'monthly_revenue' => Billing::whereMonth('created_at', now()->month)
                    ->whereYear('created_at', now()->year)
                    ->sum('amount'),
            ];

            // Recent activities
            $recentAppointments = Appointment::with(['doctor', 'patient'])
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            $recentPatients = Patient::orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            $recentDoctors = Doctor::orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            // Department statistics
            $departmentStats = Doctor::select('department', DB::raw('count(*) as count'))
                ->groupBy('department')
                ->orderBy('count', 'desc')
                ->get();

            // Appointment trends (last 30 days)
            $appointmentTrends = Appointment::select(
                    DB::raw('DATE(appointment_date) as date'),
                    DB::raw('COUNT(*) as count')
                )
                ->whereDate('appointment_date', '>=', now()->subDays(30))
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get();

            // Revenue trends (last 12 months)
            $revenueTrends = Billing::select(
                    DB::raw('MONTH(created_at) as month'),
                    DB::raw('YEAR(created_at) as year'),
                    DB::raw('SUM(amount) as total')
                )
                ->where('created_at', '>=', now()->subMonths(12))
                ->groupBy('month', 'year')
                ->orderBy('year', 'asc')
                ->orderBy('month', 'asc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'stats' => $stats,
                    'recent_appointments' => $recentAppointments,
                    'recent_patients' => $recentPatients,
                    'recent_doctors' => $recentDoctors,
                    'department_stats' => $departmentStats,
                    'appointment_trends' => $appointmentTrends,
                    'revenue_trends' => $revenueTrends,
                ],
                'message' => 'Admin dashboard data retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get doctor dashboard statistics
     */
    public function doctorDashboard(Request $request)
    {
        try {
            $doctorId = $request->user()->id;
            
            $stats = [
                'total_patients' => Patient::where('primary_physician', $request->user()->name)->count(),
                'total_appointments' => Appointment::where('doctor_id', $doctorId)->count(),
                'today_appointments' => Appointment::where('doctor_id', $doctorId)
                    ->whereDate('appointment_date', today())->count(),
                'upcoming_appointments' => Appointment::where('doctor_id', $doctorId)
                    ->whereDate('appointment_date', '>', today())
                    ->where('status', '!=', 'cancelled')
                    ->count(),
                'completed_appointments' => Appointment::where('doctor_id', $doctorId)
                    ->where('status', 'completed')->count(),
                'cancelled_appointments' => Appointment::where('doctor_id', $doctorId)
                    ->where('status', 'cancelled')->count(),
                'total_revenue' => Billing::where('doctor_id', $doctorId)->sum('amount'),
                'average_rating' => Doctor::find($doctorId)->avg('rating') ?? 0,
                'availability_status' => Doctor::find($doctorId)->availability ?? 'Unknown',
            ];

            // Today's appointments
            $todayAppointments = Appointment::with('patient')
                ->where('doctor_id', $doctorId)
                ->whereDate('appointment_date', today())
                ->orderBy('appointment_time', 'asc')
                ->get();

            // Upcoming appointments (next 7 days)
            $upcomingAppointments = Appointment::with('patient')
                ->where('doctor_id', $doctorId)
                ->whereBetween('appointment_date', [now(), now()->addDays(7)])
                ->where('status', '!=', 'cancelled')
                ->orderBy('appointment_date', 'asc')
                ->orderBy('appointment_time', 'asc')
                ->get();

            // Recent patients
            $recentPatients = Patient::where('primary_physician', $request->user()->name)
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            // Appointment statistics by type
            $appointmentStats = Appointment::select(
                    'type',
                    DB::raw('COUNT(*) as count')
                )
                ->where('doctor_id', $doctorId)
                ->groupBy('type')
                ->get();

            // Revenue by month (last 6 months)
            $monthlyRevenue = Billing::select(
                    DB::raw('MONTH(created_at) as month'),
                    DB::raw('SUM(amount) as total')
                )
                ->where('doctor_id', $doctorId)
                ->where('created_at', '>=', now()->subMonths(6))
                ->groupBy('month')
                ->orderBy('month', 'desc')
                ->get();

            // Patient demographics
            $patientDemographics = Patient::select(
                    'gender',
                    DB::raw('COUNT(*) as count')
                )
                ->where('primary_physician', $request->user()->name)
                ->groupBy('gender')
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'stats' => $stats,
                    'today_appointments' => $todayAppointments,
                    'upcoming_appointments' => $upcomingAppointments,
                    'recent_patients' => $recentPatients,
                    'appointment_stats' => $appointmentStats,
                    'monthly_revenue' => $monthlyRevenue,
                    'patient_demographics' => $patientDemographics,
                ],
                'message' => 'Doctor dashboard data retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get patient dashboard statistics
     */
    public function patientDashboard(Request $request)
    {
        try {
            $patientId = $request->user()->id;
            
            $stats = [
                'total_appointments' => Appointment::where('patient_id', $patientId)->count(),
                'upcoming_appointments' => Appointment::where('patient_id', $patientId)
                    ->whereDate('appointment_date', '>', today())
                    ->where('status', '!=', 'cancelled')
                    ->count(),
                'completed_appointments' => Appointment::where('patient_id', $patientId)
                    ->where('status', 'completed')->count(),
                'cancelled_appointments' => Appointment::where('patient_id', $patientId)
                    ->where('status', 'cancelled')->count(),
                'total_medical_records' => MedicalRecord::where('patient_id', $patientId)->count(),
                'total_prescriptions' => Prescription::where('patient_id', $patientId)->count(),
                'total_lab_tests' => LabTest::where('patient_id', $patientId)->count(),
                'outstanding_balance' => Billing::where('patient_id', $patientId)
                    ->where('status', 'pending')->sum('amount'),
                'total_spent' => Billing::where('patient_id', $patientId)
                    ->where('status', 'paid')->sum('amount'),
                'insurance_coverage' => Patient::find($patientId)->insurance_provider ?? 'Not specified',
                'primary_physician' => Patient::find($patientId)->primary_physician ?? 'Not assigned',
            ];

            // Upcoming appointments
            $upcomingAppointments = Appointment::with('doctor')
                ->where('patient_id', $patientId)
                ->whereDate('appointment_date', '>', today())
                ->where('status', '!=', 'cancelled')
                ->orderBy('appointment_date', 'asc')
                ->orderBy('appointment_time', 'asc')
                ->get();

            // Recent medical records
            $recentMedicalRecords = MedicalRecord::where('patient_id', $patientId)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            // Recent prescriptions
            $recentPrescriptions = Prescription::where('patient_id', $patientId)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            // Recent lab tests
            $recentLabTests = LabTest::where('patient_id', $patientId)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            // Billing history
            $billingHistory = Billing::where('patient_id', $patientId)
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            // Appointment history
            $appointmentHistory = Appointment::with('doctor')
                ->where('patient_id', $patientId)
                ->orderBy('appointment_date', 'desc')
                ->limit(10)
                ->get();

            // Vital signs history
            $vitalSignsHistory = MedicalRecord::where('patient_id', $patientId)
                ->whereNotNull('vital_signs')
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get();

            return response()->json([
                'success' => true,
                'data' => [
                    'stats' => $stats,
                    'upcoming_appointments' => $upcomingAppointments,
                    'recent_medical_records' => $recentMedicalRecords,
                    'recent_prescriptions' => $recentPrescriptions,
                    'recent_lab_tests' => $recentLabTests,
                    'billing_history' => $billingHistory,
                    'appointment_history' => $appointmentHistory,
                    'vital_signs_history' => $vitalSignsHistory,
                ],
                'message' => 'Patient dashboard data retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve dashboard data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get system statistics
     */
    public function systemStats()
    {
        try {
            $stats = [
                'server_info' => [
                    'php_version' => PHP_VERSION,
                    'laravel_version' => app()->version(),
                    'database_version' => DB::select('SELECT VERSION() as version')[0]->version,
                    'server_time' => now()->toDateTimeString(),
                    'uptime' => $this->getServerUptime(),
                ],
                'database_stats' => [
                    'total_users' => User::count(),
                    'total_doctors' => Doctor::count(),
                    'total_patients' => Patient::count(),
                    'total_appointments' => Appointment::count(),
                    'total_medical_records' => MedicalRecord::count(),
                    'total_prescriptions' => Prescription::count(),
                    'total_bills' => Billing::count(),
                ],
                'storage_info' => [
                    'disk_usage' => $this->getDiskUsage(),
                    'database_size' => $this->getDatabaseSize(),
                ],
                'performance_metrics' => [
                    'avg_response_time' => $this->getAverageResponseTime(),
                    'memory_usage' => memory_get_usage(true),
                    'cpu_usage' => sys_getloadavg(),
                ],
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'System statistics retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve system stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get real-time statistics
     */
    public function realTimeStats()
    {
        try {
            $stats = [
                'online_users' => $this->getOnlineUsersCount(),
                'active_sessions' => $this->getActiveSessionsCount(),
                'current_appointments' => Appointment::where('status', 'in_progress')->count(),
                'pending_registrations' => User::where('status', 'pending')->count(),
                'system_load' => sys_getloadavg()[0],
                'memory_usage' => round(memory_get_usage(true)['percent_used'], 2),
                'disk_usage' => round($this->getDiskUsage()['percent_used'], 2),
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Real-time statistics retrieved successfully'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve real-time stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get server uptime
     */
    private function getServerUptime()
    {
        if (function_exists('sys_getloadavg')) {
            $uptime = shell_exec('uptime -p');
            return trim($uptime);
        }
        return 'Unknown';
    }

    /**
     * Get disk usage
     */
    private function getDiskUsage()
    {
        $total = disk_total_space('/');
        $free = disk_free_space('/');
        $used = $total - $free;
        
        return [
            'total' => $this->formatBytes($total),
            'used' => $this->formatBytes($used),
            'free' => $this->formatBytes($free),
            'percent_used' => round(($used / $total) * 100, 2),
        ];
    }

    /**
     * Get database size
     */
    private function getDatabaseSize()
    {
        try {
            $result = DB::select('SELECT SUM(data_length + index_length) as size FROM information_schema.tables WHERE table_schema = DATABASE()');
            $size = $result[0]->size ?? 0;
            return $this->formatBytes($size);
        } catch (\Exception $e) {
            return 'Unknown';
        }
    }

    /**
     * Get average response time
     */
    private function getAverageResponseTime()
    {
        // This would typically come from a monitoring service
        // For now, return a mock value
        return rand(50, 200); // milliseconds
    }

    /**
     * Get online users count
     */
    private function getOnlineUsersCount()
    {
        // This would typically come from a session store or cache
        // For now, return a mock value
        return rand(10, 50);
    }

    /**
     * Get active sessions count
     */
    private function getActiveSessionsCount()
    {
        // This would typically come from a session store
        // For now, return a mock value
        return rand(20, 100);
    }

    /**
     * Format bytes to human readable format
     */
    private function formatBytes($bytes)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        
        $bytes /= pow(1024, $pow);
        
        return round($bytes, 2) . ' ' . $units[$pow];
    }
}
