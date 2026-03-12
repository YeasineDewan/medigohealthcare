<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LabQualityControl extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'qc_id',
        'control_name',
        'lot_number',
        'manufacturer',
        'expiry_date',
        'control_type',
        'control_level',
        'parameters',
        'assigned_to',
        'status',
        'opened_date',
        'used_count',
        'remaining_uses',
        'target_values',
        'current_values',
        'last_run_date',
        'last_run_result',
        'sd_values',
        'acceptable_range',
        'notes',
    ];

    protected $casts = [
        'parameters' => 'array',
        'target_values' => 'array',
        'current_values' => 'array',
        'sd_values' => 'array',
        'acceptable_range' => 'array',
        'expiry_date' => 'date',
        'opened_date' => 'date',
        'last_run_date' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($qc) {
            if (!$qc->qc_id) {
                $qc->qc_id = 'QC-' . date('Y') . '-' . str_pad(static::max('id') + 1, 3, '0', STR_PAD_LEFT);
            }
        });
    }
}
