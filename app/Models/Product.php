<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'generic_name',
        'brand_name',
        'category_id',
        'manufacturer',
        'sku',
        'barcode',
        'type',
        'dosage_form',
        'strength',
        'pack_size',
        'price',
        'original_price',
        'discount_percentage',
        'is_prescription_required',
        'is_otc',
        'stock_quantity',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'discount_percentage' => 'decimal:2',
        'is_prescription_required' => 'boolean',
        'is_otc' => 'boolean',
        'is_active' => 'boolean',
    ];

    // Relationships
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function reviews()
    {
        return $this->morphMany(Review::class, 'reviewable');
    }

    public function inventory()
    {
        return $this->hasMany(Inventory::class);
    }
}
