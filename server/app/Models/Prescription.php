<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prescription extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'appointment_id',
        'doctor_id',
        'patient_id',
        'diagnosis',
        'notes',
        'prescription_date',
        'next_visit_date',
        'is_active',
    ];

    protected $casts = [
        'prescription_date' => 'date',
        'next_visit_date' => 'date',
        'is_active' => 'boolean',
    ];

    // Relationships
    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function items()
    {
        return $this->hasMany(PrescriptionItem::class);
    }
}
