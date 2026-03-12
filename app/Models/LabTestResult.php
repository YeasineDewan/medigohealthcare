<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LabTestResult extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'result_id',
        'sample_id',
        'user_id',
        'patient_name',
        'patient_phone',
        'patient_age',
        'patient_gender',
        'referrer',
        'tests',
        'category',
        'test_date',
        'received_time',
        'due_date',
        'status',
        'priority',
        'parameters',
        'amount',
        'notes',
        'published',
        'published_date',
        'published_time',
    ];

    protected $casts = [
        'tests' => 'array',
        'parameters' => 'array',
        'test_date' => 'date',
        'received_time' => 'datetime',
        'due_date' => 'date',
        'published_date' => 'date',
        'published_time' => 'datetime',
        'published' => 'boolean',
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
        static::creating(function ($result) {
            if (!$result->result_id) {
                $result->result_id = 'TR-' . date('Y') . '-' . str_pad(static::max('id') + 1, 3, '0', STR_PAD_LEFT);
            }
        });
    }
}
