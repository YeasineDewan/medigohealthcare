<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmergencyService extends Model
{
    protected $fillable = [
        'title',
        'description',
        'icon',
        'icon_svg',
        'bg_color_hex',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
