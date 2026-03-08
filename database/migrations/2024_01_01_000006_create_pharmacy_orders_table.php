<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pharmacy_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('patient_id')->constrained('users');
            $table->foreignId('doctor_id')->constrained('users');
            $table->foreignId('prescription_id')->nullable()->constrained('prescriptions');
            $table->string('status')->default('pending');
            $table->string('payment_status')->default('pending');
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax', 10, 2);
            $table->decimal('total', 10, 2);
            $table->text('notes')->nullable();
            $table->datetime('order_date');
            $table->datetime('processed_date')->nullable();
            $table->datetime('completed_date')->nullable();
            $table->datetime('cancelled_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('order_number');
            $table->index('patient_id');
            $table->index('doctor_id');
            $table->index('status');
            $table->index('payment_status');
            $table->index('order_date');
        });
    }

    public function down()
    {
        Schema::dropIfExists('pharmacy_orders');
    }
};
