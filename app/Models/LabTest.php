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
        'category_id',
        'test_type',
        'price',
        'discount_price',
        'preparation_instructions',
        'procedure_description',
        'normal_range',
        'abnormal_indications',
        'is_home_collection',
        'home_collection_fee',
        'sample_collection_time',
        'result_time',
        'required_preparations',
        'sample_types',
        'parameters',
        'images',
        'rating',
        'review_count',
        'booking_count',
        'is_active',
        'is_featured',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'home_collection_fee' => 'decimal:2',
        'sample_collection_time' => 'integer',
        'result_time' => 'integer',
        'is_home_collection' => 'boolean',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'required_preparations' => 'array',
        'sample_types' => 'array',
        'parameters' => 'array',
        'images' => 'array',
    ];

    // Relationships
    public function bookings()
    {
        return $this->hasMany(LabTestBooking::class);
    }
}
