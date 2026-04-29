<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Hospital;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class HospitalSeeder extends Seeder
{
    public function run(): void
    {
        $hospitals = [
            [
                'name' => 'Medigo Central Hospital',
                'slug' => 'medigo-central-hospital',
                'description' => 'A state-of-the-art multi-specialty hospital providing comprehensive healthcare services with advanced medical technology and experienced healthcare professionals.',
                'type' => 'private',
                'established_year' => 2010,
                'registration_number' => 'REG-2010-001',
                'address' => '123 Medical College Road, Dhanmondi',
                'city' => 'Dhaka',
                'district' => 'Dhaka',
                'postal_code' => '1209',
                'phone' => '+880-2-12345678',
                'email' => 'info@medigocentral.com',
                'website' => 'https://medigocentral.com',
                'total_beds' => 500,
                'icu_beds' => 50,
                'emergency_beds' => 100,
                'emergency_services' => ['24/7 Emergency', 'Trauma Care', 'Cardiac Emergency', 'Stroke Care'],
                'specializations' => ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gynecology', 'General Surgery'],
                'facilities' => ['Advanced ICU', 'Digital X-Ray', 'MRI', 'CT Scan', 'Ultrasound', 'Laboratory', 'Pharmacy', 'Ambulance Service'],
                'departments' => ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gynecology', 'General Surgery', 'Emergency Medicine'],
                'services' => ['OPD Services', 'IPD Services', 'Emergency Care', 'Diagnostic Services', 'Surgical Services', 'Maternity Care'],
                'accreditations' => ['ISO 9001:2015', 'Joint Commission International'],
                'awards' => ['Best Hospital in Dhaka 2022', 'Excellence in Patient Care 2023'],
                'rating' => 4.5,
                'review_count' => 150,
                'working_hours' => [
                    'monday' => '00:00-23:59',
                    'tuesday' => '00:00-23:59',
                    'wednesday' => '00:00-23:59',
                    'thursday' => '00:00-23:59',
                    'friday' => '00:00-23:59',
                    'saturday' => '00:00-23:59',
                    'sunday' => '00:00-23:59'
                ],
                'contact_person' => 'Dr. Ahmed Hassan',
                'contact_person_designation' => 'Medical Director',
                'status' => 'active',
                'is_featured' => true,
                'is_verified' => true,
                'latitude' => 23.7925,
                'longitude' => 90.4078,
                'social_media' => [
                    'facebook' => 'https://facebook.com/medigocentral',
                    'twitter' => 'https://twitter.com/medigocentral',
                    'linkedin' => 'https://linkedin.com/company/medigocentral'
                ],
            ],
            [
                'name' => 'Medigo Heart Institute',
                'slug' => 'medigo-heart-institute',
                'description' => 'Specialized cardiac care center dedicated to providing comprehensive heart disease treatment and prevention with world-class cardiologists and advanced cardiac facilities.',
                'type' => 'specialty',
                'established_year' => 2015,
                'registration_number' => 'REG-2015-002',
                'address' => '456 Cardiac Center Road, Gulshan',
                'city' => 'Dhaka',
                'district' => 'Dhaka',
                'postal_code' => '1213',
                'phone' => '+880-2-23456789',
                'email' => 'info@medigoheart.com',
                'website' => 'https://medigoheart.com',
                'total_beds' => 200,
                'icu_beds' => 30,
                'emergency_beds' => 40,
                'emergency_services' => ['24/7 Cardiac Emergency', 'Heart Attack Care', 'Cardiac Surgery'],
                'specializations' => ['Cardiology', 'Cardiac Surgery', 'Interventional Cardiology'],
                'facilities' => ['Cardiac Cath Lab', 'Echo Lab', 'Cardiac ICU', 'Cardiac OT'],
                'departments' => ['Cardiology', 'Cardiac Surgery', 'Interventional Cardiology'],
                'services' => ['Cardiac Consultation', 'Angiography', 'Angioplasty', 'Bypass Surgery'],
                'accreditations' => ['ISO 9001:2015'],
                'awards' => ['Best Cardiac Center 2023'],
                'rating' => 4.7,
                'review_count' => 89,
                'working_hours' => [
                    'monday' => '08:00-20:00',
                    'tuesday' => '08:00-20:00',
                    'wednesday' => '08:00-20:00',
                    'thursday' => '08:00-20:00',
                    'friday' => '08:00-20:00',
                    'saturday' => '08:00-20:00',
                    'sunday' => '09:00-18:00'
                ],
                'contact_person' => 'Dr. Sarah Rahman',
                'contact_person_designation' => 'Chief Cardiologist',
                'status' => 'active',
                'is_featured' => true,
                'is_verified' => true,
                'latitude' => 23.7806,
                'longitude' => 90.4165,
                'social_media' => [
                    'facebook' => 'https://facebook.com/medigoheart',
                    'twitter' => 'https://twitter.com/medigoheart'
                ],
            ],
        ];

        foreach ($hospitals as $hospitalData) {
            // Create user account for hospital admin
            $user = User::create([
                'name' => $hospitalData['name'] . ' Admin',
                'email' => 'admin@' . str_replace('https://', '', str_replace(['.', '-'], '', $hospitalData['website'])) . '.com',
                'password' => Hash::make('password123'),
                'role' => 'hospital_admin',
                'email_verified_at' => now(),
                'phone' => $hospitalData['phone'],
                'date_of_birth' => '1970-01-01',
                'gender' => 'other',
                'address' => $hospitalData['address'],
                'city' => $hospitalData['city'],
                'country' => 'Bangladesh',
                'is_active' => true,
                'email_verified' => true,
                'phone_verified' => true,
            ]);

            // Create hospital
            Hospital::create($hospitalData);
        }

        $this->command->info('Hospitals seeded successfully!');
    }
}
