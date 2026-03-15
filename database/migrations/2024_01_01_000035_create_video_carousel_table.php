<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('video_carousel', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->text('description')->nullable();
            $table->string('video_url', 500);
            $table->string('thumbnail_url', 500)->nullable();
            $table->string('category', 100)->default('General');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->unsignedInteger('display_order')->default(0);
            $table->boolean('autoplay')->default(true);
            $table->boolean('mute')->default(true);
            $table->boolean('loop')->default(true);
            $table->boolean('show_controls')->default(true);
            $table->boolean('featured')->default(false);
            $table->json('display_pages')->nullable(); // ['home', 'doctors', 'about', 'services', 'contact']
            $table->json('tags')->nullable();
            $table->unsignedInteger('views')->default(0);
            $table->unsignedInteger('likes')->default(0);
            $table->unsignedInteger('shares')->default(0);
            $table->string('duration', 20)->nullable();
            $table->timestamps();

            $table->index('status');
            $table->index('display_order');
            $table->index('featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_carousel');
    }
};
