<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('notices', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->enum('type', ['general', 'emergency', 'maintenance', 'holiday', 'announcement'])->default('general');
            $table->enum('priority', ['low', 'medium', 'high', 'critical'])->default('medium');
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->json('target_audience')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('allow_comments')->default(false);
            $table->string('attachment_url')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['is_active', 'start_date', 'end_date']);
            $table->index(['type', 'priority']);
            $table->index('created_by');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notices');
    }
};

