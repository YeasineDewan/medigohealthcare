<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('banners', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->string('background_color')->default('from-blue-500 to-blue-700');
            $table->string('cta_text')->nullable();
            $table->string('cta_link')->nullable();
            $table->integer('display_order')->default(0);
            $table->boolean('active')->default(true);
            $table->enum('type', ['hero', 'promotional', 'announcement'])->default('hero');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('banners');
    }
};
