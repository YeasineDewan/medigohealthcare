<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_number',
        'user_id',
        'patient_id',
        'subtotal',
        'discount_amount',
        'delivery_fee',
        'tax_amount',
        'total_amount',
        'currency',
        'status',
        'payment_status',
        'payment_method',
        'shipping_phone',
        'shipping_email',
        'shipping_address',
        'shipping_city',
        'shipping_district',
        'shipping_postal_code',
        'order_notes',
        'admin_notes',
        'tracking_number',
        'courier_service',
        'items',
        'payment_details',
        'created_by',
        'confirmed_at',
        'processed_at',
        'cancelled_at',
        'cancellation_reason',
        'shipped_at',
        'delivered_at',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'tax_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'items' => 'array',
        'payment_details' => 'array',
        'confirmed_at' => 'datetime',
        'processed_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'shipped_at' => 'datetime',
        'delivered_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($order) {
            if (!$order->order_number) {
                $order->order_number = 'ORD-' . strtoupper(uniqid());
            }
        });
    }
}
