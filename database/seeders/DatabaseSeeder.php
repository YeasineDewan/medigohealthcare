<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            MenuSeeder::class,
            UserSeeder::class,
            PatientSeeder::class,
            DoctorSeeder::class,
            HospitalSeeder::class,
            ProductCategorySeeder::class,
            // ProductSeeder::class, // Temporarily disabled due to categories table issue
            // LabTestSeeder::class, // Temporarily disabled
            OrderSeeder::class,
            BannerSeeder::class,
            // ServiceSeeder::class, // Already seeded
            NoticeSeeder::class,
        ]);
    }
}
