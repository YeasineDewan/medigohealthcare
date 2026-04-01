<?php

namespace Database\Factories;

use App\Models\Doctor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    protected $model = Doctor::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $specializations = [
            'Cardiology',
            'Neurology',
            'Orthopedics',
            'Pediatrics',
            'General Practice',
            'Internal Medicine',
            'Surgery',
            'Dermatology',
            'Psychiatry',
            'Radiology'
        ];

        $departments = [
            'Cardiology',
            'Neurology',
            'Orthopedics',
            'Pediatrics',
            'Emergency Medicine',
            'Internal Medicine',
            'Surgery',
            'Dermatology',
            'Psychiatry',
            'Radiology'
        ];

        return [
            'name' => 'Dr. ' . $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'specialization' => $this->faker->randomElement($specializations),
            'department' => $this->faker->randomElement($departments),
            'experience' => $this->faker->numberBetween(1, 30),
            'education' => json_encode([
                [
                    'degree' => $this->faker->randomElement(['MD', 'DO', 'MBBS']),
                    'university' => $this->faker->randomElement([
                        'Harvard Medical School',
                        'Johns Hopkins University',
                        'Mayo Clinic College of Medicine',
                        'Stanford University School of Medicine',
                        'Yale School of Medicine'
                    ]),
                    'year' => $this->faker->year('-10 years')
                ]
            ]),
            'license_number' => 'MD' . $this->faker->unique()->numerify('######'),
            'consultation_fee' => $this->faker->numberBetween(50, 500),
            'languages' => json_encode($this->faker->randomElements([
                'English',
                'Spanish',
                'French',
                'German',
                'Chinese',
                'Arabic'
            ], 2)),
            'profile_image' => null,
            'status' => 'active',
            'join_date' => $this->faker->date('-5 years'),
            'patients' => $this->faker->numberBetween(0, 200),
            'appointments' => $this->faker->numberBetween(0, 1000),
            'availability' => $this->faker->randomElement(['Available', 'Busy', 'On Leave']),
            'rating' => $this->faker->randomFloat(1, 3.0, 5.0),
            'awards' => json_encode($this->faker->randomElements([
                'Best Doctor 2023',
                'Research Excellence Award',
                'Patient Choice Award',
                'Teaching Excellence Award',
                'Clinical Innovation Award'
            ], 2)),
            'available_slots' => json_encode([
                [
                    'day' => 'Monday',
                    'time' => '09:00-17:00'
                ],
                [
                    'day' => 'Wednesday',
                    'time' => '09:00-17:00'
                ],
                [
                    'day' => 'Friday',
                    'time' => '09:00-17:00'
                ]
            ]),
        ];
    }
}
