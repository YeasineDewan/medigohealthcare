<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lab_test_results', function (Blueprint $table) {
            $table->id();
            $table->string('result_id', 50)->unique();
            $table->string('sample_id', 50)->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('patient_name', 255);
            $table->string('patient_phone', 20);
            $table->integer('patient_age')->nullable();
            $table->enum('patient_gender', ['male', 'female', 'other'])->nullable();
            $table->string('referrer', 255)->nullable();
            $table->json('tests'); // Array of test names
            $table->string('category', 100)->nullable();
            $table->date('test_date');
            $table->time('received_time')->nullable();
            $table->date('due_date')->nullable();
            $table->enum('status', ['pending', 'in-progress', 'completed'])->default('pending');
            $table->enum('priority', ['normal', 'urgent'])->default('normal');
            $table->json('parameters'); // Test parameters with values, units, ref ranges
            $table->decimal('amount', 10, 2)->default(0);
            $table->text('notes')->nullable();
            $table->boolean('published')->default(false);
            $table->date('published_date')->nullable();
            $table->time('published_time')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_test_results');
    }
};
