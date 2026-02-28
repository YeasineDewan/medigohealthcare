<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class SettingsController extends Controller
{
    /**
     * Get general settings
     */
    public function getGeneralSettings(): JsonResponse
    {
        $settings = [
            'hospital_name' => config('app.name', 'Medigo Healthcare'),
            'hospital_code' => 'MED001',
            'email' => 'info@medigo.com',
            'phone' => '+1-234-567-8900',
            'address' => '123 Healthcare Ave, Medical City, MC 12345',
            'website' => 'www.medigo.com',
            'timezone' => 'UTC-5',
            'date_format' => 'MM/DD/YYYY',
            'time_format' => '12h',
            'language' => 'en',
            'currency' => 'USD',
            'logo' => null,
            'favicon' => null,
            'email_notifications' => true,
            'sms_notifications' => false,
            'push_notifications' => true,
            'appointment_reminders' => true,
            'billing_alerts' => true,
            'system_alerts' => true,
            'session_timeout' => 30,
            'password_expiry' => 90,
            'two_factor_auth' => true,
            'ip_restriction' => false,
            'audit_logging' => true,
            'backup_frequency' => 'daily',
            'retention_period' => 365,
            'auto_cleanup' => true,
            'theme' => 'light',
            'primary_color' => '#5DBB63',
        ];

        return response()->json([
            'success' => true,
            'data' => $settings
        ]);
    }

    /**
     * Update general settings
     */
    public function updateGeneralSettings(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'hospital_name' => 'nullable|string|max:255',
            'hospital_code' => 'nullable|string|max:50',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string',
            'website' => 'nullable|string',
            'timezone' => 'nullable|string',
            'date_format' => 'nullable|string',
            'time_format' => 'nullable|string',
            'language' => 'nullable|string',
            'currency' => 'nullable|string',
        ]);

        // In production, save to database or config
        // For now, return success
        
        return response()->json([
            'success' => true,
            'message' => 'Settings updated successfully',
            'data' => $validated
        ]);
    }

    /**
     * Get all users
     */
    public function getUsers(Request $request): JsonResponse
    {
        $perPage = $request->input('per_page', 10);
        $page = $request->input('page', 1);
        $search = $request->input('search', '');
        $role = $request->input('role', 'all');
        $status = $request->input('status', 'all');

        // Mock data - in production, fetch from users table
        $users = $this->getMockUsers();
        
        // Apply filters
        if ($search) {
            $users = array_filter($users, function($user) use ($search) {
                return stripos($user['name'], $search) !== false ||
                       stripos($user['email'], $search) !== false;
            });
        }
        
        if ($role !== 'all') {
            $users = array_filter($users, function($user) use ($role) {
                return $user['role'] === $role;
            });
        }
        
        if ($status !== 'all') {
            $users = array_filter($users, function($user) use ($status) {
                return $user['status'] === $status;
            });
        }

        $users = array_values($users);
        $total = count($users);
        $start = ($page - 1) * $perPage;
        $paginatedUsers = array_slice($users, $start, $perPage);

        return response()->json([
            'success' => true,
            'data' => $paginatedUsers,
            'meta' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'last_page' => ceil($total / $perPage)
            ]
        ]);
    }

    /**
     * Create new user
     */
    public function createUser(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'role' => 'required|string|in:admin,doctor,nurse,staff,pharmacist,accountant',
            'department' => 'nullable|string|max:255',
            'status' => 'nullable|in:active,inactive,suspended,pending',
        ]);

        // In production, create user in database
        
        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => array_merge($validated, [
                'id' => rand(100, 999),
                'created_at' => now()->toDateTimeString(),
                'last_login' => 'Never'
            ])
        ]);
    }

    /**
     * Update user
     */
    public function updateUser(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email',
            'phone' => 'nullable|string|max:20',
            'role' => 'sometimes|string',
            'department' => 'nullable|string',
            'status' => 'sometimes|in:active,inactive,suspended,pending',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User updated successfully',
            'data' => array_merge($validated, ['id' => $id])
        ]);
    }

    /**
     * Delete user
     */
    public function deleteUser(int $id): JsonResponse
    {
        // In production, delete from database
        
        return response()->json([
            'success' => true,
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Get roles and permissions
     */
    public function getRolesPermissions(): JsonResponse
    {
        $roles = [
            [
                'id' => 1,
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Full system access',
                'color' => 'purple',
                'users_count' => 2,
                'permissions' => ['all'],
                'is_default' => false,
                'created_at' => '2023-01-01'
            ],
            [
                'id' => 2,
                'name' => 'Doctor',
                'slug' => 'doctor',
                'description' => 'Medical staff access',
                'color' => 'blue',
                'users_count' => 15,
                'permissions' => ['view_patients', 'edit_prescriptions', 'view_appointments', 'view_medical_records'],
                'is_default' => false,
                'created_at' => '2023-01-01'
            ],
            [
                'id' => 3,
                'name' => 'Nurse',
                'slug' => 'nurse',
                'description' => 'Nursing staff access',
                'color' => 'green',
                'users_count' => 25,
                'permissions' => ['view_patients', 'view_appointments', 'edit_medical_records'],
                'is_default' => false,
                'created_at' => '2023-01-01'
            ],
            [
                'id' => 4,
                'name' => 'Staff',
                'slug' => 'staff',
                'description' => 'General staff access',
                'color' => 'gray',
                'users_count' => 30,
                'permissions' => ['view_appointments', 'view_patients'],
                'is_default' => true,
                'created_at' => '2023-01-01'
            ],
            [
                'id' => 5,
                'name' => 'Pharmacslug' => 'ist',
                'pharmacist',
                'description' => 'Pharmacy management',
                'color' => 'teal',
                'users_count' => 5,
                'permissions' => ['view_prescriptions', 'edit_inventory', 'view_pharmacy'],
                'is_default' => false,
                'created_at' => '2023-01-01'
            ],
            [
                'id' => 6,
                'name' => 'Accountant',
                'slug' => 'accountant',
                'description' => 'Financial management',
                'color' => 'amber',
                'users_count' => 3,
                'permissions' => ['view_financial_reports', 'manage_payments', 'view_billing'],
                'is_default' => false,
                'created_at' => '2023-01-01'
            ],
            [
                'id' => 7,
                'name' => 'Lab Technician',
                'slug' => 'lab_technician',
                'description' => 'Laboratory staff access',
                'color' => 'indigo',
                'users_count' => 8,
                'permissions' => ['view_lab_results', 'edit_lab_results', 'view_lab_tests'],
                'is_default' => false,
                'created_at' => '2023-01-01'
            ],
            [
                'id' => 8,
                'name' => 'Receptionist',
                'slug' => 'receptionist',
                'description' => 'Front desk operations',
                'color' => 'pink',
                'users_count' => 10,
                'permissions' => ['view_appointments', 'create_appointments', 'view_patients'],
                'is_default' => false,
                'created_at' => '2023-01-01'
            ]
        ];

        $permissionGroups = [
            [
                'name' => 'Users',
                'permissions' => [
                    ['id' => 'view_users', 'name' => 'View Users'],
                    ['id' => 'create_users', 'name' => 'Create Users'],
                    ['id' => 'edit_users', 'name' => 'Edit Users'],
                    ['id' => 'delete_users', 'name' => 'Delete Users'],
                    ['id' => 'manage_roles', 'name' => 'Manage Roles']
                ]
            ],
            [
                'name' => 'Patients',
                'permissions' => [
                    ['id' => 'view_patients', 'name' => 'View Patients'],
                    ['id' => 'create_patients', 'name' => 'Create Patients'],
                    ['id' => 'edit_patients', 'name' => 'Edit Patients'],
                    ['id' => 'delete_patients', 'name' => 'Delete Patients'],
                    ['id' => 'view_medical_records', 'name' => 'View Medical Records'],
                    ['id' => 'edit_medical_records', 'name' => 'Edit Medical Records']
                ]
            ],
            [
                'name' => 'Doctors',
                'permissions' => [
                    ['id' => 'view_doctors', 'name' => 'View Doctors'],
                    ['id' => 'create_doctors', 'name' => 'Create Doctors'],
                    ['id' => 'edit_doctors', 'name' => 'Edit Doctors'],
                    ['id' => 'delete_doctors', 'name' => 'Delete Doctors']
                ]
            ],
            [
                'name' => 'Appointments',
                'permissions' => [
                    ['id' => 'view_appointments', 'name' => 'View Appointments'],
                    ['id' => 'create_appointments', 'name' => 'Create Appointments'],
                    ['id' => 'edit_appointments', 'name' => 'Edit Appointments'],
                    ['id' => 'cancel_appointments', 'name' => 'Cancel Appointments']
                ]
            ],
            [
                'name' => 'Financial',
                'permissions' => [
                    ['id' => 'view_financial_reports', 'name' => 'View Financial Reports'],
                    ['id' => 'manage_payments', 'name' => 'Manage Payments'],
                    ['id' => 'view_billing', 'name' => 'View Billing'],
                    ['id' => 'manage_invoices', 'name' => 'Manage Invoices']
                ]
            ],
            [
                'name' => 'Reports',
                'permissions' => [
                    ['id' => 'view_reports', 'name' => 'View Reports'],
                    ['id' => 'create_reports', 'name' => 'Create Reports'],
                    ['id' => 'export_reports', 'name' => 'Export Reports']
                ]
            ]
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'roles' => $roles,
                'permission_groups' => $permissionGroups
            ]
        ]);
    }

    /**
     * Update role permissions
     */
    public function updateRolePermissions(Request $request, int $id): JsonResponse
    {
        $validated = $request->validate([
            'permissions' => 'required|array',
            'name' => 'sometimes|string|max:255',
            'description' => 'sometimes|string'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Role permissions updated successfully'
        ]);
    }

    /**
     * Create new role
     */
    public function createRole(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
            'description' => 'nullable|string',
            'permissions' => 'required|array',
            'color' => 'nullable|string'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Role created successfully',
            'data' => array_merge($validated, [
                'id' => rand(10, 99),
                'slug' => str_slug($validated['name']),
                'users_count' => 0,
                'is_default' => false,
                'created_at' => now()->toDateTimeString()
            ])
        ]);
    }

    /**
     * Delete role
     */
    public function deleteRole(int $id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Role deleted successfully'
        ]);
    }

    /**
     * Get system configuration
     */
    public function getSystemConfig(): JsonResponse
    {
        $config = [
            'application' => [
                'name' => 'Medigo Healthcare',
                'version' => '1.0.0',
                'env' => 'production',
                'debug' => false,
                'url' => 'https://medigo.com',
                'maintenance_mode' => false,
                'maintenance_message' => 'System under maintenance'
            ],
            'email' => [
                'driver' => 'smtp',
                'host' => 'smtp.mailtrap.io',
                'port' => 587,
                'username' => '',
                'password' => '',
                'encryption' => 'tls',
                'from_address' => 'noreply@medigo.com',
                'from_name' => 'Medigo Healthcare'
            ],
            'sms' => [
                'provider' => 'twilio',
                'account_sid' => '',
                'auth_token' => '',
                'from_number' => ''
            ],
            'payment' => [
                'stripe' => [
                    'enabled' => true,
                    'public_key' => 'pk_test_xxxx',
                    'secret_key' => 'sk_test_xxxx'
                ],
                'razorpay' => [
                    'enabled' => true,
                    'key_id' => 'rzp_test_xxxx',
                    'key_secret' => 'xxxx'
                ]
            ],
            'api' => [
                'keys' => [
                    ['name' => 'Google Maps', 'key' => 'AIzaSyxxxx', 'created_at' => '2024-01-01'],
                    ['name' => 'SendGrid', 'key' => 'SG.xxxx', 'created_at' => '2024-01-01']
                ],
                'rate_limit' => 60,
                'rate_limit_period' => 60
            ],
            'session' => [
                'lifetime' => 120,
                'expire_on_close' => false,
                'encrypt' => true,
                'cookie_name' => 'medigo_session'
            ],
            'cache' => [
                'driver' => 'file',
                'ttl' => 3600,
                'auto_clear' => true
            ],
            'upload' => [
                'max_size' => 10,
                'allowed_types' => ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
                'storage_path' => 'uploads'
            ]
        ];

        return response()->json([
            'success' => true,
            'data' => $config
        ]);
    }

    /**
     * Update system configuration
     */
    public function updateSystemConfig(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'application' => 'nullable|array',
            'email' => 'nullable|array',
            'sms' => 'nullable|array',
            'payment' => 'nullable|array',
            'api' => 'nullable|array',
            'session' => 'nullable|array',
            'cache' => 'nullable|array',
            'upload' => 'nullable|array'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'System configuration updated successfully'
        ]);
    }

    /**
     * Generate new API key
     */
    public function generateApiKey(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $key = 'medigo_' . bin2hex(random_bytes(16));

        return response()->json([
            'success' => true,
            'message' => 'API key generated successfully',
            'data' => [
                'name' => $validated['name'],
                'key' => $key,
                'created_at' => now()->toDateTimeString()
            ]
        ]);
    }

    /**
     * Delete API key
     */
    public function deleteApiKey(Request $request): JsonResponse
    {
        $request->validate(['key' => 'required|string']);

        return response()->json([
            'success' => true,
            'message' => 'API key deleted successfully'
        ]);
    }

    /**
     * Toggle maintenance mode
     */
    public function toggleMaintenanceMode(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'enabled' => 'required|boolean',
            'message' => 'nullable|string'
        ]);

        return response()->json([
            'success' => true,
            'message' => $validated['enabled'] ? 'Maintenance mode enabled' : 'Maintenance mode disabled'
        ]);
    }

    /**
     * Clear cache
     */
    public function clearCache(): JsonResponse
    {
        // In production, clear cache via Cache facade
        
        return response()->json([
            'success' => true,
            'message' => 'Cache cleared successfully'
        ]);
    }

    /**
     * Get backup list
     */
    public function getBackups(): JsonResponse
    {
        $backups = [
            [
                'id' => 1,
                'name' => 'full_backup_2024_01_20.sql',
                'size' => '256 MB',
                'type' => 'full',
                'status' => 'completed',
                'created_at' => '2024-01-20 10:30:00',
                'location' => 'local',
                'download_url' => '/api/v1/settings/backup/download/1'
            ],
            [
                'id' => 2,
                'name' => 'full_backup_2024_01_19.sql',
                'size' => '248 MB',
                'type' => 'full',
                'status' => 'completed',
                'created_at' => '2024-01-19 10:30:00',
                'location' => 'local',
                'download_url' => '/api/v1/settings/backup/download/2'
            ],
            [
                'id' => 3,
                'name' => 'incremental_backup_2024_01_20.sql',
                'size' => '32 MB',
                'type' => 'incremental',
                'status' => 'completed',
                'created_at' => '2024-01-20 18:30:00',
                'location' => 'local',
                'download_url' => '/api/v1/settings/backup/download/3'
            ],
            [
                'id' => 4,
                'name' => 'full_backup_2024_01_18.sql',
                'size' => '242 MB',
                'type' => 'full',
                'status' => 'completed',
                'created_at' => '2024-01-18 10:30:00',
                'location' => 'local',
                'download_url' => '/api/v1/settings/backup/download/4'
            ]
        ];

        $schedule = [
            'enabled' => true,
            'frequency' => 'daily',
            'time' => '02:00',
            'type' => 'full',
            'retention_days' => 30,
            'location' => 'local',
            'notify_on_success' => true,
            'notify_on_failure' => true,
            'email' => 'admin@medigo.com'
        ];

        return response()->json([
            'success' => true,
            'data' => [
                'backups' => $backups,
                'schedule' => $schedule
            ]
        ]);
    }

    /**
     * Create manual backup
     */
    public function createBackup(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:full,incremental,database,files'
        ]);

        // In production, trigger backup process
        
        return response()->json([
            'success' => true,
            'message' => 'Backup started successfully',
            'data' => [
                'id' => rand(1000, 9999),
                'name' => 'backup_' . date('Y_m_d_His') . '.sql',
                'type' => $validated['type'],
                'status' => 'in_progress',
                'created_at' => now()->toDateTimeString()
            ]
        ]);
    }

    /**
     * Update backup schedule
     */
    public function updateBackupSchedule(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'enabled' => 'boolean',
            'frequency' => 'in:daily,weekly,monthly',
            'time' => 'date_format:H:i',
            'type' => 'in:full,incremental',
            'retention_days' => 'integer|min:1',
            'location' => 'string',
            'notify_on_success' => 'boolean',
            'notify_on_failure' => 'boolean',
            'email' => 'email'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Backup schedule updated successfully'
        ]);
    }

    /**
     * Restore backup
     */
    public function restoreBackup(int $id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Backup restore started. This may take several minutes.',
            'data' => [
                'backup_id' => $id,
                'status' => 'restoring',
                'started_at' => now()->toDateTimeString()
            ]
        ]);
    }

    /**
     * Delete backup
     */
    public function deleteBackup(int $id): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Backup deleted successfully'
        ]);
    }

    /**
     * Download backup
     */
    public function downloadBackup(int $id): JsonResponse
    {
        // In production, return file download
        
        return response()->json([
            'success' => true,
            'message' => 'Download started',
            'data' => [
                'url' => '/storage/backups/backup_' . $id . '.sql'
            ]
        ]);
    }

    /**
     * Mock users data
     */
    private function getMockUsers(): array
    {
        return [
            [
                'id' => 1,
                'name' => 'Dr. Sarah Johnson',
                'email' => 'sarah.johnson@medigo.com',
                'phone' => '+1-234-567-8901',
                'role' => 'admin',
                'status' => 'active',
                'department' => 'Administration',
                'created_at' => '2023-01-15',
                'last_login' => '2024-01-20 10:30 AM',
                'avatar' => null
            ],
            [
                'id' => 2,
                'name' => 'Dr. Michael Chen',
                'email' => 'michael.chen@medigo.com',
                'phone' => '+1-234-567-8902',
                'role' => 'doctor',
                'status' => 'active',
                'department' => 'Cardiology',
                'created_at' => '2023-02-20',
                'last_login' => '2024-01-19 3:45 PM',
                'avatar' => null
            ],
            [
                'id' => 3,
                'name' => 'Emily Williams',
                'email' => 'emily.williams@medigo.com',
                'phone' => '+1-234-567-8903',
                'role' => 'nurse',
                'status' => 'active',
                'department' => 'Emergency',
                'created_at' => '2023-03-10',
                'last_login' => '2024-01-20 8:15 AM',
                'avatar' => null
            ],
            [
                'id' => 4,
                'name' => 'James Brown',
                'email' => 'james.brown@medigo.com',
                'phone' => '+1-234-567-8904',
                'role' => 'staff',
                'status' => 'inactive',
                'department' => 'Reception',
                'created_at' => '2023-04-05',
                'last_login' => '2024-01-10 11:00 AM',
                'avatar' => null
            ],
            [
                'id' => 5,
                'name' => 'Dr. Lisa Anderson',
                'email' => 'lisa.anderson@medigo.com',
                'phone' => '+1-234-567-8905',
                'role' => 'doctor',
                'status' => 'active',
                'department' => 'Neurology',
                'created_at' => '2023-05-12',
                'last_login' => '2024-01-20 9:30 AM',
                'avatar' => null
            ],
            [
                'id' => 6,
                'name' => 'Robert Martinez',
                'email' => 'robert.martinez@medigo.com',
                'phone' => '+1-234-567-8906',
                'role' => 'pharmacist',
                'status' => 'active',
                'department' => 'Pharmacy',
                'created_at' => '2023-06-18',
                'last_login' => '2024-01-19 2:20 PM',
                'avatar' => null
            ],
            [
                'id' => 7,
                'name' => 'Amanda Taylor',
                'email' => 'amanda.taylor@medigo.com',
                'phone' => '+1-234-567-8907',
                'role' => 'accountant',
                'status' => 'active',
                'department' => 'Finance',
                'created_at' => '2023-07-22',
                'last_login' => '2024-01-18 4:50 PM',
                'avatar' => null
            ],
            [
                'id' => 8,
                'name' => 'David Wilson',
                'email' => 'david.wilson@medigo.com',
                'phone' => '+1-234-567-8908',
                'role' => 'staff',
                'status' => 'suspended',
                'department' => 'Laboratory',
                'created_at' => '2023-08-30',
                'last_login' => '2024-01-05 10:00 AM',
                'avatar' => null
            ]
        ];
    }
}
