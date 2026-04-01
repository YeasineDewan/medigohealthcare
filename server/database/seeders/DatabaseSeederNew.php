<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Doctor;
use App\Models\Patient;
use App\Models\Appointment;
use App\Models\MedicalRecord;
use App\Models\Billing;

class DatabaseSeederNew extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $this->call([
            AdminSeeder::class,
            DoctorSeeder::class,
            PatientSeeder::class,
            AppointmentSeeder::class,
            MedicalRecordSeeder::class,
            BillingSeeder::class,
        ]);
    }
}

class AdminSeeder extends Seeder
{
    public function run()
    {
        // Create admin users
        $admins = [
            [
                'name' => 'Super Admin',
                'email' => 'admin@medigo.com',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'status' => 'active',
            ],
            [
                'name' => 'System Admin',
                'email' => 'system@medigo.com',
                'password' => Hash::make('system123'),
                'role' => 'admin',
                'status' => 'active',
            ],
        ];

        foreach ($admins as $admin) {
            User::create($admin);
        }
    }
}

class DoctorSeeder extends Seeder
{
    public function run()
    {
        $specializations = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Practice'];
        $departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Emergency Medicine'];

        for ($i = 1; $i <= 10; $i++) {
            Doctor::create([
                'name' => "Dr. " . $this->getRandomName(),
                'email' => "doctor" . $i . "@medigo.com",
                'phone' => "+1 (555) " . rand(100, 999) . "-" . rand(1000, 9999),
                'specialization' => $specializations[array_rand($specializations)],
                'department' => $departments[array_rand($departments)],
                'experience' => rand(1, 25),
                'education' => json_encode([
                    ['degree' => 'MD', 'university' => 'Harvard Medical School', 'year' => rand(1990, 2010)],
                    ['degree' => 'PhD', 'university' => 'Johns Hopkins University', 'year' => rand(2005, 2015)],
                ]),
                'license_number' => 'MD' . rand(10000, 99999),
                'consultation_fee' => rand(50, 500),
                'languages' => json_encode(['English', 'Spanish']),
                'status' => 'active',
                'join_date' => now()->subDays(rand(0, 365))->format('Y-m-d'),
                'patients' => rand(0, 100),
                'appointments' => rand(0, 500),
                'availability' => 'Available',
                'rating' => rand(3.0, 5.0),
                'awards' => json_encode(['Best Doctor 2023', 'Research Excellence Award']),
            ]);
        }
    }

    private function getRandomName()
    {
        $firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'Robert', 'Jennifer', 'William'];
        $lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
        
        return $firstNames[array_rand($firstNames)] . ' ' . $lastNames[array_rand($lastNames)];
    }
}

class PatientSeeder extends Seeder
{
    public function run()
    {
        $bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        $genders = ['Male', 'Female', 'Other'];
        $insuranceProviders = ['Blue Cross Blue Shield', 'Aetna', 'UnitedHealth', 'Medicare', 'Medicaid'];

        for ($i = 1; $i <= 20; $i++) {
            Patient::create([
                'name' => $this->getRandomName(),
                'email' => "patient" . $i . "@medigo.com",
                'phone' => "+1 (555) " . rand(100, 999) . "-" . rand(1000, 9999),
                'date_of_birth' => now()->subYears(rand(18, 80))->format('Y-m-d'),
                'gender' => $genders[array_rand($genders)],
                'blood_type' => $bloodTypes[array_rand($bloodTypes)],
                'age' => rand(18, 80),
                'address' => rand(100, 999) . " Main St",
                'city' => 'Boston',
                'state' => 'MA',
                'zip_code' => '02101',
                'country' => 'USA',
                'emergency_contact_name' => $this->getRandomName(),
                'emergency_contact_phone' => "+1 (555) " . rand(100, 999) . "-" . rand(1000, 9999),
                'primary_physician' => 'Dr. ' . $this->getRandomName(),
                'insurance_provider' => $insuranceProviders[array_rand($insuranceProviders)],
                'policy_number' => 'POL' . rand(10000, 99999),
                'allergies' => json_encode(['Penicillin', 'Peanuts', 'Shellfish']),
                'chronic_conditions' => json_encode(['Hypertension', 'Diabetes Type 2', 'Asthma']),
                'medications' => json_encode(['Lisinopril', 'Metformin']),
                'status' => 'active',
                'registration_date' => now()->subDays(rand(0, 365))->format('Y-m-d'),
                'last_visit' => 'Not visited yet',
                'outstanding_balance' => rand(0, 1000),
                'bmi' => round(rand(18, 35), 1),
            ]);
        }
    }

    private function getRandomName()
    {
        $firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
        $lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
        
        return $firstNames[array_rand($firstNames)] . ' ' . $lastNames[array_rand($lastNames)];
    }
}

