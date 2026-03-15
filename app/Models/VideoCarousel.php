<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoCarousel extends Model
{
    protected $table = 'video_carousel';

    protected $fillable = [
        'title',
        'description',
        'video_url',
        'thumbnail_url',
        'category',
        'status',
        'display_order',
        'autoplay',
        'mute',
        'loop',
        'show_controls',
        'featured',
        'display_pages',
        'tags',
        'views',
        'likes',
        'shares',
        'duration',
    ];

    protected $casts = [
        'autoplay' => 'boolean',
        'mute' => 'boolean',
        'loop' => 'boolean',
        'show_controls' => 'boolean',
        'featured' => 'boolean',
        'display_pages' => 'array',
        'tags' => 'array',
        'views' => 'integer',
        'likes' => 'integer',
        'shares' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeForPage($query, string $page)
    {
        return $query->whereJsonContains('display_pages', $page);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    /**
     * Format for frontend carousel (public API).
     */
    public function toCarouselItem(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description ?? '',
            'url' => $this->video_url,
            'thumbnail' => $this->thumbnail_url,
            'category' => $this->category,
            'status' => $this->status,
            'order' => (int) $this->display_order,
            'autoplay' => $this->autoplay,
            'mute' => $this->mute,
            'loop' => $this->loop,
            'showControls' => $this->show_controls,
            'featured' => $this->featured,
            'displayPages' => $this->display_pages ?? [],
            'tags' => $this->tags ?? [],
            'views' => (int) $this->views,
            'likes' => (int) $this->likes,
            'shares' => (int) $this->shares,
            'duration' => $this->duration,
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
        ];
    }
}
