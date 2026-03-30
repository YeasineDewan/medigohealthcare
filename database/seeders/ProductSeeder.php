<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Paracetamol 500mg',
                'slug' => 'paracetamol-500mg',
                'description' => 'Pain reliever and fever reducer.',
                'short_description' => 'Paracetamol tablet for pain & fever.',
                'sku' => 'PAR001',
                'price' => 5.00,
                'category' => 'Pain Relief',
                'manufacturer' => 'Square Pharma',
                'images' => ['products/paracetamol.jpg'],
                'prescription_required' => false,
                'stock_quantity' => 1000,
                'is_active' => true,
            ],
            [
                'name' => 'Amoxicillin 500mg',
                'slug' => 'amoxicillin-500mg',
                'description' => 'Antibiotic for bacterial infections.',
                'short_description' => 'Amoxicillin capsule.',
                'sku' => 'AMO001',
                'price' => 12.00,
                'category' => 'Antibiotics',
                'manufacturer' => 'Beximco Pharma',
                'images' => ['products/amoxicillin.jpg'],
                'prescription_required' => true,
                'stock_quantity' => 500,
                'is_active' => true,
            ],
            // Add 18 more products... 
            // Examples: Insulin, Blood Pressure meds, Vitamins, etc.
            [
                'name' => 'Vitamin D3 1000IU',
                'slug' => 'vitamin-d3-1000iu',
                'description' => 'Vitamin D supplement for bone health.',
                'short_description' => 'Vitamin D3 softgel.',
                'sku' => 'VIT001',
                'price' => 8.00,
                'category' => 'Vitamins',
                'manufacturer' => 'Acme Pharma',
                'images' => ['products/vitamin-d.jpg'],
                'prescription_required' => false,
                'stock_quantity' => 800,
                'is_active' => true,
            ],
            // ... 
        ];

        foreach ($products as $product) {
            Product::create($product + [
                'rating' => rand(35, 50) / 10,
                'total_reviews' => rand(5, 30),
            ]);
        }
    }
}

