<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pharmacy_order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pharmacy_order_id')->constrained()->onDelete('cascade');
            $table->foreignId('medical_device_id')->nullable()->constrained();
            $table->foreignId('medicine_id')->nullable()->constrained();
            $table->string('name');
            $table->string('type'); // 'medical_device' or 'medicine'
            $table->integer('quantity');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('total_price', 10, 2);
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->index('pharmacy_order_id');
            $table->index('medical_device_id');
            $table->index('medicine_id');
            $table->index('type');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pharmacy_order_items');
    }
};
