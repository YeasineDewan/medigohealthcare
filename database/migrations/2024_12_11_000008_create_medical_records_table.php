<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->string('record_id')->unique(); // Unique medical record identifier
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->foreignId('hospital_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('record_type', ['consultation', 'lab_result', 'imaging', 'surgery', 'vaccination', 'admission', 'discharge']);
            $table->date('record_date');
            $table->string('title');
            $table->text('description')->nullable();
            $table->json('vital_signs')->nullable(); // Blood pressure, heart rate, temperature, etc.
            $table->json('symptoms')->nullable(); // Symptoms list
            $table->text('diagnosis')->nullable(); // Diagnosis details
            $table->text('treatment')->nullable(); // Treatment provided
            $table->text('medications')->nullable(); // Medications prescribed
            $table->text('notes')->nullable(); // Additional notes
            $table->json('attachments')->nullable(); // File paths to documents, images
            $table->json('lab_results')->nullable(); // Laboratory test results
            $table->json('imaging_results')->nullable(); // Imaging study results
            $table->enum('urgency_level', ['routine', 'urgent', 'emergency'])->default('routine');
            $table->enum('status', ['active', 'archived', 'deleted'])->default('active');
            $table->boolean('is_confidential')->default(false);
            $table->boolean('requires_follow_up')->default(false);
            $table->date('follow_up_date')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            // Indexes
            $table->index(['patient_id', 'record_date']);
            $table->index(['doctor_id', 'record_date']);
            $table->index(['record_type', 'status']);
            $table->index('urgency_level');
            $table->index('requires_follow_up');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
