<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LabTest extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'category',
        'price',
        'discount_price',
        'sample_type',
        'preparation',
        'duration',
        'fasting_required',
        'home_collection',
        'report_time',
        'parameters',
        'includes',
        'why_test',
        'is_popular',
        'is_active',
    ];

    protected $casts = [
        'parameters' => 'array',
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'home_collection' => 'boolean',
        'is_popular' => 'boolean',
        'is_active' => 'boolean',
    ];

    // Relationships
    public function bookings()
    {
        return $this->hasMany(LabTestBooking::class);
    }
}