class AppointmentSeeder extends Seeder
{
    public function run()
    {
        $types = ['consultation', 'follow_up', 'surgery', 'emergency'];
        $statuses = ['scheduled', 'confirmed', 'completed', 'cancelled'];

        for ($i = 1; $i <= 50; $i++) {
            Appointment::create([
                'appointment_number' => 'APT' . now()->format('Ymd') . str_pad($i, 4, '0', STR_PAD_LEFT),
                'doctor_id' => rand(1, 10),
                'patient_id' => rand(1, 20),
                'appointment_date' => now()->addDays(rand(-7, 30))->format('Y-m-d'),
                'appointment_time' => now()->addHours(rand(8, 17), rand(0, 59))->format('H:i'),
                'duration' => rand(15, 120),
                'type' => $types[array_rand($types)],
                'status' => $statuses[array_rand($statuses)],
                'consultation_fee' => rand(50, 300),
                'payment_status' => 'pending',
                'notes' => 'Sample appointment notes for patient ' . $i,
            ]);
        }
    }
}

class MedicalRecordSeeder extends Seeder
{
    public function run()
    {
        $diagnoses = [
            'Hypertension', 'Diabetes Type 2', 'Asthma', 'COPD', 'Heart Disease',
            'Pneumonia', 'Influenza', 'COVID-19', 'Migraine', 'Arthritis'
        ];

        for ($i = 1; $i <= 30; $i++) {
            MedicalRecord::create([
                'patient_id' => rand(1, 20),
                'doctor_id' => rand(1, 10),
                'record_number' => 'MR' . now()->format('Ymd') . str_pad($i, 4, '0', STR_PAD_LEFT),
                'visit_date' => now()->subDays(rand(0, 30))->format('Y-m-d'),
                'diagnosis' => $diagnoses[array_rand($diagnoses)],
                'treatment' => 'Prescribed medication and lifestyle changes',
                'symptoms' => 'Chest pain, shortness of breath, fatigue',
                'notes' => 'Patient reports symptoms for ' . rand(1, 6) . ' months',
                'vital_signs' => json_encode([
                    [
                        'type' => 'Blood Pressure',
                        'value' => '120/80',
                        'unit' => 'mmHg',
                        'normal_range' => '120/80'
                    ],
                    [
                        'type' => 'Heart Rate',
                        'value' => '75',
                        'unit' => 'bpm',
                        'normal_range' => '60-100'
                    ],
                    [
                        'type' => 'Temperature',
                        'value' => '98.6',
                        'unit' => 'F',
                        'normal_range' => '97-99'
                    ]
                ]),
                'prescriptions' => json_encode([
                    ['medication' => 'Lisinopril', 'dosage' => '10mg', 'duration' => '30 days'],
                    ['medication' => 'Metformin', 'dosage' => '500mg', 'duration' => '90 days']
                ]),
                'lab_results' => json_encode([
                    ['test' => 'Blood Work', 'result' => 'Normal', 'date' => now()->format('Y-m-d')],
                    ['test' => 'ECG', 'result' => 'Normal sinus rhythm', 'date' => now()->format('Y-m-d')]
                ]),
                'status' => 'completed',
            ]);
        }
    }
}

class BillingSeeder extends Seeder
{
    public function run()
    {
        $services = [
            'Consultation Fee', 'Lab Tests', 'Imaging', 'Vaccination', 'Procedure'
        ];

        for ($i = 1; $i <= 25; $i++) {
            $amount = rand(50, 1000);
            $taxAmount = $amount * 0.1; // 10% tax
            $discountAmount = rand(0, 50);
            $totalAmount = $amount + $taxAmount - $discountAmount;

            Billing::create([
                'patient_id' => rand(1, 20),
                'doctor_id' => rand(1, 10),
                'appointment_id' => rand(1, 50),
                'bill_number' => 'BILL' . now()->format('Ymd') . str_pad($i, 4, '0', STR_PAD_LEFT),
                'amount' => $amount,
                'description' => $services[array_rand($services)] . ' - ' . $this->getRandomDescription(),
                'status' => rand(0, 1) ? 'paid' : 'pending',
                'due_date' => now()->addDays(rand(7, 30))->format('Y-m-d'),
                'payment_method' => rand(0, 1) ? 'card' : 'cash',
                'insurance_claim_number' => 'INS' . rand(10000, 99999),
                'services' => json_encode([$services[array_rand($services)]]),
                'tax_amount' => $taxAmount,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'payment_date' => rand(0, 1) ? now()->format('Y-m-d') : null,
            ]);
        }
    }

    private function getRandomDescription()
    {
        $descriptions = [
            'Routine checkup and consultation',
            'Specialist consultation for chronic condition',
            'Emergency room visit',
            'Surgical procedure consultation',
            'Follow-up appointment',
            'Mental health evaluation',
            'Preventive care visit'
        ];
        
        return $descriptions[array_rand($descriptions)];
    }
}
