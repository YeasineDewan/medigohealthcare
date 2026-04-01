<?php

namespace Database\Factories;

use App\Models\Appointment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    protected $model = Appointment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['consultation', 'follow_up', 'surgery', 'emergency'];
        $statuses = ['scheduled', 'confirmed', 'completed', 'cancelled'];
        $paymentStatuses = ['pending', 'paid', 'refunded'];

        return [
            'appointment_number' => 'APT' . now()->format('Ymd') . $this->faker->unique()->numerify('####'),
            'doctor_id' => $this->faker->numberBetween(1, 10),
            'patient_id' => $this->faker->numberBetween(1, 20),
            'appointment_date' => $this->faker->dateTimeBetween('-1 month', '+1 month'),
            'appointment_time' => $this->faker->dateTimeBetween('09:00', '17:00')->format('H:i'),
            'duration' => $this->faker->randomElement([15, 30, 45, 60, 90, 120]),
            'type' => $this->faker->randomElement($types),
            'status' => $this->faker->randomElement($statuses),
            'notes' => $this->faker->sentence,
            'consultation_fee' => $this->faker->randomFloat(2, 50, 500),
            'payment_status' => $this->faker->randomElement($paymentStatuses),
            'follow_up_date' => $this->faker->optional(0.7)->dateTimeBetween('+1 week', '+3 months'),
            'confirmed_at' => $this->faker->optional(0.6)->dateTime,
            'cancelled_at' => $this->faker->optional(0.2)->dateTime,
            'cancellation_reason' => $this->faker->optional(0.2)->sentence,
            'transaction_id' => $this->faker->optional(0.5)->unique()->numerify('TXN########'),
            'payment_date' => $this->faker->optional(0.4)->date,
            'payment_notes' => $this->faker->optional(0.3)->sentence,
        ];
    }
}
