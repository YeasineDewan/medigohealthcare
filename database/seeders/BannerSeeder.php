<?php

namespace Database\Seeders;

use App\Models\Banner;
use Illuminate\Database\Seeder;

class BannerSeeder extends Seeder
{
    public function run(): void
    {
        $banners = [
            [
                'title' => 'Emergency Services 24/7',
                'subtitle' => 'Always Available',
                'description' => 'Get immediate medical help anytime.',
                'image' => 'banners/emergency.jpg',
                'background_color' => 'from-red-500 to-red-700',
                'cta_text' => 'Get Help Now',
                'cta_link' => '/emergency',
                'display_order' => 1,
                'active' => true,
                'type' => 'hero',
                'start_date' => now(),
                'end_date' => now()->addDays(30),
            ],
            [
                'title' => 'Top Doctors Available',
                'subtitle' => 'Verified Specialists',
                'description' => 'Book with verified specialists.',
                'image' => 'banners/doctors.jpg',
                'background_color' => 'from-blue-500 to-blue-700',
                'cta_text' => 'Find Doctors',
                'cta_link' => '/doctors',
                'display_order' => 2,
                'active' => true,
                'type' => 'promotional',
                'start_date' => now(),
                'end_date' => now()->addDays(30),
            ],
            [
                'title' => 'Lab Tests at Home',
                'subtitle' => 'Convenient Testing',
                'description' => 'Get lab tests done at your doorstep.',
                'image' => 'banners/lab-tests.jpg',
                'background_color' => 'from-green-500 to-green-700',
                'cta_text' => 'Book Test',
                'cta_link' => '/lab-tests',
                'display_order' => 3,
                'active' => true,
                'type' => 'promotional',
                'start_date' => now(),
                'end_date' => now()->addDays(30),
            ],
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }

        $this->command->info('Banners seeded successfully!');
    }
}
