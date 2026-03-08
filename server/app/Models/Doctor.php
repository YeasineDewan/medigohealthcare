<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Doctor extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'specialty',
        'qualifications',
        'bio',
        'license_number',
        'experience_years',
        'consultation_fee',
        'video_consultation_fee',
        'rating',
        'total_reviews',
        'hospital',
        'location',
        'available_days',
        'start_time',
        'end_time',
        'is_available',
        'accepts_video_consultation',
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
    ];

    protected $casts = [
        'available_days' => 'array',
        'consultation_fee' => 'decimal:2',
        'video_consultation_fee' => 'decimal:2',
        'rating' => 'decimal:2',
        'is_available' => 'boolean',
        'accepts_video_consultation' => 'boolean',
        'languages' => 'array',
        'areas_of_expertise' => 'array',
        'services_offered' => 'array',
        'awards' => 'array',
        'publications' => 'array',
        'memberships' => 'array',
        'research_interests' => 'array',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function schedules()
    {
        return $this->hasMany(DoctorSchedule::class);
    }

    public function earnings()
    {
        return $this->hasMany(DoctorEarning::class);
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }

    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }
}
