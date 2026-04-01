<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    protected $model = Patient::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        $genders = ['Male', 'Female', 'Other'];
        $insuranceProviders = [
            'Blue Cross Blue Shield',
            'Aetna',
            'UnitedHealth',
            'Medicare',
            'Medicaid',
            'Cigna',
            'Humana'
        ];

        return [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'date_of_birth' => $this->faker->date('-18 years'),
            'gender' => $this->faker->randomElement($genders),
            'blood_type' => $this->faker->randomElement($bloodTypes),
            'age' => $this->faker->numberBetween(18, 80),
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->city,
            'state' => $this->faker->state,
            'zip_code' => $this->faker->postcode,
            'country' => 'USA',
            'emergency_contact_name' => $this->faker->name,
            'emergency_contact_phone' => $this->faker->phoneNumber,
            'primary_physician' => 'Dr. ' . $this->faker->name,
            'insurance_provider' => $this->faker->randomElement($insuranceProviders),
            'policy_number' => 'POL' . $this->faker->unique()->numerify('######'),
            'allergies' => json_encode($this->faker->randomElements([
                'Penicillin',
                'Peanuts',
                'Shellfish',
                'Latex',
                'Dust',
                'Pollen'
            ], 2)),
            'chronic_conditions' => json_encode($this->faker->randomElements([
                'Hypertension',
                'Diabetes Type 2',
                'Asthma',
                'COPD',
                'Heart Disease',
                'Arthritis',
                'Depression',
                'Anxiety'
            ], 2)),
            'medications' => json_encode($this->faker->randomElements([
                'Lisinopril',
                'Metformin',
                'Albuterol',
                'Aspirin',
                'Insulin',
                'Lipitor',
                'Prozac',
                'Zoloft'
            ], 2)),
            'status' => 'active',
            'registration_date' => $this->faker->date('-2 years'),
            'last_visit' => $this->faker->randomElement(['Not visited yet', $this->faker->date('-6 months')]),
            'outstanding_balance' => $this->faker->randomFloat(2, 0, 1000),
            'bmi' => $this->faker->randomFloat(1, 18, 35),
            'profile_image' => null,
        ];
    }
}
