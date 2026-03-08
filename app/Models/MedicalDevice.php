<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MedicalDevice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'model',
        'category',
        'manufacturer',
        'barcode',
        'serial_number',
        'purchase_date',
        'warranty_expiry',
        'unit_price',
        'selling_price',
        'current_stock',
        'min_stock_level',
        'max_stock_level',
        'reorder_level',
        'unit',
        'description',
        'specifications',
        'features',
        'power_source',
        'dimensions',
        'weight',
        'certification',
        'status',
        'last_maintenance',
        'next_maintenance',
        'supplier',
        'calibration_required',
        'disposable',
        'sterile',
        'image_url'
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'warranty_expiry' => 'date',
        'last_maintenance' => 'date',
        'next_maintenance' => 'date',
        'unit_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'current_stock' => 'integer',
        'min_stock_level' => 'integer',
        'max_stock_level' => 'integer',
        'reorder_level' => 'integer',
        'calibration_required' => 'boolean',
        'disposable' => 'boolean',
        'sterile' => 'boolean',
    ];

    // Relationships
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function maintenanceRecords()
    {
        return $this->hasMany(MaintenanceRecord::class);
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'Active');
    }

    public function scopeLowStock($query)
    {
        return $query->where('current_stock', '<=', 'min_stock_level');
    }

    public function scopeCriticalStock($query)
    {
        return $query->where('current_stock', '<=', 'reorder_level');
    }

    public function scopeExpiringSoon($query)
    {
        return $query->where('warranty_expiry', '<=', now()->addDays(90));
    }

    // Accessors
    public function getIsLowStockAttribute()
    {
        return $this->current_stock <= $this->min_stock_level;
    }

    public function getIsCriticalStockAttribute()
    {
        return $this->current_stock <= $this->reorder_level;
    }

    public function getIsExpiringSoonAttribute()
    {
        return $this->warranty_expiry <= now()->addDays(90);
    }

    public function getStockStatusAttribute()
    {
        if ($this->is_critical_stock) {
            return 'critical';
        } elseif ($this->is_low_stock) {
            return 'low';
        }
        return 'normal';
    }
}
