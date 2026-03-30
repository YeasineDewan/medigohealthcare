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
                'description' => 'Get immediate medical help anytime.',
                'image' => 'banners/emergency.jpg',
                'link' => '/emergency',
                'is_active' => true,
                'position' => 1,
                'starts_at' => now(),
                'ends_at' => now()->addDays(30),
            ],
            [
                'title' => 'Top Doctors Available',
                'description' => 'Book with verified specialists.',
                'image' => 'banners/doctors.jpg',
                'link' => '/doctors',
                'is_active' => true,
                'position' => 2,
                'starts_at' => now(),
                'ends_at' => now()->addDays(60),
            ],
            [
                'title' => 'Lab Tests at Home',
                'description' => 'Home collection available for all tests.',
                'image' => 'banners/lab-tests.jpg',
                'link' => '/lab-tests',
                'is_active' => true,
                'position' => 3,
                'starts_at' => now(),
                'ends_at' => now()->addDays(45),
            ],
        ];

        foreach ($banners as $banner) {
            Banner::create($banner);
        }
    }
}

