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
        Schema::table('doctors', function (Blueprint $table) {
            // Personal Information
            $table->string('emergency_contact', 20)->nullable()->after('bio');
            $table->enum('marital_status', ['Single', 'Married', 'Divorced', 'Widowed'])->nullable()->after('emergency_contact');
            $table->string('website')->nullable()->after('marital_status');
            $table->string('linkedin')->nullable()->after('website');
            
            // Professional Information
            $table->string('department', 100)->nullable()->after('hospital');
            $table->string('designation', 100)->nullable()->after('department');
            $table->string('npi_number', 50)->nullable()->after('license_number');
            $table->string('dea_number', 50)->nullable()->after('npi_number');
            $table->json('languages')->nullable()->after('dea_number');
            
            // Expertise Information
            $table->json('areas_of_expertise')->nullable()->after('languages');
            $table->json('services_offered')->nullable()->after('areas_of_expertise');
            $table->json('awards')->nullable()->after('services_offered');
            $table->json('publications')->nullable()->after('awards');
            $table->json('memberships')->nullable()->after('publications');
            $table->json('research_interests')->nullable()->after('memberships');
            
            // Statistics
            $table->integer('profile_views')->default(0)->after('research_interests');
        });

        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'title')) {
                $table->string('title', 10)->default('Dr.')->after('id');
            }
            if (!Schema::hasColumn('users', 'first_name')) {
                $table->string('first_name', 50)->nullable()->after('name');
            }
            if (!Schema::hasColumn('users', 'last_name')) {
                $table->string('last_name', 50)->nullable()->after('first_name');
            }
            if (!Schema::hasColumn('users', 'date_of_birth')) {
                $table->date('date_of_birth')->nullable()->after('email');
            }
            if (!Schema::hasColumn('users', 'gender')) {
                $table->enum('gender', ['Male', 'Female', 'Other'])->nullable()->after('date_of_birth');
            }
            if (!Schema::hasColumn('users', 'address')) {
                $table->text('address')->nullable()->after('gender');
            }
            if (!Schema::hasColumn('users', 'profile_picture')) {
                $table->string('profile_picture')->nullable()->after('address');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('doctors', function (Blueprint $table) {
            $table->dropColumn([
                'emergency_contact',
                'marital_status',
                'website',
                'linkedin',
                'department',
                'designation',
                'npi_number',
                'dea_number',
                'languages',
                'areas_of_expertise',
                'services_offered',
                'awards',
                'publications',
                'memberships',
                'research_interests',
                'profile_views',
            ]);
        });

        Schema::table('users', function (Blueprint $table) {
            $columns = ['title', 'first_name', 'last_name', 'date_of_birth', 'gender', 'address', 'profile_picture'];
            foreach ($columns as $column) {
                if (Schema::hasColumn('users', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
