<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lab_tests', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('slug', 255)->unique();
            $table->text('description')->nullable();
            $table->string('category', 100)->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('discount_price', 10, 2)->nullable();
            $table->string('sample_type', 100)->nullable(); // Blood, Urine, etc.
            $table->string('preparation', 255)->nullable();
            $table->string('duration', 50)->nullable();
            $table->string('fasting_required', 50)->nullable();
            $table->boolean('home_collection')->default(true);
            $table->string('report_time', 100)->nullable();
            $table->json('parameters')->nullable(); // Test parameters
            $table->text('includes')->nullable();
            $table->text('why_test')->nullable();
            $table->boolean('is_popular')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_tests');
    }
};
