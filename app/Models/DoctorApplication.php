<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DoctorApplication extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'gender',
        'specialization',
        'sub_specialization',
        'experience_years',
        'qualification',
        'post_graduation',
        'bmdc_number',
        'bmdc_registration_date',
        'current_hospital',
        'designation',
        'consultation_fee',
        'online_consultation_fee',
        'availability',
        'languages',
        'services',
        'achievements',
        'publications',
        'memberships',
        'bank_account',
        'emergency_contact',
        'social_links',
        'preferences',
        'profile_photo_path',
        'certificates_paths',
        'identity_document_path',
        'about',
        'status',
        'rejection_reason',
        'admin_notes',
        'reviewed_at',
        'reviewed_by'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'bmdc_registration_date' => 'date',
        'consultation_fee' => 'decimal:2',
        'online_consultation_fee' => 'decimal:2',
        'availability' => 'array',
        'languages' => 'array',
        'services' => 'array',
        'achievements' => 'array',
        'publications' => 'array',
        'memberships' => 'array',
        'bank_account' => 'array',
        'emergency_contact' => 'array',
        'social_links' => 'array',
        'preferences' => 'array',
        'certificates_paths' => 'array',
        'reviewed_at' => 'datetime',
    ];

    // Relationships
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeRejected($query)
    {
        return $query->where('status', 'rejected');
    }

    public function scopeUnderReview($query)
    {
        return $query->where('status', 'under_review');
    }

    // Accessors
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'pending' => 'yellow',
            'under_review' => 'blue',
            'approved' => 'green',
            'rejected' => 'red',
            'needs_more_info' => 'orange',
            default => 'gray'
        };
    }

    public function getStatusLabelAttribute()
    {
        return match($this->status) {
            'pending' => 'Pending Review',
            'under_review' => 'Under Review',
            'approved' => 'Approved',
            'rejected' => 'Rejected',
            'needs_more_info' => 'Needs More Information',
            default => 'Unknown'
        };
    }

    // Methods
    public function approve(User $reviewer = null, string $notes = null)
    {
        $this->update([
            'status' => 'approved',
            'reviewed_at' => now(),
            'reviewed_by' => $reviewer?->id,
            'admin_notes' => $notes
        ]);
    }

    public function reject(string $reason, User $reviewer = null)
    {
        $this->update([
            'status' => 'rejected',
            'rejection_reason' => $reason,
            'reviewed_at' => now(),
            'reviewed_by' => $reviewer?->id
        ]);
    }

    public function requestMoreInfo(string $notes, User $reviewer = null)
    {
        $this->update([
            'status' => 'needs_more_info',
            'admin_notes' => $notes,
            'reviewed_at' => now(),
            'reviewed_by' => $reviewer?->id
        ]);
    }

    public function markUnderReview(User $reviewer = null)
    {
        $this->update([
            'status' => 'under_review',
            'reviewed_at' => now(),
            'reviewed_by' => $reviewer?->id
        ]);
    }
}
