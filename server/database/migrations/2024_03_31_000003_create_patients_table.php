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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->date('date_of_birth');
            $table->string('gender');
            $table->string('blood_type');
            $table->integer('age');
            $table->string('address');
            $table->string('city');
            $table->string('state');
            $table->string('zip_code');
            $table->string('country');
            $table->string('emergency_contact_name');
            $table->string('emergency_contact_phone');
            $table->string('primary_physician');
            $table->string('insurance_provider');
            $table->string('policy_number');
            $table->json('allergies')->nullable();
            $table->json('chronic_conditions')->nullable();
            $table->json('medications')->nullable();
            $table->string('status')->default('active');
            $table->date('registration_date');
            $table->string('last_visit')->default('Not visited yet');
            $table->decimal('outstanding_balance', 8, 2)->default(0.00);
            $table->string('bmi')->nullable();
            $table->string('profile_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
};
