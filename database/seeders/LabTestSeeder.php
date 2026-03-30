<?php

namespace Database\Seeders;

use App\Models\LabTest;
use Illuminate\Database\Seeder;

class LabTestSeeder extends Seeder
{
    public function run(): void
    {
        $labTests = [
            [
                'name' => 'Complete Blood Count (CBC)',
                'slug' => 'cbc',
                'description' => 'Complete blood count test including hemoglobin, white cells, platelets.',
                'category' => 'Hematology',
                'price' => 800,
                'sample_type' => 'Blood',
                'preparation' => 'Fasting not required',
                'duration' => '30 minutes',
                'fasting_required' => false,
                'home_collection' => true,
                'report_time' => '24 hours',
                'parameters' => ['Hemoglobin', 'WBC', 'Platelets', 'RBC', 'Hematocrit'],
                'is_popular' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Blood Sugar (Fasting)',
                'slug' => 'blood-sugar-fasting',
                'description' => 'Fasting blood sugar test for diabetes screening.',
                'category' => 'Biochemistry',
                'price' => 300,
                'sample_type' => 'Blood',
                'preparation' => 'Fasting 8-12 hours required',
                'duration' => '15 minutes',
                'fasting_required' => true,
                'home_collection' => true,
                'report_time' => '12 hours',
                'parameters' => ['FBS (mg/dl)'],
                'is_popular' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Lipid Profile',
                'slug' => 'lipid-profile',
                'description' => 'Complete lipid profile for cholesterol screening.',
                'category' => 'Lipid',
                'price' => 1200,
                'sample_type' => 'Blood',
                'preparation' => 'Fasting preferred',
                'duration' => '30 minutes',
                'fasting_required' => true,
                'home_collection' => true,
                'report_time' => '24 hours',
                'parameters' => ['Total Cholesterol', 'HDL', 'LDL', 'Triglycerides'],
                'is_popular' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Liver Function Test (LFT)',
                'slug' => 'lft',
                'description' => 'Complete liver function test panel.',
                'category' => 'Liver',
                'price' => 1500,
                'sample_type' => 'Blood',
                'preparation' => 'Fasting 12 hours',
                'duration' => '45 minutes',
                'fasting_required' => true,
                'home_collection' => true,
                'report_time' => '48 hours',
                'parameters' => ['ALT', 'AST', 'ALP', 'Bilirubin', 'Albumin', 'Total Protein'],
                'is_popular' => false,
                'is_active' => true,
            ],
            [
                'name' => 'Kidney Function Test (KFT)',
                'slug' => 'kft',
                'description' => 'Comprehensive kidney function test.',
                'category' => 'Renal',
                'price' => 1300,
                'sample_type' => 'Blood',
                'preparation' => 'No special preparation',
                'duration' => '30 minutes',
                'fasting_required' => false,
                'home_collection' => true,
                'report_time' => '24 hours',
                'parameters' => ['Urea', 'Creatinine', 'Uric Acid', 'Sodium', 'Potassium'],
                'is_popular' => false,
                'is_active' => true,
            ],
        ];

        foreach ($labTests as $test) {
            LabTest::create($test + [
                'includes' => $test['parameters'],
            ]);
        }
    }
}

