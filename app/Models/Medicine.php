<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Medicine extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'generic_name',
        'brand_name',
        'category',
        'dosage_form',
        'strength',
        'manufacturer',
        'barcode',
        'batch_number',
        'purchase_date',
        'expiry_date',
        'unit_price',
        'selling_price',
        'current_stock',
        'min_stock_level',
        'max_stock_level',
        'reorder_level',
        'unit',
        'description',
        'indications',
        'contraindications',
        'side_effects',
        'dosage_instructions',
        'storage_conditions',
        'prescription_required',
        'controlled_substance',
        'status',
        'supplier',
        'image_url'
    ];

    protected $casts = [
        'purchase_date' => 'date',
        'expiry_date' => 'date',
        'unit_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
        'current_stock' => 'integer',
        'min_stock_level' => 'integer',
        'max_stock_level' => 'integer',
        'reorder_level' => 'integer',
        'prescription_required' => 'boolean',
        'controlled_substance' => 'boolean',
    ];

    // Relationships
    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }

    public function orderItems()
    {
        return $this->hasMany(PharmacyOrderItem::class);
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
        return $query->where('expiry_date', '<=', now()->addDays(90));
    }

    public function scopePrescriptionRequired($query)
    {
        return $query->where('prescription_required', true);
    }

    public function scopeControlledSubstance($query)
    {
        return $query->where('controlled_substance', true);
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
        return $this->expiry_date <= now()->addDays(90);
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

    public function getFormattedUnitPriceAttribute()
    {
        return '$' . number_format($this->unit_price, 2);
    }

    public function getFormattedSellingPriceAttribute()
    {
        return '$' . number_format($this->selling_price, 2);
    }
}
