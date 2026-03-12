<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lab_sample_collections', function (Blueprint $table) {
            $table->id();
            $table->string('sample_id', 50)->unique();
            $table->string('booking_number', 50)->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('patient_name', 255);
            $table->string('patient_phone', 20);
            $table->string('patient_email', 255)->nullable();
            $table->integer('patient_age')->nullable();
            $table->enum('patient_gender', ['male', 'female', 'other'])->nullable();
            $table->json('tests'); // Array of test names
            $table->string('category', 100)->nullable();
            $table->enum('collection_type', ['Walk-in', 'Home Collection', 'Referral'])->default('Walk-in');
            $table->text('collection_address')->nullable();
            $table->string('referrer', 255)->nullable();
            $table->string('phlebotomist', 255)->nullable();
            $table->string('sample_type', 100); // Blood, Urine, etc.
            $table->string('container_type', 255)->nullable();
            $table->string('volume', 50)->nullable();
            $table->date('collection_date');
            $table->time('collection_time')->nullable();
            $table->time('scheduled_time')->nullable();
            $table->enum('status', ['scheduled', 'pending', 'collected', 'delivered', 'cancelled'])->default('scheduled');
            $table->enum('priority', ['normal', 'urgent'])->default('normal');
            $table->text('instructions')->nullable();
            $table->text('notes')->nullable();
            $table->decimal('amount', 10, 2)->default(0);
            $table->enum('payment_status', ['paid', 'pending'])->default('pending');
            $table->string('reports_delivery', 50)->default('Online');
            $table->string('barcode', 50)->unique();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_sample_collections');
    }
};
