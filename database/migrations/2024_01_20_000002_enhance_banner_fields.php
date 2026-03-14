<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            // Add new fields for enhanced banner functionality
            if (!Schema::hasColumn('banners', 'target_audience')) {
                $table->string('target_audience', 20)->nullable()->after('type');
            }
            if (!Schema::hasColumn('banners', 'priority')) {
                $table->enum('priority', ['low', 'medium', 'high'])->default('medium')->after('target_audience');
            }
            if (!Schema::hasColumn('banners', 'animation_type')) {
                $table->enum('animation_type', ['fade', 'slide', 'zoom', 'flip'])->default('fade')->after('priority');
            }
            if (!Schema::hasColumn('banners', 'overlay_opacity')) {
                $table->integer('overlay_opacity')->default(20)->after('animation_type');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banners', function (Blueprint $table) {
            $columns = ['target_audience', 'priority', 'animation_type', 'overlay_opacity'];
            foreach ($columns as $column) {
                if (Schema::hasColumn('banners', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
