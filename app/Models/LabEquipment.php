<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LabEquipment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'equipment_id',
        'name',
        'model',
        'serial_number',
        'manufacturer',
        'category',
        'location',
        'purchase_date',
        'purchase_cost',
        'warranty_expiry',
        'status',
        'condition',
        'last_calibration',
        'next_calibration',
        'last_maintenance',
        'next_maintenance',
        'total_tests',
        'uptime',
        'specifications',
        'image',
        'description',
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'warranty_expiry' => 'date',
        'last_calibration' => 'date',
        'next_calibration' => 'date',
        'last_maintenance' => 'date',
        'next_maintenance' => 'date',
        'purchase_cost' => 'decimal:2',
        'uptime' => 'decimal:2',
        'specifications' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($equipment) {
            if (!$equipment->equipment_id) {
                $equipment->equipment_id = 'EQ-' . str_pad(static::max('id') + 1, 3, '0', STR_PAD_LEFT);
            }
        });
    }
}
