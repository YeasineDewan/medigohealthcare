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
            $table->string('booking_number', 50)->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('lab_test_id')->constrained()->onDelete('cascade');
            $table->date('preferred_date');
            $table->time('preferred_time')->nullable();
            $table->enum('collection_type', ['home', 'center'])->default('home');
            $table->string('patient_name', 255);
            $table->string('patient_phone', 20);
            $table->string('patient_email', 255)->nullable();
            $table->date('patient_dob')->nullable();
            $table->enum('patient_gender', ['male', 'female', 'other'])->nullable();
            $table->text('address')->nullable();
            $table->string('city', 100)->nullable();
            $table->string('state', 100)->nullable();
            $table->string('zip_code', 20)->nullable();
            $table->decimal('price', 10, 2);
            $table->enum('status', ['pending', 'confirmed', 'sample_collected', 'processing', 'completed', 'cancelled'])->default('pending');
            $table->enum('payment_status', ['pending', 'paid', 'refunded'])->default('pending');
            $table->string('payment_method', 50)->nullable();
            $table->text('report_url')->nullable();
            $table->timestamp('sample_collected_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_test_bookings');
    }
};
