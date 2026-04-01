<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DoctorNew extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'specialization',
        'department',
        'experience',
        'education',
        'license_number',
        'consultation_fee',
        'languages',
        'profile_image',
        'status',
        'join_date',
        'patients',
        'appointments',
        'availability',
        'rating',
        'awards',
        'available_slots',
    ];

    protected $casts = [
        'education' => 'array',
        'languages' => 'array',
        'awards' => 'array',
        'available_slots' => 'array',
        'join_date' => 'date',
        'consultation_fee' => 'decimal:2',
        'rating' => 'decimal:2',
    ];

    /**
     * Get the appointments for the doctor
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Get the patients for the doctor
     */
    public function patients(): HasMany
    {
        return $this->hasMany(Patient::class);
    }

    /**
     * Get the medical records created by the doctor
     */
    public function medicalRecords(): HasMany
    {
        return $this->hasMany(MedicalRecord::class);
    }

    /**
     * Get the bills created by the doctor
     */
    public function billing(): HasMany
    {
        return $this->hasMany(Billing::class);
    }

    /**
     * Get available doctors
     */
    public function scopeAvailable($query)
    {
        return $query->where('status', 'active')
                    ->where('availability', 'Available');
    }

    /**
     * Get doctors by department
     */
    public function scopeByDepartment($query, $department)
    {
        return $query->where('department', $department);
    }

    /**
     * Search doctors by name or specialization
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('specialization', 'like', "%{$search}%")
              ->orWhere('department', 'like', "%{$search}%");
        });
    }
}
