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
                'title' => 'General Consultation',
                'slug' => 'general-consultation',
                'icon' => 'stethoscope',
                'icon_svg' => '<svg>...</svg>',
                'route_url' => '/consultation',
                'description' => 'General health checkup and consultation.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Emergency Care',
                'slug' => 'emergency-care',
                'icon' => 'ambulance',
                'icon_svg' => '<svg>...</svg>',
                'route_url' => '/emergency',
                'description' => '24/7 emergency medical services.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Video Consultation',
                'slug' => 'video-consultation',
                'icon' => 'video',
                'icon_svg' => '<svg>...</svg>',
                'route_url' => '/video-consultation',
                'description' => 'Consult with doctors remotely via video.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Lab Tests',
                'slug' => 'lab-tests',
                'icon' => 'test-tube',
                'icon_svg' => '<svg>...</svg>',
                'route_url' => '/lab-tests',
                'description' => 'Comprehensive laboratory testing services.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Pharmacy',
                'slug' => 'pharmacy',
                'icon' => 'pill',
                'icon_svg' => '<svg>...</svg>',
                'route_url' => '/pharmacy',
                'description' => 'Medicines and medical supplies.',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }

        $this->command->info('Services seeded successfully!');
    }
}
