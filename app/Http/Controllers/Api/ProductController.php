<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::where('is_active', true);

        // Category filtering
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Legacy category filtering (string-based)
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Search filtering
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                  ->orWhere('description', 'like', '%' . $search . '%')
                  ->orWhere('manufacturer', 'like', '%' . $search . '%')
                  ->orWhere('ingredients', 'like', '%' . $search . '%');
            });
        }

        // Price range filtering
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Brand filtering
        if ($request->has('manufacturer')) {
            $query->where('manufacturer', $request->manufacturer);
        }

        // Prescription filtering
        if ($request->has('prescription_required')) {
            $query->where('prescription_required', $request->prescription_required === 'true');
        }

        // In stock filtering
        if ($request->has('in_stock')) {
            $query->where('stock_quantity', '>', 0);
        }

        // Featured products
        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        
        switch ($sortBy) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            case 'rating':
                $query->orderBy('rating', 'desc');
                break;
            case 'newest':
                $query->orderBy('created_at', 'desc');
                break;
            default:
                $query->orderBy($sortBy, $sortOrder);
        }

        $products = $query->paginate($request->get('per_page', 20));

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with('reviews.user')->findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:products',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'category' => 'nullable|string',
        ]);

        $product = Product::create($validated);

        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'stock_quantity' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $product->update($validated);

        return response()->json($product);
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

        return response()->json($related);
    }
}
