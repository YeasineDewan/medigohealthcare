<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductCategory::with(['children', 'parent', 'activeProducts']);

        // Apply filters
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->parent_only) {
            $query->parent();
        }

        if ($request->featured !== null) {
            $query->where('is_featured', $request->featured);
        }

        if ($request->has_products !== null) {
            if ($request->has_products) {
                $query->whereHas('activeProducts');
            } else {
                $query->whereDoesntHave('activeProducts');
            }
        }

        if ($request->parent_id) {
            $query->where('parent_id', $request->parent_id);
        }

        // Apply sorting
        $sortBy = $request->sort_by ?? 'display_order';
        $sortOrder = $request->sort_order ?? 'asc';
        
        switch ($sortBy) {
            case 'name':
                $query->orderBy('name', $sortOrder);
                break;
            case 'product_count':
                $query->withCount('activeProducts')->orderBy('active_products_count', $sortOrder);
                break;
            case 'created_at':
                $query->orderBy('created_at', $sortOrder);
                break;
            default:
                $query->orderBy('display_order', 'asc')->orderBy('name', 'asc');
        }

        $categories = $query->where('is_active', true)->get();

        // Transform response
        $categories->transform(function ($category) use ($request) {
            $data = [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'description' => $category->description,
                'image' => $category->image_url,
                'icon' => $category->icon_url,
                'parent_id' => $category->parent_id,
                'is_featured' => $category->is_featured,
                'display_order' => $category->display_order,
                'product_count' => $category->product_count,
                'level' => $category->getLevel(),
                'full_name' => $category->full_name,
                'breadcrumb' => $category->breadcrumb,
                'created_at' => $category->created_at,
                'updated_at' => $category->updated_at,
            ];

            if ($request->include_children) {
                $data['children'] = $category->activeChildren->map(function ($child) {
                    return [
                        'id' => $child->id,
                        'name' => $child->name,
                        'slug' => $child->slug,
                        'description' => $child->description,
                        'image' => $child->image_url,
                        'product_count' => $child->product_count,
                        'has_children' => $child->hasChildren(),
                    ];
                });
            }

            if ($request->include_parent && $category->parent) {
                $data['parent'] = [
                    'id' => $category->parent->id,
                    'name' => $category->parent->name,
                    'slug' => $category->parent->slug,
                ];
            }

            return $data;
        });

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Product categories retrieved successfully'
        ]);
    }

    public function show($id, Request $request)
    {
        $category = ProductCategory::with(['parent', 'activeChildren', 'activeProducts'])
                                 ->withCount('activeProducts')
                                 ->findOrFail($id);

        $data = [
            'id' => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
            'description' => $category->description,
            'image' => $category->image_url,
            'icon' => $category->icon_url,
            'parent_id' => $category->parent_id,
            'is_featured' => $category->is_featured,
            'display_order' => $category->display_order,
            'meta_title' => $category->meta_title,
            'meta_description' => $category->meta_description,
            'seo_keywords' => $category->seo_keywords,
            'product_count' => $category->product_count,
            'level' => $category->getLevel(),
            'full_name' => $category->full_name,
            'breadcrumb' => $category->breadcrumb,
            'has_children' => $category->hasChildren(),
            'is_parent' => $category->isParent(),
            'is_child' => $category->isChild(),
            'created_at' => $category->created_at,
            'updated_at' => $category->updated_at,
        ];

        if ($category->parent) {
            $data['parent'] = [
                'id' => $category->parent->id,
                'name' => $category->parent->name,
                'slug' => $category->parent->slug,
            ];
        }

        $data['children'] = $category->activeChildren->map(function ($child) {
            return [
                'id' => $child->id,
                'name' => $child->name,
                'slug' => $child->slug,
                'description' => $child->description,
                'image' => $child->image_url,
                'product_count' => $child->product_count,
                'has_children' => $child->hasChildren(),
            ];
        });

        // Get products if requested
        if ($request->include_products) {
            $productsQuery = $category->activeProducts();
            
            // Apply product filters
            if ($request->min_price) {
                $productsQuery->where('price', '>=', $request->min_price);
            }
            if ($request->max_price) {
                $productsQuery->where('price', '<=', $request->max_price);
            }
            if ($request->featured !== null) {
                $productsQuery->where('is_featured', $request->featured);
            }
            
            $products = $productsQuery->paginate($request->per_page ?? 20);
            $data['products'] = $products;
        }

        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Product category retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:product_categories,slug',
            'description' => 'nullable|string|max:2000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:1024',
            'parent_id' => 'nullable|exists:product_categories,id',
            'is_featured' => 'boolean',
            'display_order' => 'nullable|integer|min:0',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $data = $request->all();
        $data['is_active'] = true;
        $data['created_by'] = auth()->id();

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
            $data['image'] = $imagePath;
        }

        // Handle icon upload
        if ($request->hasFile('icon')) {
            $iconPath = $request->file('icon')->store('categories/icons', 'public');
            $data['icon'] = $iconPath;
        }

        $category = ProductCategory::create($data);

        return response()->json([
            'success' => true,
            'data' => $category->load(['parent', 'children']),
            'message' => 'Product category created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $category = ProductCategory::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|string|unique:product_categories,slug,' . $id,
            'description' => 'nullable|string|max:2000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:1024',
            'parent_id' => 'nullable|exists:product_categories,id',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'display_order' => 'nullable|integer|min:0',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'seo_keywords' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $data = $request->all();
        $data['updated_by'] = auth()->id();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $imagePath = $request->file('image')->store('categories', 'public');
            $data['image'] = $imagePath;
        }

        // Handle icon upload
        if ($request->hasFile('icon')) {
            // Delete old icon
            if ($category->icon) {
                Storage::disk('public')->delete($category->icon);
            }
            $iconPath = $request->file('icon')->store('categories/icons', 'public');
            $data['icon'] = $iconPath;
        }

        $category->update($data);

        return response()->json([
            'success' => true,
            'data' => $category->fresh()->load(['parent', 'children']),
            'message' => 'Product category updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $category = ProductCategory::findOrFail($id);

        // Check if category can be deleted
        if (!$category->canDelete()) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete category with active products or subcategories'
            ], 400);
        }

        $category->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product category deleted successfully'
        ]);
    }

    public function featured(Request $request)
    {
        $categories = ProductCategory::with(['activeChildren'])
                                   ->where('is_featured', true)
                                   ->where('is_active', true)
                                   ->orderBy('display_order', 'asc')
                                   ->orderBy('name', 'asc')
                                   ->limit($request->limit ?? 20)
                                   ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Featured categories retrieved successfully'
        ]);
    }

    public function tree(Request $request)
    {
        $categories = ProductCategory::with(['activeChildren', 'activeProducts'])
                                   ->parent()
                                   ->where('is_active', true)
                                   ->orderBy('display_order', 'asc')
                                   ->orderBy('name', 'asc')
                                   ->get();

        $buildTree = function($categories) use (&$buildTree) {
            return $categories->map(function($category) use (&$buildTree) {
                $data = [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'description' => $category->description,
                    'image' => $category->image_url,
                    'product_count' => $category->product_count,
                    'is_featured' => $category->is_featured,
                ];

                if ($category->activeChildren->count() > 0) {
                    $data['children'] = $buildTree($category->activeChildren);
                }

                return $data;
            });
        };

        $tree = $buildTree($categories);

        return response()->json([
            'success' => true,
            'data' => $tree,
            'message' => 'Category tree retrieved successfully'
        ]);
    }

    public function search(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'query' => 'required|string|min:2|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $categories = ProductCategory::with(['parent'])
                                   ->where('is_active', true)
                                   ->where(function($q) use ($request) {
                                       $q->where('name', 'like', '%' . $request->query . '%')
                                         ->orWhere('description', 'like', '%' . $request->query . '%');
                                   })
                                   ->orderBy('name', 'asc')
                                   ->limit($request->limit ?? 50)
                                   ->get();

        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Category search completed successfully'
        ]);
    }

    public function statistics()
    {
        $total = ProductCategory::where('is_active', true)->count();
        $featured = ProductCategory::where('is_featured', true)->where('is_active', true)->count();
        $parent = ProductCategory::parent()->where('is_active', true)->count();
        $child = ProductCategory::child()->where('is_active', true)->count();
        
        $withProducts = ProductCategory::whereHas('activeProducts')->where('is_active', true)->count();
        $withoutProducts = ProductCategory::whereDoesntHave('activeProducts')->where('is_active', true)->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_categories' => $total,
                'featured' => $featured,
                'parent_categories' => $parent,
                'child_categories' => $child,
                'with_products' => $withProducts,
                'without_products' => $withoutProducts,
            ],
            'message' => 'Category statistics retrieved successfully'
        ]);
    }
}
