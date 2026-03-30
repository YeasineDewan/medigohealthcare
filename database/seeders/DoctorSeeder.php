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
                    'specialty' => 'Cardiology',
                    'qualifications' => 'MBBS, MD (Cardiology)',
                    'bio' => 'Senior Cardiologist with 15+ years experience.',
                    'license_number' => 'LIC001',
                    'experience_years' => 15,
                    'consultation_fee' => 1500,
                    'video_consultation_fee' => 1200,
                    'hospital' => 'Medigo Heart Center',
                    'location' => 'Dhaka',
                    'available_days' => ['monday', 'wednesday', 'friday'],
                    'start_time' => '09:00',
                    'end_time' => '17:00',
                    'is_available' => true,
                    'accepts_video_consultation' => true,
                ]
            ],
            [
                'user' => [
                    'name' => 'Dr. Fatima Rahman',
                    'email' => 'fatima.rahman@medigo.com',
                    'phone' => '+8801812345678',
                    'role' => 'doctor',
                ],
                'doctor' => [
                    'specialty' => 'General Physician',
                    'qualifications' => 'MBBS, FCPS',
                    'bio' => 'Experienced General Physician.',
                    'license_number' => 'LIC002',
                    'experience_years' => 10,
                    'consultation_fee' => 1000,
                    'video_consultation_fee' => 800,
                    'hospital' => 'Medigo Clinic',
                    'location' => 'Dhaka',
                    'available_days' => ['tuesday', 'thursday', 'saturday'],
                    'start_time' => '10:00',
                    'end_time' => '18:00',
                    'is_available' => true,
                    'accepts_video_consultation' => true,
                ]
            ],
            // Add 3 more doctors...
            [
                'user' => [
                    'name' => 'Dr. Sarah Ali',
                    'email' => 'sarah.ali@medigo.com',
                    'phone' => '+8801912345678',
                    'role' => 'doctor',
                ],
                'doctor' => [
                    'specialty' => 'Pediatrics',
                    'qualifications' => 'MBBS, DCH',
                    'bio' => 'Child specialist.',
                    'license_number' => 'LIC003',
                    'experience_years' => 8,
                    'consultation_fee' => 1200,
                    'video_consultation_fee' => 1000,
                    'hospital' => 'Medigo Children Hospital',
                    'location' => 'Dhaka',
                    'available_days' => ['monday', 'tuesday', 'wednesday'],
                    'start_time' => '14:00',
                    'end_time' => '20:00',
                    'is_available' => true,
                    'accepts_video_consultation' => true,
                ]
            ],
            [
                'user' => [
                    'name' => 'Dr. Raj Patel',
                    'email' => 'raj.patel@medigo.com',
                    'phone' => '+8801923456789',
                    'role' => 'doctor',
                ],
                'doctor' => [
                    'specialty' => 'Orthopedics',
                    'qualifications' => 'MBBS, MS (Ortho)',
                    'bio' => 'Orthopedic surgeon.',
                    'license_number' => 'LIC004',
                    'experience_years' => 12,
                    'consultation_fee' => 1800,
                    'video_consultation_fee' => 1500,
                    'hospital' => 'Medigo Bone Center',
                    'location' => 'Dhaka',
                    'available_days' => ['thursday', 'friday'],
                    'start_time' => '09:00',
                    'end_time' => '17:00',
                    'is_available' => true,
                    'accepts_video_consultation' => false,
                ]
            ],
            [
                'user' => [
                    'name' => 'Dr. Lina Chowdhury',
                    'email' => 'lina.chowdhury@medigo.com',
                    'phone' => '+8801934567890',
                    'role' => 'doctor',
                ],
                'doctor' => [
                    'specialty' => 'Gynecology',
                    'qualifications' => 'MBBS, FCPS (Gyn)',
                    'bio' => 'Women health specialist.',
                    'license_number' => 'LIC005',
                    'experience_years' => 11,
                    'consultation_fee' => 1400,
                    'video_consultation_fee' => 1100,
                    'hospital' => 'Medigo Women Center',
                    'location' => 'Dhaka',
                    'available_days' => ['saturday', 'sunday'],
                    'start_time' => '11:00',
                    'end_time' => '19:00',
                    'is_available' => true,
                    'accepts_video_consultation' => true,
                ]
            ],
        ];

        foreach ($doctors as $data) {
            $user = User::create(array_merge($data['user'], [
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]));

            Doctor::create(array_merge($data['doctor'], [
                'user_id' => $user->id,
                'rating' => rand(40, 50) / 10,
                'total_reviews' => rand(10, 50),
            ]));
        }
    }
}

