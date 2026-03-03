<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index(Request $request)
    {
        $inventory = Inventory::with('product')
            ->when($request->has('low_stock'), function($q) {
                $q->where('quantity', '<', 10);
            })
            ->paginate(20);

        return response()->json($inventory);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:0',
            'type' => 'required|in:in,out,adjustment',
            'notes' => 'nullable|string',
        ]);

        $inventory = Inventory::create($validated);

        return response()->json($inventory, 201);
    }

    public function show($id)
    {
        $inventory = Inventory::with('product')->findOrFail($id);
        
        return response()->json($inventory);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:0',
            'notes' => 'nullable|string',
        ]);

        $inventory = Inventory::findOrFail($id);
        $inventory->update($validated);

        return response()->json($inventory);
    }

    public function lowStock()
    {
        $items = Inventory::with('product')
            ->where('quantity', '<', 10)
            ->get();

        return response()->json($items);
    }
}
