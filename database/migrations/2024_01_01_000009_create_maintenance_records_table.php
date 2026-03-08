<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('maintenance_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medical_device_id')->constrained()->onDelete('cascade');
            $table->string('type'); // 'routine', 'repair', 'calibration'
            $table->text('description');
            $table->decimal('cost', 10, 2)->nullable();
            $table->datetime('maintenance_date');
            $table->datetime('next_maintenance_date')->nullable();
            $table->string('performed_by');
            $table->string('status')->default('completed');
            $table->text('notes')->nullable();
            $table->foreignId('user_id')->constrained();
            $table->timestamps();
            
            $table->index('medical_device_id');
            $table->index('type');
            $table->index('maintenance_date');
            $table->index('status');
        });
    }

    public function down()
    {
        Schema::dropIfExists('maintenance_records');
    }
};
