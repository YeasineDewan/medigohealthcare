<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'icon_svg',
        'icon',
        'route_url',
        'description',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
