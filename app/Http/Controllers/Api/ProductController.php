<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        // Apply filters
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('generic_name', 'like', '%' . $request->search . '%')
                  ->orWhere('brand_name', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Legacy category filtering (string-based)
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->manufacturer) {
            $query->where('manufacturer', 'like', '%' . $request->manufacturer . '%');
        }

        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->is_featured !== null) {
            $query->where('is_featured', $request->is_featured);
        }

        if ($request->is_prescription_required !== null) {
            $query->where('is_prescription_required', $request->is_prescription_required);
        }

        if ($request->in_stock !== null) {
            if ($request->in_stock) {
                $query->where('stock_quantity', '>', 0);
            } else {
                $query->where('stock_quantity', '<=', 0);
            }
        }

        // Apply sorting
        $sortBy = $request->sort_by ?? 'created_at';
        $sortOrder = $request->sort_order ?? 'desc';
        
        switch ($sortBy) {
            case 'price':
                $query->orderBy('price', $sortOrder);
                break;
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'rating':
                $query->orderBy('rating', $sortOrder);
                break;
            case 'sales':
                $query->orderBy('sales_count', $sortOrder);
                break;
            case 'name':
                $query->orderBy('name', $sortOrder);
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy($sortBy, $sortOrder);
        }

        $products = $query->where('is_active', true)->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => 'Products retrieved successfully'
        ]);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'reviews.user'])
                         ->findOrFail($id);

        // Get related products
        $related = Product::where('is_active', true)
            ->where('id', '!=', $id)
            ->where(function($query) use ($product) {
                $query->where('category_id', $product->category_id)
                      ->orWhere('category', $product->category)
                      ->orWhere('manufacturer', $product->manufacturer);
            })
            ->limit(8)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'product' => $product,
                'related_products' => $related
            ],
            'message' => 'Product retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'generic_name' => 'nullable|string|max:255',
            'brand_name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:product_categories,id',
                        'manufacturer' => 'required|string|max:255',
            'sku' => 'required|string|max:100|unique:products,sku',
            'barcode' => 'nullable|string|max:100|unique:products,barcode',
            'type' => 'required|in:medicine,medical_equipment,supplement,personal_care',
            'dosage_form' => 'nullable|in:tablet,capsule,syrup,injection,ointment,cream,drops,spray,patch,other',
            'strength' => 'nullable|string|max:100',
            'pack_size' => 'nullable|string|max:100',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'is_prescription_required' => 'boolean',
            'is_otc' => 'boolean',
            'is_featured' => 'boolean',
            'stock_quantity' => 'required|integer|min:0',
            'min_stock_level' => 'nullable|integer|min:0',
            'max_stock_level' => 'nullable|integer|min:0',
            'ingredients' => 'nullable|array',
            'indications' => 'nullable|array',
            'contraindications' => 'nullable|array',
            'side_effects' => 'nullable|array',
            'dosage_instructions' => 'nullable|array',
            'storage_instructions' => 'nullable|array',
            'warnings' => 'nullable|string|max:1000',
            'expiry_date' => 'nullable|date|after:today',
            'batch_number' => 'nullable|string|max:100',
            'manufacture_date' => 'nullable|date|before_or_equal:today',
            'images' => 'nullable|array',
            'seo_keywords' => 'nullable|array',
            'meta_description' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $data = $request->all();
        $data['slug'] = Str::slug($request->name) . '-' . time();
        $data['is_active'] = true;
        $data['created_by'] = auth()->id();

        // Handle image uploads
        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $images[] = $path;
            }
            $data['images'] = $images;
        }

        $product = Product::create($data);

        return response()->json([
            'success' => true,
            'data' => $product->load('category'),
            'message' => 'Product created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'generic_name' => 'nullable|string|max:255',
            'brand_name' => 'sometimes|required|string|max:255',
            'category_id' => 'sometimes|exists:product_categories,id',
                        'manufacturer' => 'sometimes|required|string|max:255',
            'sku' => 'sometimes|required|string|max:100|unique:products,sku,' . $id,
            'barcode' => 'nullable|string|max:100|unique:products,barcode,' . $id,
            'type' => 'sometimes|required|in:medicine,medical_equipment,supplement,personal_care',
            'dosage_form' => 'nullable|in:tablet,capsule,syrup,injection,ointment,cream,drops,spray,patch,other',
            'strength' => 'nullable|string|max:100',
            'pack_size' => 'nullable|string|max:100',
            'price' => 'sometimes|required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'original_price' => 'nullable|numeric|min:0',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'is_prescription_required' => 'boolean',
            'is_otc' => 'boolean',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
            'stock_quantity' => 'sometimes|required|integer|min:0',
            'min_stock_level' => 'nullable|integer|min:0',
            'max_stock_level' => 'nullable|integer|min:0',
            'ingredients' => 'nullable|array',
            'indications' => 'nullable|array',
            'contraindications' => 'nullable|array',
            'side_effects' => 'nullable|array',
            'dosage_instructions' => 'nullable|array',
            'storage_instructions' => 'nullable|array',
            'warnings' => 'nullable|string|max:1000',
            'expiry_date' => 'nullable|date|after:today',
            'batch_number' => 'nullable|string|max:100',
            'manufacture_date' => 'nullable|date|before_or_equal:today',
            'images' => 'nullable|array',
            'seo_keywords' => 'nullable|array',
            'meta_description' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $data = $request->all();
        
        if ($request->has('name') && $request->name !== $product->name) {
            $data['slug'] = Str::slug($request->name) . '-' . time();
        }
        
        $data['updated_by'] = auth()->id();

        // Handle image uploads
        if ($request->hasFile('images')) {
            // Delete old images
            if ($product->images) {
                foreach ($product->images as $oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }

            $images = [];
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $images[] = $path;
            }
            $data['images'] = $images;
        }

        $product->update($data);

        return response()->json([
            'success' => true,
            'data' => $product->fresh()->load('category'),
            'message' => 'Product updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        // Check if product has active orders
        if ($product->orderItems()->whereHas('order', function($q) {
            $q->whereIn('status', ['confirmed', 'processing', 'shipped']);
        })->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete product with active orders'
            ], 400);
        }

        // Delete images
        if ($product->images) {
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image);
            }
        }

        $product->delete();

        return response()->json([
            'success' => true,
            'message' => 'Product deleted successfully'
        ]);
    }

    public function featured(Request $request)
    {
        $products = Product::with('category')
                          ->where('is_featured', true)
                          ->where('is_active', true)
                          ->orderBy('sales_count', 'desc')
                          ->limit($request->limit ?? 20)
                          ->get();

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => 'Featured products retrieved successfully'
        ]);
    }

    public function popular(Request $request)
    {
        $products = Product::with('category')
                          ->where('is_active', true)
                          ->orderBy('sales_count', 'desc')
                          ->limit($request->limit ?? 20)
                          ->get();

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => 'Popular products retrieved successfully'
        ]);
    }

    public function topRated(Request $request)
    {
        $products = Product::with('category')
                          ->where('is_active', true)
                          ->orderBy('rating', 'desc')
                          ->limit($request->limit ?? 20)
                          ->get();

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => 'Top rated products retrieved successfully'
        ]);
    }

    public function byCategory($categoryId, Request $request)
    {
        $category = ProductCategory::find($categoryId);
        
        $query = Product::with('category')
                        ->where('is_active', true)
                        ->where('category_id', $categoryId);

        // Apply additional filters
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->sort_by) {
            $sortBy = $request->sort_by;
            $sortOrder = $request->sort_order ?? 'asc';
            
            switch ($sortBy) {
                case 'price':
                    $query->orderBy('price', $sortOrder);
                    break;
                case 'rating':
                    $query->orderBy('rating', $sortOrder);
                    break;
                case 'sales':
                    $query->orderBy('sales_count', $sortOrder);
                    break;
                case 'name':
                    $query->orderBy('name', $sortOrder);
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
            }
        }

        $products = $query->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => [
                'category' => $category,
                'products' => $products
            ],
            'message' => 'Products by category retrieved successfully'
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

        $products = Product::with('category')
                         ->where('is_active', true)
                         ->where(function($q) use ($request) {
                             $q->where('name', 'like', '%' . $request->query . '%')
                               ->orWhere('description', 'like', '%' . $request->query . '%')
                               ->orWhere('generic_name', 'like', '%' . $request->query . '%')
                               ->orWhere('brand_name', 'like', '%' . $request->query . '%')
                               ->orWhere('manufacturer', 'like', '%' . $request->query . '%');
                         })
                         ->orderBy('sales_count', 'desc')
                         ->limit($request->limit ?? 50)
                         ->get();

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => 'Product search completed successfully'
        ]);
    }

    public function inventory(Request $request)
    {
        $query = Product::with('category');

        if ($request->low_stock) {
            $query->whereRaw('stock_quantity <= min_stock_level');
        }

        if ($request->out_of_stock) {
            $query->where('stock_quantity', '<=', 0);
        }

        if ($request->expiring_soon) {
            $query->where('expiry_date', '<=', now()->addDays(30))
                  ->where('expiry_date', '>', now());
        }

        if ($request->expired) {
            $query->where('expiry_date', '<', now());
        }

        $products = $query->orderBy('stock_quantity', 'asc')
                         ->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $products,
            'message' => 'Inventory report retrieved successfully'
        ]);
    }

    public function updateStock(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:0',
            'type' => 'required|in:set,add,subtract',
            'reason' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $product = Product::findOrFail($id);
        $previousStock = $product->stock_quantity;
        $type = $request->type;
        $quantity = $request->quantity;

        switch ($type) {
            case 'set':
                $newStock = $quantity;
                $logQuantity = $quantity - $previousStock;
                $logType = $logQuantity >= 0 ? 'in' : 'out';
                break;
            case 'add':
                $newStock = $previousStock + $quantity;
                $logQuantity = $quantity;
                $logType = 'in';
                break;
            case 'subtract':
                if ($previousStock < $quantity) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient stock'
                    ], 400);
                }
                $newStock = $previousStock - $quantity;
                $logQuantity = $quantity;
                $logType = 'out';
                break;
        }

        $product->update(['stock_quantity' => $newStock]);

        return response()->json([
            'success' => true,
            'data' => $product->fresh(),
            'message' => 'Stock updated successfully'
        ]);
    }

    public function statistics()
    {
        $total = Product::where('is_active', true)->count();
        $featured = Product::where('is_featured', true)->where('is_active', true)->count();
        $prescriptionRequired = Product::where('is_prescription_required', true)->where('is_active', true)->count();
        $otc = Product::where('is_otc', true)->where('is_active', true)->count();
        $inStock = Product::where('stock_quantity', '>', 0)->where('is_active', true)->count();
        $lowStock = Product::whereRaw('stock_quantity <= min_stock_level')->where('is_active', true)->count();
        $outOfStock = Product::where('stock_quantity', '<=', 0)->where('is_active', true)->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'featured' => $featured,
                'prescription_required' => $prescriptionRequired,
                'otc' => $otc,
                'in_stock' => $inStock,
                'low_stock' => $lowStock,
                'out_of_stock' => $outOfStock,
            ],
            'message' => 'Product statistics retrieved successfully'
        ]);
    }

    public function related($id)
    {
        $product = Product::findOrFail($id);
        
        $related = Product::where('is_active', true)
            ->where('id', '!=', $id)
            ->where(function($query) use ($product) {
                $query->where('category_id', $product->category_id)
                      ->orWhere('category', $product->category)
                      ->orWhere('manufacturer', $product->manufacturer);
            })
            ->limit(8)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $related,
            'message' => 'Related products retrieved successfully'
        ]);
    }
}
