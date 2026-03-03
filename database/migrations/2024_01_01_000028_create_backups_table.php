<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('backups', function (Blueprint $table) {
            $table->id();
            $table->string('filename', 255);
            $table->string('path', 500);
            $table->bigInteger('size')->default(0);
            $table->enum('type', ['manual', 'scheduled'])->default('manual');
            $table->enum('status', ['pending', 'completed', 'failed'])->default('pending');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('backups');
    }
};
