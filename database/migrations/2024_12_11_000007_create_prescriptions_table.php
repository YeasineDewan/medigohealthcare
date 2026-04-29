<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->string('prescription_id')->unique(); // Unique prescription identifier
            $table->foreignId('appointment_id')->constrained()->onDelete('cascade');
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->foreignId('hospital_id')->nullable()->constrained()->onDelete('set null');
            $table->date('prescription_date');
            $table->text('chief_complaint')->nullable();
            $table->text('history')->nullable(); // Patient history
            $table->text('examination')->nullable(); // Physical examination findings
            $table->text('diagnosis')->nullable(); // Final diagnosis
            $table->text('instructions')->nullable(); // General instructions
            $table->text('follow_up')->nullable(); // Follow-up instructions
            $table->json('medicines')->nullable(); // List of medicines with dosage
            $table->json('lab_tests')->nullable(); // Recommended lab tests
            $table->json('imaging')->nullable(); // Recommended imaging studies
            $table->json('referrals')->nullable(); // Referrals to specialists
            $table->string('signature_image')->nullable(); // Doctor's signature
            $table->string('qr_code')->nullable(); // QR code for verification
            $table->enum('status', ['draft', 'active', 'completed', 'cancelled'])->default('active');
            $table->boolean('is_digitally_signed')->default(false);
            $table->timestamp('signed_at')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Indexes
            $table->index(['patient_id', 'prescription_date']);
            $table->index(['doctor_id', 'prescription_date']);
            $table->index(['appointment_id']);
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
