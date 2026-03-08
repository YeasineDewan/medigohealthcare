<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'medical_device_id',
        'type',
        'description',
        'cost',
        'maintenance_date',
        'next_maintenance_date',
        'performed_by',
        'status',
        'notes',
        'user_id'
    ];

    protected $casts = [
        'maintenance_date' => 'datetime',
        'next_maintenance_date' => 'datetime',
        'cost' => 'decimal:2',
    ];

    // Relationships
    public function medicalDevice()
    {
        return $this->belongsTo(MedicalDevice::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Scopes
    public function scopeRoutine($query)
    {
        return $query->where('type', 'routine');
    }

    public function scopeRepair($query)
    {
        return $query->where('type', 'repair');
    }

    public function scopeCalibration($query)
    {
        return $query->where('type', 'calibration');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    // Accessors
    public function getFormattedCostAttribute()
    {
        return '$' . number_format($this->cost, 2);
    }

    public function getTypeLabelAttribute()
    {
        return ucfirst($this->type);
    }

    public function getStatusLabelAttribute()
    {
        return ucfirst($this->status);
    }
}
