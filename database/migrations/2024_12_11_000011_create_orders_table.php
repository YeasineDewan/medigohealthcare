<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique(); // Unique order identifier
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('patient_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('status', ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])->default('pending');
            $table->enum('payment_method', ['cash_on_delivery', 'online', 'card', 'mobile_banking']);
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->decimal('delivery_fee', 10, 2)->default(0);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->string('currency', 3)->default('BDT');
            $table->text('shipping_address');
            $table->string('shipping_city');
            $table->string('shipping_district');
            $table->string('shipping_postal_code')->nullable();
            $table->string('shipping_phone');
            $table->string('shipping_email')->nullable();
            $table->text('order_notes')->nullable();
            $table->text('admin_notes')->nullable();
            $table->dateTime('confirmed_at')->nullable();
            $table->dateTime('processed_at')->nullable();
            $table->dateTime('shipped_at')->nullable();
            $table->dateTime('delivered_at')->nullable();
            $table->dateTime('cancelled_at')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->string('tracking_number')->nullable();
            $table->string('courier_service')->nullable();
            $table->json('items'); // Order items
            $table->json('payment_details')->nullable(); // Payment transaction details
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Indexes
            $table->index(['user_id', 'status']);
            $table->index(['status', 'created_at']);
            $table->index('payment_status');
            $table->index('order_number');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
