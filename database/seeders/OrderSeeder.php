<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Models\Product;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'patient')->get();
        $products = Product::all();

        if ($users->isEmpty() || $products->isEmpty()) {
            $this->command->warn('Users or products not found. Please run UserSeeder and ProductSeeder first.');
            return;
        }

        $orders = [
            [
                'user_id' => $users->random()->id,
                'order_number' => 'ORD-' . date('Ymd') . '001',
                'status' => 'delivered',
                'payment_status' => 'paid',
                'payment_method' => 'online',
                'currency' => 'BDT',
                'subtotal' => 2500.00,
                'tax_amount' => 125.00,
                'shipping_fee' => 50.00,
                'discount_amount' => 0.00,
                'total_amount' => 2675.00,
                'shipping_address' => '123 Main Street, Dhanmondi, Dhaka',
                'shipping_city' => 'Dhaka',
                'shipping_postal_code' => '1209',
                'shipping_country' => 'Bangladesh',
                'billing_address' => '123 Main Street, Dhanmondi, Dhaka',
                'billing_city' => 'Dhaka',
                'billing_postal_code' => '1209',
                'billing_country' => 'Bangladesh',
                'notes' => 'Please deliver after 6 PM',
                'ordered_at' => now()->subDays(5),
                'confirmed_at' => now()->subDays(5)->addMinutes(30),
                'processed_at' => now()->subDays(5)->addHours(2),
                'shipped_at' => now()->subDays(4),
                'delivered_at' => now()->subDays(3),
                'payment_completed_at' => now()->subDays(5)->addMinutes(15),
                'items' => [
                    ['product_id' => 1, 'quantity' => 2, 'unit_price' => 500.00],
                    ['product_id' => 2, 'quantity' => 1, 'unit_price' => 1500.00],
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'order_number' => 'ORD-' . date('Ymd') . '002',
                'status' => 'processing',
                'payment_status' => 'paid',
                'payment_method' => 'mobile_banking',
                'currency' => 'BDT',
                'subtotal' => 3200.00,
                'tax_amount' => 160.00,
                'shipping_fee' => 60.00,
                'discount_amount' => 100.00,
                'total_amount' => 3320.00,
                'shipping_address' => '456 Park Avenue, Gulshan, Dhaka',
                'shipping_city' => 'Dhaka',
                'shipping_postal_code' => '1213',
                'shipping_country' => 'Bangladesh',
                'billing_address' => '456 Park Avenue, Gulshan, Dhaka',
                'billing_city' => 'Dhaka',
                'billing_postal_code' => '1213',
                'billing_country' => 'Bangladesh',
                'notes' => 'Handle with care - fragile items',
                'ordered_at' => now()->subDays(2),
                'confirmed_at' => now()->subDays(2)->addMinutes(45),
                'processed_at' => now()->subDays(1),
                'payment_completed_at' => now()->subDays(2)->addMinutes(20),
                'items' => [
                    ['product_id' => 3, 'quantity' => 1, 'unit_price' => 2200.00],
                    ['product_id' => 4, 'quantity' => 2, 'unit_price' => 500.00],
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'order_number' => 'ORD-' . date('Ymd') . '003',
                'status' => 'pending',
                'payment_status' => 'pending',
                'payment_method' => 'cash',
                'currency' => 'BDT',
                'subtotal' => 1800.00,
                'tax_amount' => 90.00,
                'shipping_fee' => 40.00,
                'discount_amount' => 0.00,
                'total_amount' => 1930.00,
                'shipping_address' => '789 Business Road, Banani, Dhaka',
                'shipping_city' => 'Dhaka',
                'shipping_postal_code' => '1213',
                'shipping_country' => 'Bangladesh',
                'billing_address' => '789 Business Road, Banani, Dhaka',
                'billing_city' => 'Dhaka',
                'billing_postal_code' => '1213',
                'billing_country' => 'Bangladesh',
                'notes' => 'Call before delivery',
                'ordered_at' => now()->subHours(6),
                'items' => [
                    ['product_id' => 5, 'quantity' => 1, 'unit_price' => 1200.00],
                    ['product_id' => 6, 'quantity' => 1, 'unit_price' => 600.00],
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'order_number' => 'ORD-' . date('Ymd') . '004',
                'status' => 'shipped',
                'payment_status' => 'paid',
                'payment_method' => 'card',
                'currency' => 'BDT',
                'subtotal' => 4500.00,
                'tax_amount' => 225.00,
                'shipping_fee' => 80.00,
                'discount_amount' => 200.00,
                'total_amount' => 4605.00,
                'shipping_address' => '321 College Road, Mirpur, Dhaka',
                'shipping_city' => 'Dhaka',
                'shipping_postal_code' => '1216',
                'shipping_country' => 'Bangladesh',
                'billing_address' => '321 College Road, Mirpur, Dhaka',
                'billing_city' => 'Dhaka',
                'billing_postal_code' => '1216',
                'billing_country' => 'Bangladesh',
                'notes' => 'Express delivery requested',
                'ordered_at' => now()->subDays(1),
                'confirmed_at' => now()->subDays(1)->addMinutes(30),
                'processed_at' => now()->subDays(1)->addHours(1),
                'shipped_at' => now()->subHours(12),
                'payment_completed_at' => now()->subDays(1)->addMinutes(10),
                'items' => [
                    ['product_id' => 7, 'quantity' => 2, 'unit_price' => 1500.00],
                    ['product_id' => 8, 'quantity' => 1, 'unit_price' => 1500.00],
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'order_number' => 'ORD-' . date('Ymd') . '005',
                'status' => 'cancelled',
                'payment_status' => 'refunded',
                'payment_method' => 'online',
                'currency' => 'BDT',
                'subtotal' => 900.00,
                'tax_amount' => 45.00,
                'shipping_fee' => 30.00,
                'discount_amount' => 0.00,
                'total_amount' => 975.00,
                'shipping_address' => '654 Industrial Area, Tejgaon, Dhaka',
                'shipping_city' => 'Dhaka',
                'shipping_postal_code' => '1208',
                'shipping_country' => 'Bangladesh',
                'billing_address' => '654 Industrial Area, Tejgaon, Dhaka',
                'billing_city' => 'Dhaka',
                'billing_postal_code' => '1208',
                'billing_country' => 'Bangladesh',
                'notes' => 'Customer requested cancellation',
                'ordered_at' => now()->subDays(3),
                'cancelled_at' => now()->subDays(3)->addHours(2),
                'cancellation_reason' => 'Customer requested cancellation',
                'payment_completed_at' => now()->subDays(3)->addMinutes(5),
                'refunded_at' => now()->subDays(3)->addHours(3),
                'items' => [
                    ['product_id' => 9, 'quantity' => 1, 'unit_price' => 900.00],
                ]
            ],
            [
                'user_id' => $users->random()->id,
                'order_number' => 'ORD-' . date('Ymd') . '006',
                'status' => 'confirmed',
                'payment_status' => 'paid',
                'payment_method' => 'mobile_banking',
                'currency' => 'BDT',
                'subtotal' => 5600.00,
                'tax_amount' => 280.00,
                'shipping_fee' => 100.00,
                'discount_amount' => 300.00,
                'total_amount' => 5680.00,
                'shipping_address' => '987 Health Street, Mohammadpur, Dhaka',
                'shipping_city' => 'Dhaka',
                'shipping_postal_code' => '1207',
                'shipping_country' => 'Bangladesh',
                'billing_address' => '987 Health Street, Mohammadpur, Dhaka',
                'billing_city' => 'Dhaka',
                'billing_postal_code' => '1207',
                'billing_country' => 'Bangladesh',
                'notes' => 'Bulk order - please verify all items',
                'ordered_at' => now()->subHours(12),
                'confirmed_at' => now()->subHours(10),
                'payment_completed_at' => now()->subHours(11),
                'items' => [
                    ['product_id' => 10, 'quantity' => 3, 'unit_price' => 1200.00],
                    ['product_id' => 11, 'quantity' => 2, 'unit_price' => 1000.00],
                ]
            ],
        ];

        foreach ($orders as $orderData) {
            $items = $orderData['items'];
            unset($orderData['items']);

            $order = Order::create($orderData);

            // Create order items
            foreach ($items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                ]);

                // Update product stock
                $product = Product::find($item['product_id']);
                if ($product) {
                    $product->decrement('stock_quantity', $item['quantity']);
                }
            }
        }

        $this->command->info('Orders seeded successfully!');
    }
}
