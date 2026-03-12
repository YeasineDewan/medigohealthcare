<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LabTestCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
        'description',
        'department',
        'tests_count',
        'active_tests',
        'price_range',
        'avg_turnaround',
        'container_type',
        'volume',
        'instructions',
        'status',
        'requires_fasting',
        'accredited',
        'home_collection',
        'reports_available',
    ];

    protected $casts = [
        'price_range' => 'array',
        'requires_fasting' => 'boolean',
        'accredited' => 'boolean',
        'home_collection' => 'boolean',
    ];

    // Relationships
    public function labTests()
    {
        return $this->hasMany(LabTest::class, 'category');
    }
}
