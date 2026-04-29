<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hospital_applications', function (Blueprint $table) {
            $table->id();
            
            // Basic hospital information
            $table->string('hospital_name');
            $table->enum('hospital_type', ['government', 'private', 'non_profit', 'specialty']);
            $table->integer('established_year')->nullable();
            $table->string('registration_number')->unique();
            
            // Contact information
            $table->string('contact_person_name');
            $table->string('contact_person_designation');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('alternate_phone')->nullable();
            
            // Address
            $table->text('address');
            $table->string('city');
            $table->string('district');
            $table->string('postal_code')->nullable();
            
            // Capacity
            $table->integer('total_beds');
            $table->integer('icu_beds')->default(0);
            $table->integer('emergency_beds')->default(0);
            
            // JSON fields for complex data
            $table->json('emergency_services')->nullable(); // Emergency services offered
            $table->json('specializations')->nullable(); // Medical specializations
            $table->json('departments')->nullable(); // Hospital departments
            $table->json('facilities')->nullable(); // Hospital facilities
            $table->json('medical_equipment')->nullable(); // Medical equipment list
            $table->json('social_media')->nullable(); // Social media links
            $table->json('achievements')->nullable(); // Hospital achievements
            $table->json('awards')->nullable(); // Awards and recognition
            $table->json('accreditations')->nullable(); // Accreditations
            $table->json('partnerships')->nullable(); // Existing partnerships
            $table->json('bank_details')->nullable(); // Bank account details
            $table->json('emergency_contact')->nullable(); // Emergency contact
            $table->json('technical_contact')->nullable(); // Technical contact
            $table->json('services_offered')->nullable(); // Services matrix
            $table->json('integration_capabilities')->nullable(); // HIS/EMR integration
            
            // Text fields
            $table->string('website')->nullable();
            $table->text('about')->nullable();
            $table->text('mission')->nullable();
            $table->text('vision')->nullable();
            
            // File uploads
            $table->json('documents_paths')->nullable(); // Array of document file paths
            
            // Status and tracking
            $table->enum('status', ['pending', 'under_review', 'approved', 'rejected', 'needs_more_info', 'site_visit_required'])->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('site_visit_scheduled_at')->nullable();
            $table->foreignId('site_visit_conducted_by')->nullable()->constrained('users')->nullOnDelete();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'created_at']);
            $table->index('hospital_type');
            $table->index('city');
            $table->index('district');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hospital_applications');
    }
};
