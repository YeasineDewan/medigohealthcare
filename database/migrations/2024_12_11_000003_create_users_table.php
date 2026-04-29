<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', ['admin', 'doctor', 'patient', 'hospital_admin', 'staff'])->default('patient');
            $table->string('phone')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('country')->default('Bangladesh');
            $table->string('profile_image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('email_verified')->default(false);
            $table->boolean('phone_verified')->default(false);
            $table->timestamp('last_login_at')->nullable();
            $table->string('last_login_ip')->nullable();
            $table->json('preferences')->nullable();
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
            
            // Indexes
            $table->index(['role', 'is_active']);
            $table->index('email');
            $table->index('phone');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
