<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hospitals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('type', ['government', 'private', 'non_profit', 'specialty']);
            $table->string('registration_number')->unique();
            $table->integer('established_year');
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('banner_image')->nullable();
            $table->text('address');
            $table->string('city');
            $table->string('district');
            $table->string('postal_code')->nullable();
            $table->string('phone');
            $table->string('email')->unique();
            $table->string('website')->nullable();
            $table->json('social_media')->nullable(); // Facebook, Twitter, LinkedIn, etc.
            $table->json('facilities')->nullable(); // List of facilities
            $table->json('specializations')->nullable(); // Medical specializations
            $table->json('departments')->nullable(); // Hospital departments
            $table->json('services')->nullable(); // Services offered
            $table->json('equipment')->nullable(); // Medical equipment
            $table->integer('total_beds');
            $table->integer('icu_beds')->default(0);
            $table->integer('emergency_beds')->default(0);
            $table->json('emergency_services')->nullable(); // 24/7 emergency services
            $table->json('accreditations')->nullable(); // Accreditations and certifications
            $table->json('awards')->nullable(); // Awards and recognition
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('review_count')->default(0);
            $table->json('working_hours')->nullable(); // Opening hours
            $table->string('contact_person')->nullable();
            $table->string('contact_person_designation')->nullable();
            $table->enum('status', ['active', 'inactive', 'pending'])->default('active');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index(['type', 'status']);
            $table->index(['city', 'district']);
            $table->index('is_featured');
            $table->index('is_verified');
            $table->index('rating');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hospitals');
    }
};
