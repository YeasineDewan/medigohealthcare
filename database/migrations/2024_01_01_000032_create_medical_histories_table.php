<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('medical_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patients')->onDelete('cascade');
            
            // Event Details
            $table->enum('type', ['visit', 'lab', 'procedure', 'diagnosis', 'prescription']);
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('diagnosis')->nullable();
            $table->text('notes')->nullable();
            
            // Doctor & Department
            $table->foreignId('doctor_id')->nullable()->constrained()->onDelete('set null');
            $table->string('department')->nullable();
            
            // Vitals (JSON)
            $table->json('vitals')->nullable();
            
            // Lab Results (JSON)
            $table->json('lab_results')->nullable();
            
            // Prescriptions (JSON)
            $table->json('prescriptions')->nullable();
            
            // Attachments
            $table->string('attachment')->nullable();
            
            // Date
            $table->date('event_date');
            
            $table->timestamps();
            
            $table->index('patient_id');
            $table->index('type');
            $table->index('event_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medical_histories');
    }
};

