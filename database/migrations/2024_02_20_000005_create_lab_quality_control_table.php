<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lab_quality_control', function (Blueprint $table) {
            $table->id();
            $table->string('qc_id', 50)->unique();
            $table->string('control_name', 255);
            $table->string('lot_number', 100);
            $table->string('manufacturer', 255)->nullable();
            $table->date('expiry_date');
            $table->enum('control_type', ['Internal', 'External'])->default('Internal');
            $table->string('control_level', 20); // Level 1, Level 2, etc.
            $table->json('parameters'); // Array of parameter names
            $table->string('assigned_to', 255)->nullable(); // Equipment name
            $table->enum('status', ['active', 'expired', 'depleted'])->default('active');
            $table->date('opened_date')->nullable();
            $table->integer('used_count')->default(0);
            $table->integer('remaining_uses')->nullable();
            $table->json('target_values')->nullable(); // {parameter: {mean, sd}}
            $table->json('current_values')->nullable();
            $table->date('last_run_date')->nullable();
            $table->enum('last_run_result', ['passed', 'failed', 'warning'])->nullable();
            $table->json('sd_values')->nullable(); // Standard deviation values
            $table->json('acceptable_range')->nullable(); // {min: -2, max: 2}
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lab_quality_control');
    }
};
