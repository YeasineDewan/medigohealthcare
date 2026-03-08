<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MedicalHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'type',
        'title',
        'description',
        'diagnosis',
        'notes',
        'doctor_id',
        'department',
        'vitals',
        'lab_results',
        'prescriptions',
        'attachment',
        'event_date'
    ];

    protected $casts = [
        'event_date' => 'date',
        'vitals' => 'array',
        'lab_results' => 'array',
        'prescriptions' => 'array',
    ];

    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }
}

