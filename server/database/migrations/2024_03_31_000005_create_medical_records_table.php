<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patients');
            $table->foreignId('doctor_id')->constrained('doctors');
            $table->string('record_number')->unique();
            $table->date('visit_date');
            $table->string('diagnosis');
            $table->text('treatment');
            $table->text('symptoms');
            $table->text('notes')->nullable();
            $table->json('vital_signs')->nullable();
            $table->json('prescriptions')->nullable();
            $table->json('lab_results')->nullable();
            $table->string('follow_up_date')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('medical_records');
    }
};
