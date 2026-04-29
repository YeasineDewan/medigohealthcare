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
                'category_id' => 1, // Assuming category exists
                'test_type' => 'blood_test',
                'price' => 800.00,
                'preparation_instructions' => 'Fasting not required',
                'procedure_description' => 'Blood sample collection from vein',
                'normal_range' => 'Hemoglobin: 12-16 g/dL, WBC: 4,000-11,000 cells/μL',
                'abnormal_indications' => 'Anemia, infection, inflammation',
                'is_home_collection' => true,
                'home_collection_fee' => 100.00,
                'sample_collection_time' => 15,
                'result_time' => 24,
                'is_active' => true,
                'is_featured' => true,
                'sample_types' => ['Blood'],
                'parameters' => ['Hemoglobin', 'WBC', 'Platelets', 'RBC', 'Hematocrit'],
            ],
            [
                'name' => 'Blood Sugar (Fasting)',
                'slug' => 'blood-sugar-fasting',
                'description' => 'Fasting blood glucose test for diabetes screening.',
                'category_id' => 1,
                'test_type' => 'blood_test',
                'price' => 200.00,
                'preparation_instructions' => 'Fasting required for 8-12 hours',
                'procedure_description' => 'Blood sample collection from finger prick',
                'normal_range' => '70-100 mg/dL (fasting)',
                'abnormal_indications' => 'Diabetes, hypoglycemia',
                'is_home_collection' => true,
                'home_collection_fee' => 50.00,
                'sample_collection_time' => 5,
                'result_time' => 2,
                'is_active' => true,
                'is_featured' => false,
                'sample_types' => ['Blood'],
                'parameters' => ['Glucose'],
            ],
        ];

        foreach ($labTests as $labTestData) {
            LabTest::create($labTestData);
        }

        $this->command->info('Lab tests seeded successfully!');
    }
}
