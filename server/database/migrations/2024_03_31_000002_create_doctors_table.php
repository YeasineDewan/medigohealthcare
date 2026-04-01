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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('specialization');
            $table->string('department');
            $table->integer('experience')->default(0);
            $table->json('education')->nullable();
            $table->string('license_number')->unique();
            $table->decimal('consultation_fee', 8, 2)->default(0.00);
            $table->json('languages')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('status')->default('active');
            $table->date('join_date');
            $table->integer('patients')->default(0);
            $table->integer('appointments')->default(0);
            $table->string('availability')->default('Available');
            $table->decimal('rating', 3, 2)->default(0.0);
            $table->json('awards')->nullable();
            $table->json('available_slots')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('doctors');
    }
};
