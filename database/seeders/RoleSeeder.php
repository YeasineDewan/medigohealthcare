<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full system access',
                'permissions' => [
                    'users.view', 'users.create', 'users.edit', 'users.delete',
                    'doctors.view', 'doctors.create', 'doctors.edit', 'doctors.delete',
                    'appointments.view', 'appointments.create', 'appointments.edit', 'appointments.delete',
                    'products.view', 'products.create', 'products.edit', 'products.delete',
                    'orders.view', 'orders.create', 'orders.edit', 'orders.delete',
                    'lab-tests.view', 'lab-tests.create', 'lab-tests.edit', 'lab-tests.delete',
                    'reports.view', 'settings.view', 'settings.edit',
                ],
                'is_active' => true,
            ],
            [
                'name' => 'doctor',
                'display_name' => 'Doctor',
                'description' => 'Doctor access',
                'permissions' => [
                    'appointments.view', 'appointments.edit',
                    'prescriptions.view', 'prescriptions.create', 'prescriptions.edit',
                    'medical-records.view', 'medical-records.create', 'medical-records.edit',
                    'patients.view',
                ],
                'is_active' => true,
            ],
            [
                'name' => 'patient',
                'display_name' => 'Patient',
                'description' => 'Patient access',
                'permissions' => [
                    'appointments.view', 'appointments.create',
                    'orders.view', 'orders.create',
                    'lab-tests.view', 'lab-tests.create',
                    'prescriptions.view',
                    'medical-records.view',
                ],
                'is_active' => true,
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['name' => $role['name']],
                $role
            );
        }
    }
}
