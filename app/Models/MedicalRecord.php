<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MedicalRecord extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'record_id',
        'patient_id',
        'doctor_id',
        'hospital_id',
        'record_type',
        'record_date',
        'title',
        'description',
        'vital_signs',
        'symptoms',
        'diagnosis',
        'treatment',
        'medications',
        'notes',
        'attachments',
        'lab_results',
        'imaging_results',
        'urgency_level',
        'status',
        'is_confidential',
        'requires_follow_up',
        'follow_up_date',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'vital_signs' => 'array',
        'symptoms' => 'array',
        'attachments' => 'array',
        'lab_results' => 'array',
        'imaging_results' => 'array',
        'record_date' => 'date',
        'follow_up_date' => 'date',
        'is_confidential' => 'boolean',
        'requires_follow_up' => 'boolean',
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

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Scopes
    public function scopeByType($query, $type)
    {
        return $query->where('record_type', $type);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeArchived($query)
    {
        return $query->where('status', 'archived');
    }

    public function scopeConfidential($query)
    {
        return $query->where('is_confidential', true);
    }

    public function scopeRequiresFollowUp($query)
    {
        return $query->where('requires_follow_up', true);
    }

    public function scopeByUrgency($query, $urgency)
    {
        return $query->where('urgency_level', $urgency);
    }

    public function scopeByDate($query, $date)
    {
        return $query->whereDate('record_date', $date);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('record_date', [$startDate, $endDate]);
    }

    public function scopeThisMonth($query)
    {
        return $query->whereMonth('record_date', now()->month)
                    ->whereYear('record_date', now()->year);
    }

    public function scopeThisYear($query)
    {
        return $query->whereYear('record_date', now()->year);
    }

    // Accessors
    public function getTypeLabelAttribute()
    {
        return match($this->record_type) {
            'consultation' => 'Consultation',
            'lab_result' => 'Lab Result',
            'imaging' => 'Imaging',
            'biopsy' => 'Biopsy',
            'genetic' => 'Genetic Test',
            'surgery' => 'Surgery',
            'vaccination' => 'Vaccination',
            'admission' => 'Admission',
            'discharge' => 'Discharge',
            default => 'Other'
        };
    }

    public function getStatusLabelAttribute()
    {
        return match($this->status) {
            'active' => 'Active',
            'archived' => 'Archived',
            'deleted' => 'Deleted',
            default => 'Unknown'
        };
    }

    public function getUrgencyLabelAttribute()
    {
        return match($this->urgency_level) {
            'routine' => 'Routine',
            'urgent' => 'Urgent',
            'emergency' => 'Emergency',
            default => 'Routine'
        };
    }

    public function getFormattedDateAttribute()
    {
        return $this->record_date ? $this->record_date->format('M d, Y') : null;
    }

    public function getAttachmentCountAttribute()
    {
        return count($this->attachments ?? []);
    }

    public function getLabResultCountAttribute()
    {
        return count($this->lab_results ?? []);
    }

    public function getImagingResultCountAttribute()
    {
        return count($this->imaging_results ?? []);
    }

    public function getSymptomCountAttribute()
    {
        return count($this->symptoms ?? []);
    }

    // Methods
    public function isConfidential()
    {
        return $this->is_confidential;
    }

    public function requiresFollowUp()
    {
        return $this->requires_follow_up;
    }

    public function isOverdueForFollowUp()
    {
        return $this->requires_follow_up && 
               $this->follow_up_date && 
               $this->follow_up_date->isPast();
    }

    public function archive()
    {
        $this->update(['status' => 'archived']);
    }

    public function activate()
    {
        $this->update(['status' => 'active']);
    }

    public function addAttachment($attachment)
    {
        $attachments = $this->attachments ?? [];
        $attachments[] = $attachment;
        $this->update(['attachments' => $attachments]);
    }

    public function addLabResult($result)
    {
        $labResults = $this->lab_results ?? [];
        $labResults[] = $result;
        $this->update(['lab_results' => $labResults]);
    }

    public function addImagingResult($result)
    {
        $imagingResults = $this->imaging_results ?? [];
        $imagingResults[] = $result;
        $this->update(['imaging_results' => $imagingResults]);
    }

    public function addSymptom($symptom)
    {
        $symptoms = $this->symptoms ?? [];
        $symptoms[] = $symptom;
        $this->update(['symptoms' => $symptoms]);
    }

    public function hasAttachments()
    {
        return !empty($this->attachments);
    }

    public function hasLabResults()
    {
        return !empty($this->lab_results);
    }

    public function hasImagingResults()
    {
        return !empty($this->imaging_results);
    }

    public function hasVitalSigns()
    {
        return !empty($this->vital_signs);
    }

    public function hasSymptoms()
    {
        return !empty($this->symptoms);
    }

    public function getVitalSign($key)
    {
        return $this->vital_signs[$key] ?? null;
    }

    public function setVitalSign($key, $value)
    {
        $vitalSigns = $this->vital_signs ?? [];
        $vitalSigns[$key] = $value;
        $this->update(['vital_signs' => $vitalSigns]);
    }
}
