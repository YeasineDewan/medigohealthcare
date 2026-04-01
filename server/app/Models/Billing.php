<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Billing extends Model
{
    use HasFactory;

    protected $fillable = [
        'patient_id',
        'doctor_id',
        'appointment_id',
        'bill_number',
        'amount',
        'description',
        'status',
        'due_date',
        'payment_method',
        'insurance_claim_number',
        'services',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'transaction_id',
        'payment_date',
        'payment_notes',
    ];

    protected $casts = [
        'services' => 'array',
        'tax_amount' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'due_date' => 'date',
        'payment_date' => 'date',
    ];

    protected $dates = ['created_at', 'updated_at'];

    /**
     * Get the patient for the bill
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Get the doctor for the bill
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }

    /**
     * Get the appointment for the bill
     */
    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }

    /**
     * Get bills by status
     */
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Get paid bills
     */
    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    /**
     * Get pending bills
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Get overdue bills
     */
    public function scopeOverdue($query)
    {
        return $query->where('status', 'overdue')
                    ->where('due_date', '<', now());
    }

    /**
     * Get refunded bills
     */
    public function scopeRefunded($query)
    {
        return $query->where('status', 'refunded');
    }

    /**
     * Get bills by date range
     */
    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('created_at', [$startDate, $endDate]);
    }

    /**
     * Get bills by month
     */
    public function scopeByMonth($query, $month, $year)
    {
        return $query->whereMonth('created_at', $month)
                    ->whereYear('created_at', $year);
    }

    /**
     * Get total amount sum
     */
    public function scopeTotalAmount($query)
    {
        return $query->sum('total_amount');
    }

    /**
     * Get paid amount sum
     */
    public function scopePaidAmount($query)
    {
        return $query->where('status', 'paid')->sum('total_amount');
    }

    /**
     * Get pending amount sum
     */
    public function scopePendingAmount($query)
    {
        return $query->where('status', 'pending')->sum('total_amount');
    }

    /**
     * Get overdue amount sum
     */
    public function scopeOverdueAmount($query)
    {
        return $query->where('status', 'overdue')->sum('total_amount');
    }
}
