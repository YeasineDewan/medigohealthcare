<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LabSampleCollection extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sample_id',
        'booking_number',
        'user_id',
        'patient_name',
        'patient_phone',
        'patient_email',
        'patient_age',
        'patient_gender',
        'tests',
        'category',
        'collection_type',
        'collection_address',
        'referrer',
        'phlebotomist',
        'sample_type',
        'container_type',
        'volume',
        'collection_date',
        'collection_time',
        'scheduled_time',
        'status',
        'priority',
        'instructions',
        'notes',
        'amount',
        'payment_status',
        'reports_delivery',
        'barcode',
    ];

    protected $casts = [
        'tests' => 'array',
        'collection_date' => 'date',
        'collection_time' => 'datetime',
        'scheduled_time' => 'datetime',
        'amount' => 'decimal:2',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($collection) {
            if (!$collection->sample_id) {
                $collection->sample_id = 'SPL-' . date('Y') . '-' . str_pad(static::max('id') + 1, 3, '0', STR_PAD_LEFT);
            }
            if (!$collection->barcode) {
                $collection->barcode = 'SPL' . date('Y') . str_pad(static::max('id') + 1, 3, '0', STR_PAD_LEFT);
            }
        });
    }
}
