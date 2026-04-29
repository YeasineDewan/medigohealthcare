<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class PatientSeeder extends Seeder
{
    public function run(): void
    {
        $patients = [
            [
                'user_id' => null, // Will be set after creating user
                'patient_id' => 'P-001',
                'date_of_birth' => '1985-06-15',
                'gender' => 'male',
                'blood_group' => 'O+',
                'phone' => '+8801712345678',
                'alternate_phone' => '+8801712345679',
                'address' => '123 Main Street, Dhanmondi, Dhaka',
                'city' => 'Dhaka',
                'postal_code' => '1209',
                'emergency_contact_name' => 'Jane Doe',
                'emergency_contact_phone' => '+8801712345679',
                'emergency_contact_relation' => 'Spouse',
                'medical_history' => 'Hypertension, Diabetes Type 2',
                'family_history' => 'Father: Heart Disease, Mother: Diabetes',
                'medications' => ['Metformin', 'Lisinopril'],
                'allergies' => ['Penicillin', 'Peanuts'],
                'insurance_info' => [
                    'provider' => 'Health Insurance Ltd',
                    'policy_number' => 'HIL-123456'
                ],
            ],
            [
                'user_id' => null,
                'patient_id' => 'P-002',
                'date_of_birth' => '1990-03-22',
                'gender' => 'female',
                'blood_group' => 'A+',
                'phone' => '+8801812345678',
                'alternate_phone' => '+8801812345679',
                'address' => '456 Park Avenue, Gulshan, Dhaka',
                'city' => 'Dhaka',
                'postal_code' => '1213',
                                'emergency_contact_name' => 'Michael Johnson',
                'emergency_contact_phone' => '+8801812345679',
                'emergency_contact_relation' => 'Husband',
                'medical_history' => 'Asthma, Migraine',
                'family_history' => 'Mother: Migraine',
                'medications' => ['Albuterol Inhaler', 'Sumatriptan'],
                'allergies' => ['Dust', 'Pollen'],
                'insurance_info' => [
                    'provider' => 'MediCare Plus',
                    'policy_number' => 'MCP-789012'
                ],
            ],
            [
                'user_id' => null,
                'patient_id' => 'P-003',
                'date_of_birth' => '1978-11-08',
                'gender' => 'male',
                'blood_group' => 'B+',
                'phone' => '+8801912345678',
                'alternate_phone' => '+8801912345679',
                'address' => '789 Business Road, Banani, Dhaka',
                'city' => 'Dhaka',
                'postal_code' => '1213',
                                'emergency_contact_name' => 'Fatema Rahman',
                'emergency_contact_phone' => '+8801912345679',
                'emergency_contact_relation' => 'Sister',
                'medical_history' => 'Gastritis, High Cholesterol',
                'family_history' => 'Father: Heart Disease, Brother: Diabetes',
                'medications' => ['Omeprazole', 'Atorvastatin'],
                'allergies' => ['Shellfish'],
                'insurance_info' => [
                    'provider' => 'Bangla Health Care',
                    'policy_number' => 'BHC-345678'
                ],
            ],
            [
                'user_id' => null,
                'patient_id' => 'P-004',
                'date_of_birth' => '1992-07-30',
                'gender' => 'female',
                'blood_group' => 'AB+',
                'phone' => '+8801712345680',
                'alternate_phone' => '+8801712345681',
                'address' => '321 Medical College Road, Mirpur, Dhaka',
                'city' => 'Dhaka',
                'postal_code' => '1216',
                                'emergency_contact_name' => 'Abdul Karim',
                'emergency_contact_phone' => '+8801712345681',
                'emergency_contact_relation' => 'Father',
                'medical_history' => 'Thyroid issues, Anemia',
                'family_history' => 'Mother: Thyroid problems',
                'medications' => ['Levothyroxine', 'Iron supplements'],
                'allergies' => ['Iodine'],
                'insurance_info' => [
                    'provider' => 'National Health Insurance',
                    'policy_number' => 'NHI-901234'
                ],
            ],
            [
                'user_id' => null,
                'patient_id' => 'P-005',
                'date_of_birth' => '1965-09-18',
                'gender' => 'male',
                'blood_group' => 'A-',
                'phone' => '+8801712345682',
                'alternate_phone' => '+8801712345683',
                'address' => '567 Residential Area, Uttara, Dhaka',
                'city' => 'Dhaka',
                'postal_code' => '1230',
                                'emergency_contact_name' => 'Rahim Khan',
                'emergency_contact_phone' => '+8801712345683',
                'emergency_contact_relation' => 'Brother',
                'medical_history' => 'Arthritis, Hypertension',
                'family_history' => 'Father: Arthritis, Mother: Hypertension',
                'medications' => ['Ibuprofen', 'ACE inhibitors'],
                'allergies' => ['None known'],
                'insurance_info' => [
                    'provider' => 'Private Health Coverage',
                    'policy_number' => 'PHC-567890'
                ],
            ],
        ];

        foreach ($patients as $patientData) {
            // Create user account for patient
            $user = User::create([
                'name' => 'Patient ' . $patientData['patient_id'],
                'email' => 'patient' . $patientData['patient_id'] . '@example.com',
                'password' => Hash::make('password123'),
                'role' => 'patient',
                'email_verified_at' => now(),
                'phone' => $patientData['phone'],
                'date_of_birth' => $patientData['date_of_birth'],
                'gender' => $patientData['gender'],
                'address' => $patientData['address'],
                'city' => $patientData['city'],
                'is_active' => true,
                'email_verified' => true,
                'phone_verified' => true,
            ]);

            // Set the user_id and create patient
            $patientData['user_id'] = $user->id;
            Patient::create($patientData);
        }

        $this->command->info('Patients seeded successfully!');
    }
}
