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
            $table->foreignId('appointment_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->foreignId('patient_id')->constrained('users')->onDelete('cascade');
            $table->text('diagnosis')->nullable();
            $table->text('notes')->nullable();
            $table->date('prescription_date');
            $table->date('next_visit_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
