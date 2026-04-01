<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'blood_type',
        'age',
        'address',
        'city',
        'state',
        'zip_code',
        'country',
        'emergency_contact_name',
        'emergency_contact_phone',
        'primary_physician',
        'insurance_provider',
        'policy_number',
        'allergies',
        'chronic_conditions',
        'medications',
        'status',
        'registration_date',
        'last_visit',
        'outstanding_balance',
        'bmi',
        'profile_image',
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'registration_date' => 'date',
        'last_visit' => 'date',
    ];

    /**
     * Get the appointments for the patient
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Get the medical records for the patient
     */
    public function medicalRecords(): HasMany
    {
        return $this->hasMany(MedicalRecord::class);
    }

    /**
     * Get the bills for the patient
     */
    public function billing(): HasMany
    {
        return $this->hasMany(Billing::class);
    }

    /**
     * Get the primary doctor for the patient
     */
    public function primaryPhysician(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }
}
