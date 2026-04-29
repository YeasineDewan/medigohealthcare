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
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->enum('test_type', ['blood_test', 'urine_test', 'imaging', 'biopsy', 'genetic', 'other']);
            $table->text('preparation_instructions')->nullable();
            $table->text('procedure_description')->nullable();
            $table->text('normal_range')->nullable(); // Normal reference range
            $table->text('abnormal_indications')->nullable(); // What abnormal results indicate
            $table->decimal('price', 10, 2);
            $table->decimal('discount_price', 10, 2)->nullable();
            $table->boolean('is_home_collection')->default(false);
            $table->decimal('home_collection_fee', 10, 2)->default(0);
            $table->integer('sample_collection_time')->nullable(); // Minutes required
            $table->integer('result_time')->nullable(); // Hours/days for results
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->json('required_preparations')->nullable(); // Fasting, no medication, etc.
            $table->json('sample_types')->nullable(); // Blood, urine, tissue, etc.
            $table->json('parameters')->nullable(); // Parameters measured
            $table->json('images')->nullable(); // Test images
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('review_count')->default(0);
            $table->integer('booking_count')->default(0);
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Indexes
            $table->index(['category_id', 'is_active']);
            $table->index(['test_type', 'is_active']);
            $table->index('is_featured');
            $table->index('price');
            $table->index('is_home_collection');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_tests');
    }
};
