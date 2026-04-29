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
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('generic_name')->nullable();
            $table->string('brand_name');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('manufacturer')->nullable();
            $table->string('sku')->unique(); // Stock keeping unit
            $table->string('barcode')->nullable();
            $table->enum('type', ['medicine', 'medical_equipment', 'supplement', 'personal_care']);
            $table->enum('dosage_form', ['tablet', 'capsule', 'syrup', 'injection', 'ointment', 'cream', 'drops', 'spray', 'patch', 'other']);
            $table->string('strength')->nullable(); // e.g., "500mg", "100ml"
            $table->string('pack_size')->nullable(); // e.g., "10 tablets", "100ml bottle"
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->decimal('discount_percentage', 5, 2)->default(0);
            $table->boolean('is_prescription_required')->default(false);
            $table->boolean('is_otc')->default(false); // Over the counter
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('stock_quantity')->default(0);
            $table->integer('min_stock_level')->default(10);
            $table->integer('max_stock_level')->default(1000);
            $table->json('ingredients')->nullable(); // Active ingredients
            $table->json('indications')->nullable(); // Usage indications
            $table->json('contraindications')->nullable(); // When not to use
            $table->json('side_effects')->nullable(); // Possible side effects
            $table->json('dosage_instructions')->nullable(); // How to use
            $table->json('storage_instructions')->nullable(); // Storage requirements
            $table->text('warnings')->nullable(); // Important warnings
            $table->date('expiry_date')->nullable();
            $table->string('batch_number')->nullable();
            $table->date('manufacture_date')->nullable();
            $table->json('images')->nullable(); // Product images
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('review_count')->default(0);
            $table->integer('sales_count')->default(0);
            $table->json('seo_keywords')->nullable();
            $table->text('meta_description')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();
            
            // Indexes
            $table->index(['category_id', 'is_active']);
            $table->index(['type', 'is_active']);
            $table->index('is_featured');
            $table->index('is_prescription_required');
            $table->index('price');
            $table->index('rating');
            $table->index('sales_count');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
