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
                'description' => 'Pain reliever and fever reducer. Effective for mild to moderate pain relief.',
                'generic_name' => 'Paracetamol',
                'brand_name' => 'Paracare',
                'category_id' => 4, // Supplements category
                'manufacturer' => 'Health Plus',
                'sku' => 'PAR001',
                'barcode' => '1234567890123',
                'type' => 'medicine',
                'dosage_form' => 'tablet',
                'strength' => '500mg',
                'pack_size' => '10 tablets',
                'price' => 5.00,
                'original_price' => 6.00,
                'discount_percentage' => 16.67,
                'is_prescription_required' => false,
                'is_otc' => true,
                'stock_quantity' => 1000,
                'is_active' => true,
            ],
            [
                'name' => 'Amoxicillin 500mg',
                'slug' => 'amoxicillin-500mg',
                'description' => 'Antibiotic for bacterial infections. Broad-spectrum penicillin antibiotic.',
                'generic_name' => 'Amoxicillin',
                'brand_name' => 'Amoxil',
                'category_id' => 5, // Updated category ID
                'manufacturer' => 'Beximco Pharma',
                'sku' => 'AMX001',
                'barcode' => '1234567890124',
                'type' => 'medicine',
                'dosage_form' => 'capsule',
                'strength' => '500mg',
                'pack_size' => '20 capsules',
                'price' => 25.00,
                'original_price' => 30.00,
                'discount_percentage' => 16.67,
                'is_prescription_required' => true,
                'is_otc' => false,
                'stock_quantity' => 500,
                'is_active' => true,
            ],
            [
                'name' => 'Blood Pressure Monitor',
                'slug' => 'blood-pressure-monitor',
                'description' => 'Digital blood pressure monitor with automatic cuff inflation and large display.',
                'generic_name' => 'Digital BP Monitor',
                'brand_name' => 'Omron',
                'category_id' => 6, // Updated category ID
                'manufacturer' => 'Omron Healthcare',
                'sku' => 'BPM001',
                'barcode' => '1234567890125',
                'type' => 'medical_equipment',
                'dosage_form' => 'other',
                'strength' => null,
                'pack_size' => '1 unit',
                'price' => 150.00,
                'original_price' => 180.00,
                'discount_percentage' => 16.67,
                'is_prescription_required' => false,
                'is_otc' => true,
                'stock_quantity' => 100,
                'is_active' => true,
            ],
            [
                'name' => 'Vitamin C 500mg',
                'slug' => 'vitamin-c-500mg',
                'description' => 'Vitamin C supplement for immune system support and antioxidant protection.',
                'generic_name' => 'Ascorbic Acid',
                'brand_name' => 'VitaC',
                'category_id' => 4, // Assuming Supplements category exists
                'manufacturer' => 'Health Plus',
                'sku' => 'VIT001',
                'barcode' => '1234567890126',
                'type' => 'supplement',
                'dosage_form' => 'tablet',
                'strength' => '500mg',
                'pack_size' => '30 tablets',
                'price' => 8.00,
                'original_price' => 10.00,
                'discount_percentage' => 20.00,
                'is_prescription_required' => false,
                'is_otc' => true,
                'stock_quantity' => 2000,
                'is_active' => true,
            ],
        ];

        foreach ($products as $productData) {
            Product::create($productData);
        }

        $this->command->info('Products seeded successfully!');
    }
}
