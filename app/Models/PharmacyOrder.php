<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PharmacyOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'order_number',
        'patient_id',
        'doctor_id',
        'prescription_id',
        'status',
        'payment_status',
        'subtotal',
        'tax',
        'total',
        'notes',
        'order_date',
        'processed_date',
        'completed_date',
        'cancelled_date'
    ];

    protected $casts = [
        'order_date' => 'datetime',
        'processed_date' => 'datetime',
        'completed_date' => 'datetime',
        'cancelled_date' => 'datetime',
        'subtotal' => 'decimal:2',
        'tax' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    // Relationships
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }

    public function prescription()
    {
        return $this->belongsTo(Prescription::class);
    }

    public function items()
    {
        return $this->hasMany(PharmacyOrderItem::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeProcessing($query)
    {
        return $query->where('status', 'processing');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    public function scopePaid($query)
    {
        return $query->where('payment_status', 'paid');
    }

    public function scopeUnpaid($query)
    {
        return $query->where('payment_status', 'pending');
    }

    // Accessors
    public function getFormattedTotalAttribute()
    {
        return '$' . number_format($this->total, 2);
    }

    public function getFormattedSubtotalAttribute()
    {
        return '$' . number_format($this->subtotal, 2);
    }

    public function getFormattedTaxAttribute()
    {
        return '$' . number_format($this->tax, 2);
    }

    // Methods
    public function markAsProcessing()
    {
        $this->status = 'processing';
        $this->processed_date = now();
        $this->save();
    }

    public function markAsCompleted()
    {
        $this->status = 'completed';
        $this->completed_date = now();
        $this->save();
    }

    public function markAsCancelled()
    {
        $this->status = 'cancelled';
        $this->cancelled_date = now();
        $this->save();
    }

    public function markAsPaid()
    {
        $this->payment_status = 'paid';
        $this->save();
    }
}
