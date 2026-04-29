<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Hospital extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'type',
        'registration_number',
        'established_year',
        'description',
        'logo',
        'banner_image',
        'address',
        'city',
        'district',
        'postal_code',
        'phone',
        'email',
        'website',
        'social_media',
        'facilities',
        'specializations',
        'departments',
        'services',
        'equipment',
        'total_beds',
        'icu_beds',
        'emergency_beds',
        'emergency_services',
        'accreditations',
        'awards',
        'rating',
        'review_count',
        'working_hours',
        'contact_person',
        'contact_person_designation',
        'status',
        'is_featured',
        'is_verified',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'established_year' => 'integer',
        'social_media' => 'array',
        'facilities' => 'array',
        'specializations' => 'array',
        'departments' => 'array',
        'services' => 'array',
        'equipment' => 'array',
        'total_beds' => 'integer',
        'icu_beds' => 'integer',
        'emergency_beds' => 'integer',
        'emergency_services' => 'array',
        'accreditations' => 'array',
        'awards' => 'array',
        'rating' => 'decimal:2',
        'review_count' => 'integer',
        'working_hours' => 'array',
        'is_featured' => 'boolean',
        'is_verified' => 'boolean',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    // Relationships
    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function prescriptions()
    {
        return $this->hasMany(Prescription::class);
    }

    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }

    public function labTests()
    {
        return $this->hasMany(LabTest::class);
    }

    public function labTestBookings()
    {
        return $this->hasMany(LabTestBooking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function hospitalApplications()
    {
        return $this->hasMany(HospitalApplication::class, 'email', 'email');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByCity($query, $city)
    {
        return $query->where('city', $city);
    }

    public function scopeByDistrict($query, $district)
    {
        return $query->where('district', $district);
    }

    public function scopeWithSpecialization($query, $specialization)
    {
        return $query->whereJsonContains('specializations', $specialization);
    }

    public function scopeWithEmergencyServices($query)
    {
        return $query->whereJsonLength('emergency_services', '>', 0);
    }

    // Accessors
    public function getTypeLabelAttribute()
    {
        return match($this->type) {
            'government' => 'Government Hospital',
            'private' => 'Private Hospital',
            'non_profit' => 'Non-Profit Hospital',
            'specialty' => 'Specialty Hospital',
            default => 'Unknown'
        };
    }

    public function getStatusLabelAttribute()
    {
        return match($this->status) {
            'active' => 'Active',
            'inactive' => 'Inactive',
            'pending' => 'Pending',
            default => 'Unknown'
        };
    }

    public function getTotalCapacityAttribute()
    {
        return $this->total_beds + $this->icu_beds + $this->emergency_beds;
    }

    public function getLogoUrlAttribute()
    {
        if ($this->logo) {
            return asset('storage/' . $this->logo);
        }
        
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=165028&background=F3F4F6&size=128';
    }

    public function getBannerUrlAttribute()
    {
        if ($this->banner_image) {
            return asset('storage/' . $this->banner_image);
        }
        
        return 'https://via.placeholder.com/1200x400/165028/FFFFFF?text=' . urlencode($this->name);
    }

    public function getFormattedPhoneAttribute()
    {
        return '+880 ' . substr($this->phone, -10);
    }

    public function getWebsiteUrlAttribute()
    {
        if ($this->website) {
            return starts_with($this->website, 'http') ? $this->website : 'https://' . $this->website;
        }
        
        return null;
    }

    public function getAverageRatingAttribute()
    {
        return $this->rating ?: 0;
    }

    // Methods
    public function hasSpecialization($specialization)
    {
        return in_array($specialization, $this->specializations ?? []);
    }

    public function hasFacility($facility)
    {
        return in_array($facility, $this->facilities ?? []);
    }

    public function hasEmergencyService($service)
    {
        return in_array($service, $this->emergency_services ?? []);
    }

    public function isActiveToday()
    {
        if (!$this->working_hours) {
            return true; // Assume active if no specific hours
        }

        $today = now()->format('l');
        $currentTime = now()->format('H:i');

        if (isset($this->working_hours[$today])) {
            $hours = $this->working_hours[$today];
            return $currentTime >= $hours['open'] && $currentTime <= $hours['close'];
        }

        return false;
    }

    public function getAvailableBeds()
    {
        // This would typically be calculated based on current occupancy
        return $this->total_beds;
    }

    public function getAvailableIcuBeds()
    {
        return $this->icu_beds;
    }

    public function updateRating()
    {
        $averageRating = $this->reviews()->avg('rating');
        $reviewCount = $this->reviews()->count();

        $this->update([
            'rating' => $averageRating ?: 0,
            'review_count' => $reviewCount
        ]);
    }

    public function getDistanceFrom($latitude, $longitude)
    {
        if (!$this->latitude || !$this->longitude) {
            return null;
        }

        $earthRadius = 6371; // Earth's radius in kilometers

        $latFrom = deg2rad($latitude);
        $lonFrom = deg2rad($longitude);
        $latTo = deg2rad($this->latitude);
        $lonTo = deg2rad($this->longitude);

        $latDelta = $latTo - $latFrom;
        $lonDelta = $lonTo - $lonFrom;

        $a = sin($latDelta / 2) * sin($latDelta / 2) +
             cos($latFrom) * cos($latTo) *
             sin($lonDelta / 2) * sin($lonDelta / 2);
        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }
}
