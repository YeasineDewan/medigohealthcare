<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Banner extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'image',
        'background_color',
        'cta_text',
        'cta_link',
        'display_order',
        'active',
        'type',
        'start_date',
        'end_date'
    ];

    protected $casts = [
        'active' => 'boolean',
        'start_date' => 'date',
        'end_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true)
            ->where(function ($q) {
                $q->whereNull('start_date')
                  ->orWhere('start_date', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('end_date')
                  ->orWhere('end_date', '>=', now());
            })
            ->orderBy('display_order');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }
}
