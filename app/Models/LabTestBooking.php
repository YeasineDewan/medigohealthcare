<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LabTestBooking extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'booking_number',
        'lab_test_id',
        'patient_id',
        'user_id',
        'booking_date',
        'booking_time',
        'is_home_collection',
        'collection_address',
        'collection_city',
        'collection_phone',
        'doctor_referral',
        'medical_history',
        'current_medications',
        'allergies',
        'special_instructions',
        'test_price',
        'discount_amount',
        'collection_fee',
        'total_amount',
        'currency',
        'payment_method',
        'payment_status',
        'payment_transaction_id',
        'status',
        'collection_notes',
        'sample_collected_at',
        'processing_started_at',
        'completed_at',
        'result_delivered_at',
        'result_file_path',
        'result_notes',
        'admin_notes',
        'cancelled_at',
        'cancellation_reason',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'booking_date' => 'date',
        'is_home_collection' => 'boolean',
        'current_medications' => 'array',
        'allergies' => 'array',
        'test_price' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'collection_fee' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'sample_collected_at' => 'datetime',
        'processing_started_at' => 'datetime',
        'completed_at' => 'datetime',
        'result_delivered_at' => 'datetime',
        'cancelled_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function labTest()
    {
        return $this->belongsTo(LabTest::class);
    }

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeConfirmed($query)
    {
        return $query->where('status', 'confirmed');
    }

    public function scopeSampleCollected($query)
    {
        return $query->where('status', 'sample_collected');
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
        return $query->where('payment_status', 'unpaid');
    }

    public function scopeHomeCollection($query)
    {
        return $query->where('is_home_collection', true);
    }

    public function scopeByDate($query, $date)
    {
        return $query->whereDate('booking_date', $date);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('booking_date', [$startDate, $endDate]);
    }

    // Accessors
    public function getStatusLabelAttribute()
    {
        return [
            'pending' => 'Pending Confirmation',
            'confirmed' => 'Confirmed',
            'sample_collected' => 'Sample Collected',
            'processing' => 'Processing',
            'completed' => 'Completed',
            'cancelled' => 'Cancelled',
        ][$this->status] ?? $this->status;
    }

    public function getPaymentStatusLabelAttribute()
    {
        return [
            'pending' => 'Pending Payment',
            'paid' => 'Paid',
            'refunded' => 'Refunded',
            'failed' => 'Payment Failed',
        ][$this->payment_status] ?? $this->payment_status;
    }

    public function getFormattedTotalAmountAttribute()
    {
        return number_format($this->total_amount, 2) . ' ' . $this->currency;
    }

    public function getCollectionTypeLabelAttribute()
    {
        return $this->is_home_collection ? 'Home Collection' : 'Lab Visit';
    }

    // Methods
    public function canBeConfirmed()
    {
        return $this->status === 'pending';
    }

    public function canBeCollected()
    {
        return $this->status === 'confirmed';
    }

    public function canBeProcessed()
    {
        return $this->status === 'sample_collected';
    }

    public function canBeCompleted()
    {
        return $this->status === 'processing';
    }

    public function canBeCancelled()
    {
        return in_array($this->status, ['pending', 'confirmed']);
    }

    public function confirm()
    {
        if (!$this->canBeConfirmed()) {
            return false;
        }

        $this->status = 'confirmed';
        $this->confirmed_at = now();
        return $this->save();
    }

    public function markSampleCollected($notes = null)
    {
        if (!$this->canBeCollected()) {
            return false;
        }

        $this->status = 'sample_collected';
        $this->sample_collected_at = now();
        if ($notes) {
            $this->collection_notes = $notes;
        }
        return $this->save();
    }

    public function startProcessing()
    {
        if (!$this->canBeProcessed()) {
            return false;
        }

        $this->status = 'processing';
        $this->processing_started_at = now();
        return $this->save();
    }

    public function complete($resultFilePath = null, $resultNotes = null)
    {
        if (!$this->canBeCompleted()) {
            return false;
        }

        $this->status = 'completed';
        $this->completed_at = now();
        $this->result_delivered_at = now();
        
        if ($resultFilePath) {
            $this->result_file_path = $resultFilePath;
        }
        
        if ($resultNotes) {
            $this->result_notes = $resultNotes;
        }
        
        return $this->save();
    }

    public function cancel($reason = null)
    {
        if (!$this->canBeCancelled()) {
            return false;
        }

        $this->status = 'cancelled';
        $this->cancelled_at = now();
        if ($reason) {
            $this->cancellation_reason = $reason;
        }
        return $this->save();
    }

    public function markAsPaid($transactionId = null)
    {
        $this->payment_status = 'paid';
        if ($transactionId) {
            $this->payment_transaction_id = $transactionId;
        }
        return $this->save();
    }

    public function getTimeline()
    {
        $timeline = [];

        $timeline[] = [
            'status' => 'pending',
            'title' => 'Booking Created',
            'description' => 'Lab test booking has been created',
            'timestamp' => $this->created_at,
            'completed' => true
        ];

        if ($this->confirmed_at) {
            $timeline[] = [
                'status' => 'confirmed',
                'title' => 'Booking Confirmed',
                'description' => 'Your lab test booking has been confirmed',
                'timestamp' => $this->confirmed_at,
                'completed' => true
            ];
        }

        if ($this->sample_collected_at) {
            $timeline[] = [
                'status' => 'sample_collected',
                'title' => 'Sample Collected',
                'description' => 'Sample has been collected for testing',
                'timestamp' => $this->sample_collected_at,
                'completed' => true
            ];
        }

        if ($this->processing_started_at) {
            $timeline[] = [
                'status' => 'processing',
                'title' => 'Processing Started',
                'description' => 'Lab test processing has started',
                'timestamp' => $this->processing_started_at,
                'completed' => true
            ];
        }

        if ($this->completed_at) {
            $timeline[] = [
                'status' => 'completed',
                'title' => 'Test Completed',
                'description' => 'Lab test has been completed',
                'timestamp' => $this->completed_at,
                'completed' => true
            ];
        }

        if ($this->result_delivered_at) {
            $timeline[] = [
                'status' => 'delivered',
                'title' => 'Results Delivered',
                'description' => 'Test results have been delivered',
                'timestamp' => $this->result_delivered_at,
                'completed' => true
            ];
        }

        if ($this->cancelled_at) {
            $timeline[] = [
                'status' => 'cancelled',
                'title' => 'Booking Cancelled',
                'description' => $this->cancellation_reason ?? 'Booking was cancelled',
                'timestamp' => $this->cancelled_at,
                'completed' => true
            ];
        }

        return $timeline;
    }

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($booking) {
            if (!$booking->booking_number) {
                $booking->booking_number = 'LAB' . date('Ymd') . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
            }
            if (!$booking->currency) {
                $booking->currency = 'BDT';
            }
        });
    }
}
