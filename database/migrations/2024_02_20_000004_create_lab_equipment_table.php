<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lab_equipment', function (Blueprint $table) {
            $table->id();
            $table->string('equipment_id', 50)->unique();
            $table->string('name', 255);
            $table->string('model', 255)->nullable();
            $table->string('serial_number', 100)->unique();
            $table->string('manufacturer', 255)->nullable();
            $table->string('category', 100)->nullable();
            $table->string('location', 255)->nullable();
            $table->date('purchase_date')->nullable();
            $table->decimal('purchase_cost', 12, 2)->nullable();
            $table->date('warranty_expiry')->nullable();
            $table->enum('status', ['operational', 'maintenance', 'repair', 'retired'])->default('operational');
            $table->enum('condition', ['excellent', 'good', 'fair', 'poor'])->default('good');
            $table->date('last_calibration')->nullable();
            $table->date('next_calibration')->nullable();
            $table->date('last_maintenance')->nullable();
            $table->date('next_maintenance')->nullable();
            $table->integer('total_tests')->default(0);
            $table->decimal('uptime', 5, 2)->default(0); // Percentage
            $table->json('specifications')->nullable();
            $table->string('image', 255)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_equipment');
    }
};
