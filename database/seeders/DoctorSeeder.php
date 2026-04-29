<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DoctorSeeder extends Seeder
{
    public function run(): void
    {
        $doctors = [
            [
                'user' => [
                    'name' => 'Dr. Ahmed Khan',
                    'email' => 'ahmed.khan@medigo.com',
                    'phone' => '+8801712345678',
                    'role' => 'doctor',
                ],
                'doctor' => [
                    'specialization' => 'Cardiology',
                    'qualifications' => 'MBBS, MD (Cardiology)',
                    'experience' => 'Senior Cardiologist with 15+ years experience.',
                    'license_number' => 'LIC001',
                    'department' => 'Cardiology',
                    'consultation_fee' => 1500.00,
                ],
            ],
            [
                'user' => [
                    'name' => 'Dr. Sarah Rahman',
                    'email' => 'sarah.rahman@medigo.com',
                    'phone' => '+8801712345679',
                    'role' => 'doctor',
                ],
                'doctor' => [
                    'specialization' => 'Pediatrics',
                    'qualifications' => 'MBBS, FCPS (Pediatrics)',
                    'experience' => 'Pediatrician with 10+ years experience.',
                    'license_number' => 'LIC002',
                    'department' => 'Pediatrics',
                    'consultation_fee' => 800.00,
                ],
            ],
            [
                'user' => [
                    'name' => 'Dr. Mohammed Hassan',
                    'email' => 'mohammed.hassan@medigo.com',
                    'phone' => '+8801712345680',
                    'role' => 'doctor',
                ],
                'doctor' => [
                    'specialization' => 'Orthopedics',
                    'qualifications' => 'MBBS, MS (Orthopedics)',
                    'experience' => 'Orthopedic Surgeon with 12+ years experience.',
                    'license_number' => 'LIC003',
                    'department' => 'Orthopedics',
                    'consultation_fee' => 1200.00,
                ],
            ],
        ];

        foreach ($doctors as $doctorData) {
            // Create user account
            $user = User::create($doctorData['user'] + [
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'date_of_birth' => '1975-05-15',
                'gender' => 'male',
                'address' => '123 Medical College Road',
                'city' => 'Dhaka',
                'country' => 'Bangladesh',
                'is_active' => true,
                'email_verified' => true,
                'phone_verified' => true,
            ]);

            // Create doctor profile
            Doctor::create([
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'phone' => $user->phone,
                'specialization' => $doctorData['doctor']['specialization'],
                'qualifications' => $doctorData['doctor']['qualifications'],
                'experience' => $doctorData['doctor']['experience'],
                'license_number' => $doctorData['doctor']['license_number'],
                'department' => $doctorData['doctor']['department'],
                'consultation_fee' => $doctorData['doctor']['consultation_fee'],
                'profile_image' => null,
                'is_active' => true,
            ]);
        }

        $this->command->info('Doctors seeded successfully!');
    }
}
