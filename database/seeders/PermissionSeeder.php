<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            // Users
            ['name' => 'users.view', 'display_name' => 'View Users', 'module' => 'users'],
            ['name' => 'users.create', 'display_name' => 'Create Users', 'module' => 'users'],
            ['name' => 'users.edit', 'display_name' => 'Edit Users', 'module' => 'users'],
            ['name' => 'users.delete', 'display_name' => 'Delete Users', 'module' => 'users'],
            
            // Doctors
            ['name' => 'doctors.view', 'display_name' => 'View Doctors', 'module' => 'doctors'],
            ['name' => 'doctors.create', 'display_name' => 'Create Doctors', 'module' => 'doctors'],
            ['name' => 'doctors.edit', 'display_name' => 'Edit Doctors', 'module' => 'doctors'],
            ['name' => 'doctors.delete', 'display_name' => 'Delete Doctors', 'module' => 'doctors'],
            
            // Appointments
            ['name' => 'appointments.view', 'display_name' => 'View Appointments', 'module' => 'appointments'],
            ['name' => 'appointments.create', 'display_name' => 'Create Appointments', 'module' => 'appointments'],
            ['name' => 'appointments.edit', 'display_name' => 'Edit Appointments', 'module' => 'appointments'],
            ['name' => 'appointments.delete', 'display_name' => 'Delete Appointments', 'module' => 'appointments'],
            
            // Products
            ['name' => 'products.view', 'display_name' => 'View Products', 'module' => 'products'],
            ['name' => 'products.create', 'display_name' => 'Create Products', 'module' => 'products'],
            ['name' => 'products.edit', 'display_name' => 'Edit Products', 'module' => 'products'],
            ['name' => 'products.delete', 'display_name' => 'Delete Products', 'module' => 'products'],
            
            // Orders
            ['name' => 'orders.view', 'display_name' => 'View Orders', 'module' => 'orders'],
            ['name' => 'orders.create', 'display_name' => 'Create Orders', 'module' => 'orders'],
            ['name' => 'orders.edit', 'display_name' => 'Edit Orders', 'module' => 'orders'],
            ['name' => 'orders.delete', 'display_name' => 'Delete Orders', 'module' => 'orders'],
            
            // Lab Tests
            ['name' => 'lab-tests.view', 'display_name' => 'View Lab Tests', 'module' => 'lab-tests'],
            ['name' => 'lab-tests.create', 'display_name' => 'Create Lab Tests', 'module' => 'lab-tests'],
            ['name' => 'lab-tests.edit', 'display_name' => 'Edit Lab Tests', 'module' => 'lab-tests'],
            ['name' => 'lab-tests.delete', 'display_name' => 'Delete Lab Tests', 'module' => 'lab-tests'],
            
            // Prescriptions
            ['name' => 'prescriptions.view', 'display_name' => 'View Prescriptions', 'module' => 'prescriptions'],
            ['name' => 'prescriptions.create', 'display_name' => 'Create Prescriptions', 'module' => 'prescriptions'],
            ['name' => 'prescriptions.edit', 'display_name' => 'Edit Prescriptions', 'module' => 'prescriptions'],
            
            // Medical Records
            ['name' => 'medical-records.view', 'display_name' => 'View Medical Records', 'module' => 'medical-records'],
            ['name' => 'medical-records.create', 'display_name' => 'Create Medical Records', 'module' => 'medical-records'],
            ['name' => 'medical-records.edit', 'display_name' => 'Edit Medical Records', 'module' => 'medical-records'],
            
            // Reports
            ['name' => 'reports.view', 'display_name' => 'View Reports', 'module' => 'reports'],
            
            // Settings
            ['name' => 'settings.view', 'display_name' => 'View Settings', 'module' => 'settings'],
            ['name' => 'settings.edit', 'display_name' => 'Edit Settings', 'module' => 'settings'],
            
            // Patients
            ['name' => 'patients.view', 'display_name' => 'View Patients', 'module' => 'patients'],
        ];

        foreach ($permissions as $permission) {
            Permission::updateOrCreate(
                ['name' => $permission['name']],
                $permission
            );
        }
    }
}
