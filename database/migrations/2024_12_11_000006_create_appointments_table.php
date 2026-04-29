<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string('appointment_id')->unique(); // Unique appointment identifier
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->foreignId('hospital_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('type', ['consultation', 'follow_up', 'emergency', 'surgery', 'checkup']);
            $table->enum('mode', ['in_person', 'video', 'chat', 'phone']);
            $table->enum('status', ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show']);
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->dateTime('appointment_datetime');
            $table->dateTime('end_datetime')->nullable();
            $table->integer('duration_minutes')->default(30); // Appointment duration
            $table->decimal('consultation_fee', 10, 2)->nullable();
            $table->decimal('paid_amount', 10, 2)->default(0);
            $table->enum('payment_status', ['pending', 'paid', 'refunded'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->text('symptoms')->nullable(); // Patient symptoms
            $table->text('notes')->nullable(); // Additional notes
            $table->text('diagnosis')->nullable(); // Doctor's diagnosis
            $table->text('prescription')->nullable(); // Prescription details
            $table->text('recommendations')->nullable(); // Doctor's recommendations
            $table->text('follow_up_instructions')->nullable();
            $table->json('vital_signs')->nullable(); // Recorded vital signs
            $table->json('attachments')->nullable(); // Medical reports, images
            $table->string('meeting_link')->nullable(); // Video consultation link
            $table->string('meeting_room_id')->nullable(); // Video room ID
            $table->dateTime('cancelled_at')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->dateTime('completed_at')->nullable();
            $table->foreignId('cancelled_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('completed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->json('feedback')->nullable(); // Patient feedback
            $table->integer('rating')->nullable(); // Patient rating (1-5)
            $table->text('review')->nullable(); // Patient review
            $table->dateTime('reminded_at')->nullable(); // Last reminder sent
            $table->boolean('is_reminder_sent')->default(false);
            $table->timestamps();
            
            // Indexes
            $table->index(['patient_id', 'status']);
            $table->index(['doctor_id', 'appointment_datetime']);
            $table->index(['hospital_id', 'status']);
            $table->index(['status', 'appointment_datetime']);
            $table->index(['type', 'mode']);
            $table->index('payment_status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
