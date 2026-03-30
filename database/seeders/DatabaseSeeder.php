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
            DoctorSeeder::class,
            ProductSeeder::class,
            LabTestSeeder::class,
            BannerSeeder::class,
            ServiceSeeder::class,
        ]);
    }
}
