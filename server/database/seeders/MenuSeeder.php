<?php

namespace Database\Seeders;

use App\Models\EmergencyService;
use App\Models\Service;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['title' => 'Specialist Doctor', 'slug' => 'specialist-doctor', 'icon' => 'stethoscope', 'route_url' => '/doctors', 'description' => 'Book appointments with specialists', 'sort_order' => 1],
            ['title' => 'Video Consultation', 'slug' => 'video-consultation', 'icon' => 'video', 'route_url' => '/consult', 'description' => 'Online video calls with doctors', 'sort_order' => 2],
            ['title' => 'Pharmacy', 'slug' => 'pharmacy', 'icon' => 'pill', 'route_url' => '/pharmacy', 'description' => 'Order medicines online', 'sort_order' => 3],
            ['title' => 'Lab Tests', 'slug' => 'lab-tests', 'icon' => 'flask', 'route_url' => '/lab-tests', 'description' => 'Home collection & reports', 'sort_order' => 4],
            ['title' => 'Health Records', 'slug' => 'health-records', 'icon' => 'folder', 'route_url' => '/records', 'description' => 'Your medical history', 'sort_order' => 5],
        ];

        foreach ($services as $s) {
            Service::updateOrCreate(['slug' => $s['slug']], $s);
        }

        $emergency = [
            ['title' => 'Ambulance Request', 'description' => 'Live Tracking', 'icon' => 'ambulance'],
            ['title' => 'Emergency Doctor', 'description' => '24/7 Available', 'icon' => 'phone-call'],
            ['title' => 'Blood Bank', 'description' => 'Find Donors', 'icon' => 'droplet'],
        ];

        foreach ($emergency as $e) {
            EmergencyService::updateOrCreate(
                ['title' => $e['title']],
                array_merge($e, ['bg_color_hex' => '#FEE2E2'])
            );
        }
    }
}
