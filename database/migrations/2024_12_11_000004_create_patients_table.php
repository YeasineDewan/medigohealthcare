<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('patient_id')->unique(); // Unique patient identifier
            $table->string('blood_group')->nullable();
            $table->enum('gender', ['male', 'female', 'other']);
            $table->date('date_of_birth');
            $table->string('phone');
            $table->string('alternate_phone')->nullable();
            $table->text('address');
            $table->string('city');
            $table->string('postal_code')->nullable();
            $table->string('emergency_contact_name');
            $table->string('emergency_contact_phone');
            $table->string('emergency_contact_relation');
            $table->json('medical_history')->nullable(); // Chronic conditions, allergies
            $table->json('family_history')->nullable(); // Family medical history
            $table->json('medications')->nullable(); // Current medications
            $table->json('allergies')->nullable(); // Allergies list
            $table->json('insurance_info')->nullable(); // Insurance details
            $table->string('preferred_language')->default('Bangla');
            $table->boolean('is_active')->default(true);
            $table->date('last_visit_date')->nullable();
            $table->json('vital_signs')->nullable(); // Latest vital signs
            $table->timestamps();
            
            // Indexes
            $table->index('patient_id');
            $table->index(['user_id', 'is_active']);
            $table->index('phone');
            $table->index('city');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
