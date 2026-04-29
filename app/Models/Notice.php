<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notice extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'content',
        'type',
        'priority',
        'start_date',
        'end_date',
        'target_audience',
        'is_active',
        'allow_comments',
        'attachment_url',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'allow_comments' => 'boolean',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'target_audience' => 'array',
    ];

    // Relationships
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('start_date')
                  ->orWhere('start_date', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('end_date')
                  ->orWhere('end_date', '>=', now());
            });
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByPriority($query, $priority)
    {
        return $query->where('priority', $priority);
    }

    public function scopeForAudience($query, $audience)
    {
        return $query->whereJsonContains('target_audience', $audience);
    }

    public function scopeCurrentlyActive($query)
    {
        return $query->active()->orderBy('priority', 'desc')->orderBy('created_at', 'desc');
    }

    // Accessors
    public function getStatusLabelAttribute()
    {
        return $this->is_active ? 'Active' : 'Inactive';
    }

    public function getPriorityLabelAttribute()
    {
        return [
            'low' => 'Low Priority',
            'medium' => 'Medium Priority',
            'high' => 'High Priority',
            'critical' => 'Critical',
        ][$this->priority] ?? $this->priority;
    }

    public function getTypeLabelAttribute()
    {
        return [
            'general' => 'General Notice',
            'emergency' => 'Emergency Notice',
            'maintenance' => 'Maintenance Notice',
            'holiday' => 'Holiday Notice',
            'announcement' => 'Announcement',
        ][$this->type] ?? $this->type;
    }

    public function getFormattedPriorityAttribute()
    {
        return ucfirst($this->priority);
    }

    public function getFormattedTypeAttribute()
    {
        return ucfirst($this->type);
    }

    // Methods
    public function isActive()
    {
        if (!$this->is_active) {
            return false;
        }

        $now = now();

        if ($this->start_date && $now->lt($this->start_date)) {
            return false;
        }

        if ($this->end_date && $now->gt($this->end_date)) {
            return false;
        }

        return true;
    }

    public function isExpired()
    {
        return $this->end_date && now()->gt($this->end_date);
    }

    public function isScheduled()
    {
        return $this->start_date && now()->lt($this->start_date);
    }

    public function canBeViewedBy($user)
    {
        // If no target audience specified, everyone can view
        if (empty($this->target_audience)) {
            return true;
        }

        // Check if user's role is in target audience
        return in_array($user->role, $this->target_audience);
    }

    public function getPriorityColor()
    {
        return [
            'low' => 'gray',
            'medium' => 'blue',
            'high' => 'orange',
            'critical' => 'red',
        ][$this->priority] ?? 'gray';
    }

    public function getTypeColor()
    {
        return [
            'general' => 'blue',
            'emergency' => 'red',
            'maintenance' => 'yellow',
            'holiday' => 'green',
            'announcement' => 'purple',
        ][$this->type] ?? 'blue';
    }

    public function getDaysUntilExpiry()
    {
        if (!$this->end_date) {
            return null;
        }

        return now()->diffInDays($this->end_date, false);
    }

    public function getDaysUntilStart()
    {
        if (!$this->start_date) {
            return null;
        }

        return now()->diffInDays($this->start_date, false);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', '%' . $search . '%')
              ->orWhere('content', 'like', '%' . $search . '%');
        });
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($notice) {
            if (empty($notice->created_by)) {
                $notice->created_by = auth()->id();
            }
        });

        static::updating(function ($notice) {
            if (empty($notice->updated_by)) {
                $notice->updated_by = auth()->id();
            }
        });
    }
}

