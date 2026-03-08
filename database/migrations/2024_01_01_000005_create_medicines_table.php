<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('generic_name')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('category');
            $table->string('dosage_form');
            $table->string('strength');
            $table->string('manufacturer');
            $table->string('barcode')->nullable();
            $table->string('batch_number')->nullable();
            $table->date('purchase_date')->nullable();
            $table->date('expiry_date');
            $table->decimal('unit_price', 10, 2);
            $table->decimal('selling_price', 10, 2);
            $table->integer('current_stock');
            $table->integer('min_stock_level');
            $table->integer('max_stock_level');
            $table->integer('reorder_level');
            $table->string('unit');
            $table->text('description')->nullable();
            $table->text('indications')->nullable();
            $table->text('contraindications')->nullable();
            $table->text('side_effects')->nullable();
            $table->text('dosage_instructions')->nullable();
            $table->text('storage_conditions')->nullable();
            $table->boolean('prescription_required')->default(false);
            $table->boolean('controlled_substance')->default(false);
            $table->string('status')->default('Active');
            $table->string('supplier')->nullable();
            $table->string('image_url')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index(['name', 'generic_name', 'brand_name']);
            $table->index('category');
            $table->index('status');
            $table->index('barcode');
            $table->index('batch_number');
            $table->index('expiry_date');
        });
    }

    public function down()
    {
        Schema::dropIfExists('medicines');
    }
};
