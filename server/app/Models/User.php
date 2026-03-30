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
        'state',
        'zip_code',
        'country',
        'avatar',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'date_of_birth' => 'date',
        'is_active' => 'boolean',
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
}
