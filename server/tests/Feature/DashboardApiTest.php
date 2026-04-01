<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\MedicalRecord;
use App\Models\Billing;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test data
        User::factory()->create([
            'email' => 'admin@medigo.com',
            'role' => 'admin'
        ]);
        
        User::factory()->create([
            'email' => 'doctor@medigo.com',
            'role' => 'doctor'
        ]);
        
        User::factory()->create([
            'email' => 'patient@medigo.com',
            'role' => 'patient'
        ]);
    }

    public function test_admin_dashboard_requires_authentication()
    {
        $response = $this->getJson('/api/dashboard/admin');
        
        $response->assertStatus(401);
    }

    public function test_admin_dashboard_requires_admin_role()
    {
        $user = User::factory()->create(['role' => 'patient']);
        $token = $user->createToken('test-token')->plainTextToken;
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/dashboard/admin');
        
        $response->assertStatus(403);
    }

    public function test_admin_dashboard_success()
    {
        $admin = User::where('email', 'admin@medigo.com')->first();
        $token = $admin->createToken('test-token')->plainTextToken;
        
        // Create test data
        Doctor::factory()->count(10)->create();
        Patient::factory()->count(20)->create();
        Appointment::factory()->count(50)->create();
        MedicalRecord::factory()->count(30)->create();
        Billing::factory()->count(25)->create();
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/dashboard/admin');
        
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'stats' => [
                            'total_users',
                            'total_doctors',
                            'total_patients',
                            'total_appointments',
                            'today_appointments',
                            'pending_appointments',
                            'completed_appointments',
                            'total_revenue',
                            'monthly_revenue',
                            'monthly_revenue_change'
                        ],
                        'recent_appointments',
                        'recent_patients',
                        'recent_doctors',
                        'department_stats',
                        'appointment_trends',
                        'revenue_trends'
                    ]
                ]);
    }

    public function test_doctor_dashboard_success()
    {
        $doctor = User::where('email', 'doctor@medigo.com')->first();
        $token = $doctor->createToken('test-token')->plainTextToken;
        
        // Create test data
        Doctor::factory()->count(5)->create();
        Patient::factory()->count(10)->create();
        Appointment::factory()->count(20)->create();
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/dashboard/doctor');
        
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'stats' => [
                            'total_patients',
                            'today_appointments',
                            'upcoming_appointments',
                            'completed_appointments',
                            'cancelled_appointments',
                            'total_revenue',
                            'average_rating',
                            'availability_status'
                        ],
                        'today_appointments',
                        'upcoming_appointments',
                        'recent_patients',
                        'appointment_stats',
                        'monthly_revenue',
                        'patient_demographics'
                    ]
                ]);
    }

    public function test_patient_dashboard_success()
    {
        $patient = User::where('email', 'patient@medigo.com')->first();
        $token = $patient->createToken('test-token')->plainTextToken;
        
        // Create test data
        Patient::factory()->count(5)->create();
        Appointment::factory()->count(10)->create();
        MedicalRecord::factory()->count(5)->create();
        Billing::factory()->count(3)->create();
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/dashboard/patient');
        
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'stats' => [
                            'total_appointments',
                            'upcoming_appointments',
                            'completed_appointments',
                            'cancelled_appointments',
                            'total_medical_records',
                            'total_prescriptions',
                            'total_lab_tests',
                            'outstanding_balance',
                            'total_spent',
                            'insurance_coverage',
                            'primary_physician'
                        ],
                        'upcoming_appointments',
                        'recent_medical_records',
                        'recent_prescriptions',
                        'recent_lab_tests',
                        'billing_history',
                        'appointment_history',
                        'vital_signs_history'
                    ]
                ]);
    }

    public function test_system_stats_success()
    {
        $admin = User::where('email', 'admin@medigo.com')->first();
        $token = $admin->createToken('test-token')->plainTextToken;
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/dashboard/system-stats');
        
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'server_info',
                        'database_stats',
                        'performance_metrics',
                        'storage_usage'
                    ]
                ]);
    }

    public function test_real_time_stats_success()
    {
        $admin = User::where('email', 'admin@medigo.com')->first();
        $token = $admin->createToken('test-token')->plainTextToken;
        
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/dashboard/real-time-stats');
        
        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        'online_users',
                        'active_sessions',
                        'current_appointments',
                        'system_load',
                        'memory_usage',
                        'disk_usage'
                    ]
                ]);
    }
}
