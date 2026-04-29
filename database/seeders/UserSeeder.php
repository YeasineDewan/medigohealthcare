<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'email_verified_at' => now(),
            'phone' => '+8801712345678',
            'date_of_birth' => '1980-01-01',
            'gender' => 'male',
            'address' => '123 Admin Street, Dhaka',
            'city' => 'Dhaka',
            'country' => 'Bangladesh',
            'is_active' => true,
            'email_verified' => true,
            'phone_verified' => true,
        ]);

        // Create doctor user
        User::create([
            'name' => 'Dr. Ahmed Hassan',
            'email' => 'doctor@example.com',
            'password' => Hash::make('password123'),
            'role' => 'doctor',
            'email_verified_at' => now(),
            'phone' => '+8801712345679',
            'date_of_birth' => '1975-05-15',
            'gender' => 'male',
            'address' => '456 Medical College Road, Dhaka',
            'city' => 'Dhaka',
            'country' => 'Bangladesh',
            'is_active' => true,
            'email_verified' => true,
            'phone_verified' => true,
        ]);

        // Create patient user
        User::create([
            'name' => 'John Doe',
            'email' => 'patient@example.com',
            'password' => Hash::make('password123'),
            'role' => 'patient',
            'email_verified_at' => now(),
            'phone' => '+8801712345680',
            'date_of_birth' => '1985-06-15',
            'gender' => 'male',
            'address' => '789 Main Street, Dhanmondi',
            'city' => 'Dhaka',
            'country' => 'Bangladesh',
            'is_active' => true,
            'email_verified' => true,
            'phone_verified' => true,
        ]);

        // Create hospital admin user
        User::create([
            'name' => 'Hospital Admin',
            'email' => 'hospital@example.com',
            'password' => Hash::make('password123'),
            'role' => 'hospital_admin',
            'email_verified_at' => now(),
            'phone' => '+8801712345681',
            'date_of_birth' => '1970-03-20',
            'gender' => 'female',
            'address' => '101 Hospital Avenue, Dhaka',
            'city' => 'Dhaka',
            'country' => 'Bangladesh',
            'is_active' => true,
            'email_verified' => true,
            'phone_verified' => true,
        ]);

        // Create staff user
        User::create([
            'name' => 'Staff Member',
            'email' => 'staff@example.com',
            'password' => Hash::make('password123'),
            'role' => 'staff',
            'email_verified_at' => now(),
            'phone' => '+8801712345682',
            'date_of_birth' => '1990-08-10',
            'gender' => 'female',
            'address' => '202 Staff Quarter, Dhaka',
            'city' => 'Dhaka',
            'country' => 'Bangladesh',
            'is_active' => true,
            'email_verified' => true,
            'phone_verified' => true,
        ]);

        $this->command->info('Users seeded successfully!');
    }
}
