<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LabTestBooking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_number',
        'user_id',
        'lab_test_id',
        'preferred_date',
        'preferred_time',
        'collection_type',
        'patient_name',
        'patient_phone',
        'patient_email',
        'patient_dob',
        'patient_gender',
        'address',
        'city',
        'state',
        'zip_code',
        'price',
        'status',
        'payment_status',
        'payment_method',
        'report_url',
        'sample_collected_at',
        'completed_at',
    ];

    protected $casts = [
        'preferred_date' => 'date',
        'patient_dob' => 'date',
        'price' => 'decimal:2',
        'sample_collected_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function labTest()
    {
        return $this->belongsTo(LabTest::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($booking) {
            if (!$booking->booking_number) {
                $booking->booking_number = 'LAB-' . strtoupper(uniqid());
            }
        });
    }
}
