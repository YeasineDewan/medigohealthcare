<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('doctor_applications', function (Blueprint $table) {
            $table->id();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->date('date_of_birth')->nullable();
            $table->string('gender')->nullable();
            $table->string('specialization');
            $table->string('sub_specialization')->nullable();
            $table->integer('experience_years');
            $table->string('qualification');
            $table->string('post_graduation')->nullable();
            $table->string('bmdc_number')->unique();
            $table->date('bmdc_registration_date');
            $table->string('current_hospital')->nullable();
            $table->string('designation')->nullable();
            $table->decimal('consultation_fee', 10, 2)->nullable();
            $table->decimal('online_consultation_fee', 10, 2)->nullable();
            
            // JSON fields for complex data
            $table->json('availability')->nullable(); // Schedule availability
            $table->json('languages')->nullable(); // Languages spoken
            $table->json('services')->nullable(); // Services offered
            $table->json('achievements')->nullable(); // Professional achievements
            $table->json('publications')->nullable(); // Publications list
            $table->json('memberships')->nullable(); // Professional memberships
            $table->json('bank_account')->nullable(); // Bank details
            $table->json('emergency_contact')->nullable(); // Emergency contact
            $table->json('social_links')->nullable(); // Social media links
            $table->json('preferences')->nullable(); // Consultation preferences
            
            // File uploads
            $table->string('profile_photo_path')->nullable();
            $table->json('certificates_paths')->nullable(); // Array of certificate file paths
            $table->string('identity_document_path')->nullable();
            
            // Text fields
            $table->text('about')->nullable();
            
            // Status and tracking
            $table->enum('status', ['pending', 'under_review', 'approved', 'rejected', 'needs_more_info'])->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->text('admin_notes')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->nullOnDelete();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'created_at']);
            $table->index('bmdc_number');
            $table->index('specialization');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('doctor_applications');
    }
};
