<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->string('profile_image')->nullable()->after('bio');
            $table->string('signature_image')->nullable()->after('profile_image');
            $table->json('experience')->nullable()->after('signature_image');
            $table->json('education')->nullable()->after('experience');
            $table->json('services')->nullable()->after('education');
            $table->json('publications')->nullable()->after('services');
            $table->json('awards')->nullable()->after('publications');
            $table->json('affiliations')->nullable()->after('awards');
            $table->json('memberships')->nullable()->after('affiliations');
            $table->decimal('consultation_fee_online', 10, 2)->default(0)->after('consultation_fee');
            $table->decimal('consultation_fee_emergency', 10, 2)->default(0)->after('consultation_fee_online');
        });
    }

    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->dropColumn([
                'profile_image',
                'signature_image',
                'experience',
                'education',
                'services',
                'publications',
                'awards',
                'affiliations',
                'memberships',
                'consultation_fee_online',
                'consultation_fee_emergency'
            ]);
        });
    }
};

