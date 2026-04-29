<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class ProductCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'icon',
        'parent_id',
        'is_active',
        'is_featured',
        'display_order',
        'meta_title',
        'meta_description',
        'seo_keywords',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'display_order' => 'integer',
        'seo_keywords' => 'array',
    ];

    // Relationships
    public function products()
    {
        return $this->hasMany(Product::class, 'category_id');
    }

    public function activeProducts()
    {
        return $this->hasMany(Product::class, 'category_id')->where('is_active', true);
    }

    public function parent()
    {
        return $this->belongsTo(ProductCategory::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(ProductCategory::class, 'parent_id')->orderBy('display_order', 'asc')->orderBy('name', 'asc');
    }

    public function activeChildren()
    {
        return $this->hasMany(ProductCategory::class, 'parent_id')->where('is_active', true)->orderBy('display_order', 'asc')->orderBy('name', 'asc');
    }

    public function allChildren()
    {
        return $this->children()->with('allChildren');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeParent($query)
    {
        return $query->whereNull('parent_id');
    }

    public function scopeChild($query)
    {
        return $query->whereNotNull('parent_id');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order', 'asc')->orderBy('name', 'asc');
    }

    public function scopeByName($query)
    {
        return $query->orderBy('name', 'asc');
    }

    public function scopeByProductCount($query)
    {
        return $query->withCount('activeProducts')->orderBy('active_products_count', 'desc');
    }

    // Accessors
    public function getProductCountAttribute()
    {
        return $this->activeProducts()->count();
    }

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return asset('storage/' . $this->image);
        }
        return asset('images/default-category.jpg');
    }

    public function getIconUrlAttribute()
    {
        if ($this->icon) {
            return asset('storage/' . $this->icon);
        }
        return null;
    }

    public function getFullSlugAttribute()
    {
        if ($this->parent) {
            return $this->parent->slug . '/' . $this->slug;
        }
        return $this->slug;
    }

    public function getFullNameAttribute()
    {
        if ($this->parent) {
            return $this->parent->name . ' > ' . $this->name;
        }
        return $this->name;
    }

    public function getBreadcrumbAttribute()
    {
        $breadcrumb = [];
        $current = $this;
        
        while ($current) {
            array_unshift($breadcrumb, [
                'name' => $current->name,
                'slug' => $current->slug,
                'id' => $current->id
            ]);
            $current = $current->parent;
        }
        
        return $breadcrumb;
    }

    // Methods
    public function hasChildren()
    {
        return $this->children()->where('is_active', true)->count() > 0;
    }

    public function isParent()
    {
        return is_null($this->parent_id);
    }

    public function isChild()
    {
        return !is_null($this->parent_id);
    }

    public function getLevel()
    {
        $level = 0;
        $parent = $this->parent;
        
        while ($parent) {
            $level++;
            $parent = $parent->parent;
        }
        
        return $level;
    }

    public function getAllDescendants()
    {
        $descendants = collect();
        
        foreach ($this->children as $child) {
            $descendants->push($child);
            $descendants = $descendants->merge($child->getAllDescendants());
        }
        
        return $descendants;
    }

    public function getAllProducts()
    {
        $productIds = $this->activeProducts()->pluck('id');
        
        foreach ($this->getAllDescendants() as $descendant) {
            $productIds = $productIds->merge($descendant->activeProducts()->pluck('id'));
        }
        
        return Product::whereIn('id', $productIds->unique())->where('is_active', true);
    }

    public function canDelete()
    {
        // Check if category has active products
        if ($this->activeProducts()->count() > 0) {
            return false;
        }
        
        // Check if category has active children
        if ($this->activeChildren()->count() > 0) {
            return false;
        }
        
        return true;
    }

    public function updateProductCount()
    {
        $this->product_count = $this->activeProducts()->count();
        $this->save();
    }

    public static function createWithSlug(array $data)
    {
        if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        
        // Ensure unique slug
        $originalSlug = $data['slug'];
        $counter = 1;
        
        while (self::where('slug', $data['slug'])->exists()) {
            $data['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }
        
        return self::create($data);
    }

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($category) {
            if (!$category->slug) {
                $category->slug = Str::slug($category->name);
            }
            
            // Ensure unique slug
            $originalSlug = $category->slug;
            $counter = 1;
            
            while (self::where('slug', $category->slug)->where('id', '!=', $category->id)->exists()) {
                $category->slug = $originalSlug . '-' . $counter;
                $counter++;
            }
            
            if (!$category->display_order) {
                $maxOrder = self::where('parent_id', $category->parent_id)->max('display_order') ?? 0;
                $category->display_order = $maxOrder + 1;
            }
        });
        
        static::updating(function ($category) {
            if ($category->isDirty('name') && !$category->isDirty('slug')) {
                $category->slug = Str::slug($category->name);
            }
            
            // Ensure unique slug
            $originalSlug = $category->slug;
            $counter = 1;
            
            while (self::where('slug', $category->slug)->where('id', '!=', $category->id)->exists()) {
                $category->slug = $originalSlug . '-' . $counter;
                $counter++;
            }
        });
        
        static::deleting(function ($category) {
            // Delete image if exists
            if ($category->image) {
                \Storage::disk('public')->delete($category->image);
            }
            if ($category->icon) {
                \Storage::disk('public')->delete($category->icon);
            }
        });
    }
}
