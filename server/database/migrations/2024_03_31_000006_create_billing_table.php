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
        Schema::create('billing', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained('patients');
            $table->foreignId('doctor_id')->nullable()->constrained('doctors');
            $table->foreignId('appointment_id')->nullable()->constrained('appointments');
            $table->string('bill_number')->unique();
            $table->decimal('amount', 10, 2);
            $table->text('description');
            $table->string('status')->default('pending');
            $table->date('due_date');
            $table->string('payment_method')->nullable();
            $table->string('insurance_claim_number')->nullable();
            $table->json('services');
            $table->decimal('tax_amount', 10, 2)->default(0.00);
            $table->decimal('discount_amount', 10, 2)->default(0.00);
            $table->decimal('total_amount', 10, 2);
            $table->string('transaction_id')->nullable();
            $table->date('payment_date')->nullable();
            $table->text('payment_notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('billing');
    }
};
