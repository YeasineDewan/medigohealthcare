<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'patient_id',
        'blood_group',
        'gender',
        'date_of_birth',
        'phone',
        'alternate_phone',
        'address',
        'city',
        'postal_code',
        'emergency_contact_name',
        'emergency_contact_phone',
        'emergency_contact_relation',
        'medical_history',
        'family_history',
        'medications',
        'allergies',
        'insurance_info',
        'preferred_language',
        'is_active',
        'last_visit_date',
        'vital_signs',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'last_visit_date' => 'date',
        'medical_history' => 'array',
        'family_history' => 'array',
        'medications' => 'array',
        'allergies' => 'array',
        'insurance_info' => 'array',
        'is_active' => 'boolean',
        'vital_signs' => 'array',
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

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }

    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }

    public function labTestBookings()
    {
        return $this->hasMany(LabTestBooking::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByCity($query, $city)
    {
        return $query->where('city', $city);
    }

    public function scopeByBloodGroup($query, $bloodGroup)
    {
        return $query->where('blood_group', $bloodGroup);
    }

    // Accessors
    public function getFullNameAttribute()
    {
        return $this->user->name;
    }

    public function getEmailAttribute()
    {
        return $this->user->email;
    }

    public function getAgeAttribute()
    {
        return $this->date_of_birth ? $this->date_of_birth->age : null;
    }

    public function getFormattedPhoneAttribute()
    {
        return '+880 ' . substr($this->phone, -10);
    }

    public function getEmergencyContactFormattedAttribute()
    {
        return '+880 ' . substr($this->emergency_contact_phone, -10);
    }

    // Methods
    public function hasAllergy($allergy)
    {
        $allergies = $this->allergies ?? [];
        return in_array(strtolower($allergy), array_map('strtolower', $allergies));
    }

    public function hasMedication($medication)
    {
        $medications = $this->medications ?? [];
        return in_array(strtolower($medication), array_map('strtolower', $medications));
    }

    public function hasMedicalCondition($condition)
    {
        $medicalHistory = $this->medical_history ?? [];
        return in_array(strtolower($condition), array_map('strtolower', $medicalHistory));
    }

    public function updateLastVisit()
    {
        $this->update(['last_visit_date' => now()]);
    }

    public function getUpcomingAppointments()
    {
        return $this->appointments()
            ->where('status', 'confirmed')
            ->where('appointment_datetime', '>', now())
            ->orderBy('appointment_datetime')
            ->get();
    }

    public function getRecentMedicalRecords($limit = 10)
    {
        return $this->medicalRecords()
            ->latest('record_date')
            ->limit($limit)
            ->get();
    }

    public function getActivePrescriptions()
    {
        return $this->prescriptions()
            ->where('status', 'active')
            ->latest('prescription_date')
            ->get();
    }
}
