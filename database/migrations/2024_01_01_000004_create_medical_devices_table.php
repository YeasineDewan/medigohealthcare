<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('medical_devices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('model');
            $table->string('category');
            $table->string('manufacturer');
            $table->string('barcode')->nullable();
            $table->string('serial_number')->nullable();
            $table->date('purchase_date')->nullable();
            $table->date('warranty_expiry')->nullable();
            $table->decimal('unit_price', 10, 2);
            $table->decimal('selling_price', 10, 2);
            $table->integer('current_stock');
            $table->integer('min_stock_level');
            $table->integer('max_stock_level');
            $table->integer('reorder_level');
            $table->string('unit');
            $table->text('description')->nullable();
            $table->text('specifications')->nullable();
            $table->text('features')->nullable();
            $table->string('power_source')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('weight')->nullable();
            $table->string('certification')->nullable();
            $table->string('status')->default('Active');
            $table->date('last_maintenance')->nullable();
            $table->date('next_maintenance')->nullable();
            $table->string('supplier')->nullable();
            $table->boolean('calibration_required')->default(false);
            $table->boolean('disposable')->default(false);
            $table->boolean('sterile')->default(false);
            $table->string('image_url')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['name', 'model']);
            $table->index('category');
            $table->index('status');
            $table->index('barcode');
            $table->index('serial_number');
        });
    }

    public function down()
    {
        Schema::dropIfExists('medical_devices');
    }
};
