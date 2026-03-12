<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lab_test_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 255);
            $table->string('code', 10)->unique();
            $table->text('description')->nullable();
            $table->string('department', 100)->nullable();
            $table->integer('tests_count')->default(0);
            $table->integer('active_tests')->default(0);
            $table->json('price_range')->nullable(); // {min: 25, max: 250}
            $table->string('avg_turnaround', 50)->nullable();
            $table->string('container_type', 100)->nullable();
            $table->string('volume', 50)->nullable();
            $table->text('instructions')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->boolean('requires_fasting')->default(false);
            $table->boolean('accredited')->default(false);
            $table->boolean('home_collection')->default(true);
            $table->string('reports_available', 100)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_test_categories');
    }
};
