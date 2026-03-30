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
    ];

    protected $casts = [
        'available_days' => 'array',
        'consultation_fee' => 'decimal:2',
        'video_consultation_fee' => 'decimal:2',
        'rating' => 'decimal:2',
        'is_available' => 'boolean',
        'accepts_video_consultation' => 'boolean',
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
