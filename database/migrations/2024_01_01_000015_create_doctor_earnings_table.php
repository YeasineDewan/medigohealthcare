<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('doctor_earnings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('doctor_id')->constrained()->onDelete('cascade');
            $table->foreignId('appointment_id')->nullable()->constrained()->onDelete('set null');
            $table->string('earning_type', 50)->default('consultation'); // consultation, video_consultation, commission
            $table->decimal('amount', 10, 2);
            $table->decimal('commission_percentage', 5, 2)->default(0);
            $table->enum('status', ['pending', 'paid', 'cancelled'])->default('pending');
            $table->date('earning_date');
            $table->timestamp('paid_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('doctor_earnings');
    }
};
