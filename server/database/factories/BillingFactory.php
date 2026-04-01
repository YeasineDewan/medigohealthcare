<?php

namespace Database\Factories;

use App\Models\Billing;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Billing>
 */
class BillingFactory extends Factory
{
    protected $model = Billing::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $services = [
            'Consultation Fee',
            'Lab Tests',
            'Imaging',
            'Vaccination',
            'Procedure',
            'Emergency Room Visit',
            'Follow-up Visit',
            'Specialist Consultation',
            'Physical Therapy',
            'Medical Supplies'
        ];

        $descriptions = [
            'Routine checkup and consultation',
            'Specialist consultation for chronic condition',
            'Emergency room visit with evaluation',
            'Surgical procedure consultation',
            'Follow-up appointment for ongoing treatment',
            'Mental health evaluation session',
            'Preventive care visit and screening',
            'Diagnostic imaging and interpretation',
            'Laboratory testing and analysis',
            'Physical therapy session'
        ];

        $paymentMethods = ['card', 'cash', 'check', 'insurance', 'online'];
        $statuses = ['pending', 'paid', 'overdue', 'refunded', 'partial'];

        $amount = $this->faker->randomFloat(2, 50, 2000);
        $taxAmount = $amount * 0.1; // 10% tax
        $discountAmount = $this->faker->randomFloat(2, 0, 100);
        $totalAmount = $amount + $taxAmount - $discountAmount;

        return [
            'patient_id' => $this->faker->numberBetween(1, 20),
            'doctor_id' => $this->faker->numberBetween(1, 10),
            'appointment_id' => $this->faker->numberBetween(1, 50),
            'bill_number' => 'BILL' . now()->format('Ymd') . $this->faker->unique()->numerify('####'),
            'amount' => $amount,
            'description' => $this->faker->randomElement($descriptions),
            'status' => $this->faker->randomElement($statuses),
            'due_date' => $this->faker->dateTimeBetween('+1 week', '+3 months'),
            'payment_method' => $this->faker->randomElement($paymentMethods),
            'insurance_claim_number' => 'INS' . $this->faker->unique()->numerify('######'),
            'services' => json_encode([$this->faker->randomElement($services)]),
            'tax_amount' => $taxAmount,
            'discount_amount' => $discountAmount,
            'total_amount' => $totalAmount,
            'transaction_id' => $this->faker->optional(0.6)->unique()->numerify('TXN########'),
            'payment_date' => $this->faker->optional(0.5)->date('-1 month'),
            'payment_notes' => $this->faker->optional(0.3)->sentence,
        ];
    }
}
