<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'appointment_id',
        'patient_id',
        'doctor_id',
        'hospital_id',
        'type',
        'mode',
        'status',
        'priority',
        'appointment_datetime',
        'end_datetime',
        'duration_minutes',
        'consultation_fee',
        'paid_amount',
        'payment_status',
        'payment_method',
        'symptoms',
        'notes',
        'diagnosis',
        'prescription',
        'recommendations',
        'follow_up_instructions',
        'vital_signs',
        'attachments',
        'meeting_link',
        'meeting_room_id',
        'cancelled_at',
        'cancellation_reason',
        'completed_at',
        'cancelled_by',
        'completed_by',
        'feedback',
        'rating',
        'review',
        'reminded_at',
        'is_reminder_sent',
    ];

    protected $casts = [
        'appointment_datetime' => 'datetime',
        'end_datetime' => 'datetime',
        'duration_minutes' => 'integer',
        'consultation_fee' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'cancelled_at' => 'datetime',
        'completed_at' => 'datetime',
        'reminded_at' => 'datetime',
        'vital_signs' => 'array',
        'attachments' => 'array',
        'feedback' => 'array',
        'is_reminder_sent' => 'boolean',
    ];

    // Relationships
    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function prescription()
    {
        return $this->hasOne(Prescription::class);
    }

    public function medicalRecord()
    {
        return $this->hasOne(MedicalRecord::class);
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    public function prescription()
    {
        return $this->hasOne(Prescription::class);
    }

    public function cancelledByUser()
    {
        return $this->belongsTo(User::class, 'cancelled_by');
    }

    public function completedByUser()
    {
        return $this->belongsTo(User::class, 'completed_by');
    }

    // Scopes
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByMode($query, $mode)
    {
        return $query->where('mode', $mode);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    public function scopeUpcoming($query)
    {
        return $query->where('appointment_datetime', '>', now())
                    ->whereIn('status', ['pending', 'confirmed']);
    }

    public function scopePast($query)
    {
        return $query->where('appointment_datetime', '<', now())
                    ->whereIn('status', ['completed', 'cancelled']);
    }

    public function scopeToday($query)
    {
        return $query->whereDate('appointment_datetime', now());
    }

    public function scopeThisWeek($query)
    {
        return $query->whereBetween('appointment_datetime', [now()->startOfWeek(), now()->endOfWeek()]);
    }

    public function scopeThisMonth($query)
    {
        return $query->whereMonth('appointment_datetime', now()->month)
                    ->whereYear('appointment_datetime', now()->year);
    }

    public function scopeUnpaid($query)
    {
        return $query->where('payment_status', 'pending');
    }

    public function scopePaid($query)
    {
        return $query->where('payment_status', 'paid');
    }

    // Accessors
    public function getStatusLabelAttribute()
    {
        return match($this->status) {
            'pending' => 'Pending',
            'confirmed' => 'Confirmed',
            'in_progress' => 'In Progress',
            'completed' => 'Completed',
            'cancelled' => 'Cancelled',
            'no_show' => 'No Show',
            default => 'Unknown'
        };
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'pending' => 'yellow',
            'confirmed' => 'blue',
            'in_progress' => 'purple',
            'completed' => 'green',
            'cancelled' => 'red',
            'no_show' => 'orange',
            default => 'gray'
        };
    }

    public function getModeLabelAttribute()
    {
        return match($this->mode) {
            'in_person' => 'In Person',
            'video' => 'Video Call',
            'chat' => 'Chat',
            'phone' => 'Phone Call',
            default => 'Unknown'
        };
    }

    public function getTypeLabelAttribute()
    {
        return match($this->type) {
            'consultation' => 'Consultation',
            'follow_up' => 'Follow Up',
            'emergency' => 'Emergency',
            'surgery' => 'Surgery',
            'checkup' => 'Check Up',
            default => 'Unknown'
        };
    }

    public function getPriorityLabelAttribute()
    {
        return match($this->priority) {
            'low' => 'Low',
            'medium' => 'Medium',
            'high' => 'High',
            'urgent' => 'Urgent',
            default => 'Medium'
        };
    }

    public function getFormattedDateTimeAttribute()
    {
        return $this->appointment_datetime ? $this->appointment_datetime->format('M d, Y h:i A') : null;
    }

    public function getFormattedDateAttribute()
    {
        return $this->appointment_datetime ? $this->appointment_datetime->format('M d, Y') : null;
    }

    public function getFormattedTimeAttribute()
    {
        return $this->appointment_datetime ? $this->appointment_datetime->format('h:i A') : null;
    }

    public function getDurationInHoursAttribute()
    {
        return $this->duration_minutes ? $this->duration_minutes / 60 : 0.5;
    }

    public function getRemainingAmountAttribute()
    {
        return $this->consultation_fee - $this->paid_amount;
    }

    // Methods
    public function canBeCancelled()
    {
        return in_array($this->status, ['pending', 'confirmed']) && 
               $this->appointment_datetime > now()->addHours(24);
    }

    public function canBeRescheduled()
    {
        return in_array($this->status, ['pending', 'confirmed']) && 
               $this->appointment_datetime > now()->addHours(24);
    }

    public function isVideoCall()
    {
        return $this->mode === 'video';
    }

    public function isToday()
    {
        return $this->appointment_datetime && 
               $this->appointment_datetime->isToday();
    }

    public function isPast()
    {
        return $this->appointment_datetime && 
               $this->appointment_datetime->isPast();
    }

    public function isUpcoming()
    {
        return $this->appointment_datetime && 
               $this->appointment_datetime->isFuture();
    }

    public function isPaid()
    {
        return $this->payment_status === 'paid';
    }

    public function isCompleted()
    {
        return $this->status === 'completed';
    }

    public function isCancelled()
    {
        return $this->status === 'cancelled';
    }

    public function isInProgress()
    {
        return $this->status === 'in_progress';
    }

    public function cancel($reason = null)
    {
        $this->update([
            'status' => 'cancelled',
            'cancellation_reason' => $reason,
            'cancelled_at' => now(),
            'cancelled_by' => auth()->id()
        ]);
    }

    public function complete()
    {
        $this->update([
            'status' => 'completed',
            'completed_at' => now(),
            'completed_by' => auth()->id()
        ]);
    }

    public function confirm()
    {
        $this->update(['status' => 'confirmed']);
    }

    public function start()
    {
        $this->update(['status' => 'in_progress']);
    }

    public function markAsNoShow()
    {
        $this->update(['status' => 'no_show']);
    }
}
