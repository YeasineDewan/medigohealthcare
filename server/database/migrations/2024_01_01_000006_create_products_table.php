<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('slug', 255)->unique();
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->string('sku', 100)->unique()->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('discount_price', 10, 2)->nullable();
            $table->integer('stock_quantity')->default(0);
            $table->string('category', 100)->nullable();
            $table->string('manufacturer', 255)->nullable();
            $table->json('images')->nullable();
            $table->string('prescription_required', 20)->default('no'); // no, yes, optional
            $table->text('ingredients')->nullable();
            $table->text('usage_instructions')->nullable();
            $table->text('side_effects')->nullable();
            $table->integer('rating')->default(0);
            $table->integer('total_reviews')->default(0);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
