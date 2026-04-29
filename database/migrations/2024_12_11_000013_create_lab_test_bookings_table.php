<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lab_test_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_id')->unique(); // Unique booking identifier
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('lab_test_id')->constrained()->onDelete('cascade');
            $table->foreignId('hospital_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('status', ['pending', 'confirmed', 'sample_collected', 'processing', 'completed', 'cancelled'])->default('pending');
            $table->enum('collection_type', ['center', 'home']);
            $table->dateTime('preferred_date');
            $table->string('preferred_time_slot')->nullable();
            $table->text('patient_address')->nullable(); // For home collection
            $table->string('patient_phone');
            $table->string('alternate_phone')->nullable();
            $table->decimal('test_price', 10, 2);
            $table->decimal('collection_fee', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->enum('payment_status', ['pending', 'paid', 'refunded'])->default('pending');
            $table->string('payment_method')->nullable();
            $table->text('doctor_prescription')->nullable(); // Prescription details
            $table->text('special_instructions')->nullable();
            $table->dateTime('sample_collected_at')->nullable();
            $table->dateTime('results_ready_at')->nullable();
            $table->dateTime('delivered_at')->nullable();
            $table->string('report_file_path')->nullable(); // Path to digital report
            $table->string('sample_id')->nullable(); // Sample tracking ID
            $table->json('test_parameters')->nullable(); // Specific parameters tested
            $table->json('results')->nullable(); // Test results data
            $table->text('report_summary')->nullable(); // Summary of results
            $table->text('doctor_notes')->nullable(); // Doctor's interpretation
            $table->dateTime('cancelled_at')->nullable();
            $table->text('cancellation_reason')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Indexes
            $table->index(['patient_id', 'status']);
            $table->index(['lab_test_id', 'status']);
            $table->index(['status', 'preferred_date']);
            $table->index('collection_type');
            $table->index('payment_status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_test_bookings');
    }
};
