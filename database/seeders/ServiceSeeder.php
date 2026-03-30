<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'General Consultation',
                'description' => 'General health checkup and consultation.',
                'price' => 1000,
                'duration' => 30,
                'category' => 'Consultation',
                'is_active' => true,
            ],
            [
                'name' => 'Emergency Care',
                'description' => '24/7 emergency medical services.',
                'price' => 2500,
                'duration' => 60,
                'category' => 'Emergency',
                'is_active' => true,
            ],
            [
                'name' => 'Video Consultation',
                'description' => 'Online video consultation with doctors.',
                'price' => 800,
                'duration' => 20,
                'category' => 'Telemedicine',
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}

