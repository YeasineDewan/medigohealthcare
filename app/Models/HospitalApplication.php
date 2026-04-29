<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class HospitalApplication extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'hospital_name',
        'hospital_type',
        'established_year',
        'registration_number',
        'contact_person_name',
        'contact_person_designation',
        'email',
        'phone',
        'alternate_phone',
        'address',
        'city',
        'district',
        'postal_code',
        'total_beds',
        'icu_beds',
        'emergency_beds',
        'emergency_services',
        'specializations',
        'departments',
        'facilities',
        'medical_equipment',
        'social_media',
        'achievements',
        'awards',
        'accreditations',
        'partnerships',
        'bank_details',
        'emergency_contact',
        'technical_contact',
        'services_offered',
        'integration_capabilities',
        'website',
        'about',
        'mission',
        'vision',
        'documents_paths',
        'status',
        'rejection_reason',
        'admin_notes',
        'reviewed_at',
        'reviewed_by',
        'site_visit_scheduled_at',
        'site_visit_conducted_by'
    ];

    protected $casts = [
        'established_year' => 'integer',
        'total_beds' => 'integer',
        'icu_beds' => 'integer',
        'emergency_beds' => 'integer',
        'emergency_services' => 'array',
        'specializations' => 'array',
        'departments' => 'array',
        'facilities' => 'array',
        'medical_equipment' => 'array',
        'social_media' => 'array',
        'achievements' => 'array',
        'awards' => 'array',
        'accreditations' => 'array',
        'partnerships' => 'array',
        'bank_details' => 'array',
        'emergency_contact' => 'array',
        'technical_contact' => 'array',
        'services_offered' => 'array',
        'integration_capabilities' => 'array',
        'documents_paths' => 'array',
        'reviewed_at' => 'datetime',
        'site_visit_scheduled_at' => 'datetime',
    ];

    // Relationships
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function siteVisitConductor()
    {
        return $this->belongsTo(User::class, 'site_visit_conducted_by');
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

    public function scopeSiteVisitRequired($query)
    {
        return $query->where('status', 'site_visit_required');
    }

    public function scopeByCity($query, $city)
    {
        return $query->where('city', $city);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('hospital_type', $type);
    }

    // Accessors
    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'pending' => 'yellow',
            'under_review' => 'blue',
            'approved' => 'green',
            'rejected' => 'red',
            'needs_more_info' => 'orange',
            'site_visit_required' => 'purple',
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
            'site_visit_required' => 'Site Visit Required',
            default => 'Unknown'
        };
    }

    public function getHospitalTypeLabelAttribute()
    {
        return match($this->hospital_type) {
            'government' => 'Government Hospital',
            'private' => 'Private Hospital',
            'non_profit' => 'Non-Profit Hospital',
            'specialty' => 'Specialty Hospital',
            default => 'Unknown'
        };
    }

    public function getTotalCapacityAttribute()
    {
        return $this->total_beds + $this->icu_beds + $this->emergency_beds;
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

    public function scheduleSiteVisit(\DateTime $scheduledAt, User $reviewer = null)
    {
        $this->update([
            'status' => 'site_visit_required',
            'site_visit_scheduled_at' => $scheduledAt,
            'reviewed_at' => now(),
            'reviewed_by' => $reviewer?->id
        ]);
    }

    public function conductSiteVisit(User $conductor, string $notes = null)
    {
        $this->update([
            'site_visit_conducted_by' => $conductor->id,
            'admin_notes' => $notes,
            'status' => 'under_review'
        ]);
    }
}
