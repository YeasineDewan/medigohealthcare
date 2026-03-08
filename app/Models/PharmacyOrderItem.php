<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PharmacyOrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'pharmacy_order_id',
        'medical_device_id',
        'medicine_id',
        'name',
        'type', // 'medical_device' or 'medicine'
        'quantity',
        'unit_price',
        'total_price',
        'notes'
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
        'quantity' => 'integer',
    ];

    // Relationships
    public function pharmacyOrder()
    {
        return $this->belongsTo(PharmacyOrder::class);
    }

    public function medicalDevice()
    {
        return $this->belongsTo(MedicalDevice::class);
    }

    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }

    // Accessors
    public function getFormattedUnitPriceAttribute()
    {
        return '$' . number_format($this->unit_price, 2);
    }

    public function getFormattedTotalPriceAttribute()
    {
        return '$' . number_format($this->total_price, 2);
    }
}
