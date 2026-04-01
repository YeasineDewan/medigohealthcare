<?php

namespace Database\Factories;

use App\Models\MedicalRecord;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalRecord>
 */
class MedicalRecordFactory extends Factory
{
    protected $model = MedicalRecord::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $diagnoses = [
            'Hypertension',
            'Diabetes Type 2',
            'Asthma',
            'COPD',
            'Heart Disease',
            'Pneumonia',
            'Influenza',
            'COVID-19',
            'Migraine',
            'Arthritis',
            'Depression',
            'Anxiety',
            'High Cholesterol',
            'Gastroenteritis',
            'Kidney Disease'
        ];

        $treatments = [
            'Prescribed medication and lifestyle changes',
            'Recommended dietary modifications',
            'Physical therapy recommended',
            'Surgical intervention required',
            'Conservative management with monitoring',
            'Referral to specialist',
            'Emergency treatment provided',
            'Outpatient follow-up scheduled'
        ];

        return [
            'patient_id' => $this->faker->numberBetween(1, 20),
            'doctor_id' => $this->faker->numberBetween(1, 10),
            'record_number' => 'MR' . now()->format('Ymd') . $this->faker->unique()->numerify('####'),
            'visit_date' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'diagnosis' => $this->faker->randomElement($diagnoses),
            'treatment' => $this->faker->randomElement($treatments),
            'symptoms' => $this->faker->sentence(10),
            'notes' => $this->faker->paragraph,
            'vital_signs' => json_encode([
                [
                    'type' => 'Blood Pressure',
                    'value' => $this->faker->randomElement(['120/80', '130/85', '140/90']),
                    'unit' => 'mmHg',
                    'normal_range' => '120/80'
                ],
                [
                    'type' => 'Heart Rate',
                    'value' => $this->faker->numberBetween(60, 100),
                    'unit' => 'bpm',
                    'normal_range' => '60-100'
                ],
                [
                    'type' => 'Temperature',
                    'value' => $this->faker->randomFloat(1, 97.0, 99.0),
                    'unit' => 'F',
                    'normal_range' => '97-99'
                ],
                [
                    'type' => 'Respiratory Rate',
                    'value' => $this->faker->numberBetween(12, 20),
                    'unit' => 'breaths/min',
                    'normal_range' => '12-20'
                ],
                [
                    'type' => 'Oxygen Saturation',
                    'value' => $this->faker->numberBetween(95, 100),
                    'unit' => '%',
                    'normal_range' => '95-100'
                ]
            ]),
            'prescriptions' => json_encode([
                [
                    'medication' => $this->faker->randomElement([
                        'Lisinopril',
                        'Metformin',
                        'Albuterol',
                        'Aspirin',
                        'Insulin',
                        'Lipitor',
                        'Prozac',
                        'Zoloft',
                        'Amoxicillin',
                        'Ibuprofen'
                    ]),
                    'dosage' => $this->faker->randomElement(['5mg', '10mg', '20mg', '50mg', '100mg']),
                    'duration' => $this->faker->randomElement(['7 days', '14 days', '30 days', '90 days', 'indefinite'])
                ]
            ]),
            'lab_results' => json_encode([
                [
                    'test' => $this->faker->randomElement([
                        'Complete Blood Count',
                        'Comprehensive Metabolic Panel',
                        'Lipid Panel',
                        'Thyroid Panel',
                        'Blood Glucose',
                        'ECG',
                        'X-Ray',
                        'MRI',
                        'CT Scan',
                        'Ultrasound'
                    ]),
                    'result' => $this->faker->randomElement(['Normal', 'Elevated', 'Low', 'Borderline']),
                    'date' => $this->faker->date('-1 month')
                ]
            ]),
            'follow_up_date' => $this->faker->optional(0.7)->dateTimeBetween('+1 week', '+3 months'),
            'status' => 'completed',
        ];
    }
}
