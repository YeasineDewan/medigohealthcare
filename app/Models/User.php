<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'date_of_birth',
        'gender',
        'address',
        'city',
        'country',
        'profile_image',
        'is_active',
        'email_verified',
        'phone_verified',
        'last_login_at',
        'last_login_ip',
        'preferences',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'date_of_birth' => 'date',
        'is_active' => 'boolean',
        'email_verified' => 'boolean',
        'phone_verified' => 'boolean',
        'last_login_at' => 'datetime',
        'preferences' => 'array',
        'password' => 'hashed',
    ];

    // Relationships
    public function doctor()
    {
        return $this->hasOne(Doctor::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class, 'patient_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function labTestBookings()
    {
        return $this->hasMany(LabTestBooking::class);
    }

    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class, 'patient_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function patient()
    {
        return $this->hasOne(Patient::class);
    }

    public function doctorApplication()
    {
        return $this->hasOne(DoctorApplication::class, 'email', 'email');
    }

    public function hospitalApplications()
    {
        return $this->hasMany(HospitalApplication::class, 'reviewed_by');
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class, 'doctor_id');
    }

    public function medicalRecordsAsDoctor()
    {
        return $this->hasMany(MedicalRecord::class, 'doctor_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByRole($query, $role)
    {
        return $query->where('role', $role);
    }

    // Accessors
    public function getFullNameAttribute()
    {
        return $this->name;
    }

    public function getRoleLabelAttribute()
    {
        return match($this->role) {
            'admin' => 'Administrator',
            'doctor' => 'Doctor',
            'patient' => 'Patient',
            'hospital_admin' => 'Hospital Admin',
            'staff' => 'Staff',
            default => 'Unknown'
        };
    }

    public function getProfileImageUrlAttribute()
    {
        if ($this->profile_image) {
            return asset('storage/' . $this->profile_image);
        }
        
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=7C3AED&background=EBF4FF';
    }
}
