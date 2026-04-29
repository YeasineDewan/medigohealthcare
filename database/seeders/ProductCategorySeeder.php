<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Pain Relief',
                'slug' => 'pain-relief',
                'description' => 'Medications for pain relief and fever reduction',
                'parent_id' => null,
                'display_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Antibiotics',
                'slug' => 'antibiotics',
                'description' => 'Antibiotic medications for bacterial infections',
                'parent_id' => null,
                'display_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Medical Equipment',
                'slug' => 'medical-equipment',
                'description' => 'Medical devices and monitoring equipment',
                'parent_id' => null,
                'display_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Supplements',
                'slug' => 'supplements',
                'description' => 'Vitamins, minerals, and dietary supplements',
                'parent_id' => null,
                'display_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'First Aid',
                'slug' => 'first-aid',
                'description' => 'First aid supplies and emergency medical items',
                'parent_id' => null,
                'display_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $categoryData) {
            ProductCategory::create($categoryData);
        }

        $this->command->info('Product categories seeded successfully!');
    }
}
