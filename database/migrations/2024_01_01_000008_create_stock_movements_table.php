<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->morphs('stockable'); // medical_device or medicine
            $table->string('type'); // 'in', 'out', 'adjustment'
            $table->integer('quantity');
            $table->integer('previous_stock');
            $table->integer('new_stock');
            $table->string('reason');
            $table->text('notes')->nullable();
            $table->foreignId('user_id')->constrained();
            $table->datetime('movement_date');
            $table->timestamps();
            
            $table->index(['stockable_type', 'stockable_id']);
            $table->index('type');
            $table->index('movement_date');
            $table->index('user_id');
        });
    }

    public function down()
    {
        Schema::dropIfExists('stock_movements');
    }
};
