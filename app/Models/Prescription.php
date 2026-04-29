<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prescription extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'prescription_id',
        'appointment_id',
        'patient_id',
        'doctor_id',
        'hospital_id',
        'prescription_date',
        'chief_complaint',
        'history',
        'examination',
        'diagnosis',
        'instructions',
        'follow_up',
        'medicines',
        'lab_tests',
        'imaging',
        'referrals',
        'signature_image',
        'qr_code',
        'status',
        'is_digitally_signed',
        'signed_at',
        'created_by',
    ];

    protected $casts = [
        'prescription_date' => 'date',
        'medicines' => 'array',
        'lab_tests' => 'array',
        'imaging' => 'array',
        'referrals' => 'array',
        'is_digitally_signed' => 'boolean',
        'signed_at' => 'datetime',
    ];

    // Relationships
    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }

    public function patient()
    {
        return $this->belongsTo(User::class, 'patient_id');
    }

    public function items()
    {
        return $this->hasMany(PrescriptionItem::class);
    }

    public function hospital()
    {
        return $this->belongsTo(Hospital::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Scopes
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeByDate($query, $date)
    {
        return $query->whereDate('prescription_date', $date);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('prescription_date', [$startDate, $endDate]);
    }

    public function scopeThisMonth($query)
    {
        return $query->whereMonth('prescription_date', now()->month)
                    ->whereYear('prescription_date', now()->year);
    }

    public function scopeThisYear($query)
    {
        return $query->whereYear('prescription_date', now()->year);
    }

    // Accessors
    public function getStatusLabelAttribute()
    {
        return match($this->status) {
            'draft' => 'Draft',
            'active' => 'Active',
            'completed' => 'Completed',
            'cancelled' => 'Cancelled',
            default => 'Unknown'
        };
    }

    public function getFormattedDateAttribute()
    {
        return $this->prescription_date ? $this->prescription_date->format('M d, Y') : null;
    }

    public function getQrCodeUrlAttribute()
    {
        if ($this->qr_code) {
            return asset('storage/' . $this->qr_code);
        }
        
        return null;
    }

    public function getSignatureUrlAttribute()
    {
        if ($this->signature_image) {
            return asset('storage/' . $this->signature_image);
        }
        
        return null;
    }

    public function getMedicineCountAttribute()
    {
        return count($this->medicines ?? []);
    }

    public function getLabTestCountAttribute()
    {
        return count($this->lab_tests ?? []);
    }

    public function getImagingCountAttribute()
    {
        return count($this->imaging ?? []);
    }

    // Methods
    public function isSigned()
    {
        return $this->is_digitally_signed;
    }

    public function sign()
    {
        $this->update([
            'is_digitally_signed' => true,
            'signed_at' => now()
        ]);
    }

    public function complete()
    {
        $this->update(['status' => 'completed']);
    }

    public function cancel()
    {
        $this->update(['status' => 'cancelled']);
    }

    public function addMedicine($medicine)
    {
        $medicines = $this->medicines ?? [];
        $medicines[] = $medicine;
        $this->update(['medicines' => $medicines]);
    }

    public function addLabTest($test)
    {
        $labTests = $this->lab_tests ?? [];
        $labTests[] = $test;
        $this->update(['lab_tests' => $labTests]);
    }

    public function addImaging($imaging)
    {
        $imagingTests = $this->imaging ?? [];
        $imagingTests[] = $imaging;
        $this->update(['imaging' => $imagingTests]);
    }

    public function addReferral($referral)
    {
        $referrals = $this->referrals ?? [];
        $referrals[] = $referral;
        $this->update(['referrals' => $referrals]);
    }

    public function hasMedicines()
    {
        return !empty($this->medicines);
    }

    public function hasLabTests()
    {
        return !empty($this->lab_tests);
    }

    public function hasImaging()
    {
        return !empty($this->imaging);
    }

    public function hasReferrals()
    {
        return !empty($this->referrals);
    }
}
