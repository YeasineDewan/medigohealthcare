<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MedicalDevice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class MedicalDeviceController extends Controller
{
    public function index(Request $request)
    {
        $query = MedicalDevice::query();

        // Search
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('model', 'like', '%' . $request->search . '%')
                  ->orWhere('barcode', 'like', '%' . $request->search . '%')
                  ->orWhere('serial_number', 'like', '%' . $request->search . '%');
            });
        }

        // Filters
        if ($request->category) {
            $query->where('category', $request->category);
        }
        
        if ($request->status) {
            $query->where('status', $request->status);
        }
        
        if ($request->stock_level) {
            switch ($request->stock_level) {
                case 'low':
                    $query->lowStock();
                    break;
                case 'critical':
                    $query->criticalStock();
                    break;
                case 'normal':
                    $query->whereRaw('current_stock > reorder_level');
                    break;
            }
        }
        
        if ($request->manufacturer) {
            $query->where('manufacturer', $request->manufacturer);
        }

        // Sort
        $sortBy = $request->sort_by ?? 'name';
        $sortOrder = $request->sort_order ?? 'asc';
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->per_page ?? 15;
        $devices = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $devices,
            'message' => 'Medical devices retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'manufacturer' => 'required|string|max:255',
            'barcode' => 'nullable|string|max:255|unique:medical_devices,barcode',
            'serial_number' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'warranty_expiry' => 'nullable|date|after:purchase_date',
            'unit_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'current_stock' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'max_stock_level' => 'required|integer|min:0',
            'reorder_level' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'description' => 'nullable|string',
            'specifications' => 'nullable|string',
            'features' => 'nullable|string',
            'power_source' => 'nullable|string',
            'dimensions' => 'nullable|string',
            'weight' => 'nullable|string',
            'certification' => 'nullable|string',
            'status' => 'required|in:Active,Inactive,Maintenance,Retired',
            'last_maintenance' => 'nullable|date',
            'next_maintenance' => 'nullable|date',
            'supplier' => 'nullable|string|max:255',
            'calibration_required' => 'boolean',
            'disposable' => 'boolean',
            'sterile' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('medical_devices', $imageName, 'public');
            $data['image_url'] = 'medical_devices/' . $imageName;
        }

        $device = MedicalDevice::create($data);

        return response()->json([
            'success' => true,
            'data' => $device,
            'message' => 'Medical device created successfully'
        ], 201);
    }

    public function show($id)
    {
        $device = MedicalDevice::with(['stockMovements', 'maintenanceRecords'])->find($id);
        
        if (!$device) {
            return response()->json([
                'success' => false,
                'message' => 'Medical device not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $device,
            'message' => 'Medical device retrieved successfully'
        ]);
    }

    public function update(Request $request, $id)
    {
        $device = MedicalDevice::find($id);
        
        if (!$device) {
            return response()->json([
                'success' => false,
                'message' => 'Medical device not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'manufacturer' => 'required|string|max:255',
            'barcode' => 'nullable|string|max:255|unique:medical_devices,barcode,' . $id,
            'serial_number' => 'nullable|string|max:255',
            'purchase_date' => 'nullable|date',
            'warranty_expiry' => 'nullable|date|after:purchase_date',
            'unit_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0',
            'current_stock' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:0',
            'max_stock_level' => 'required|integer|min:0',
            'reorder_level' => 'required|integer|min:0',
            'unit' => 'required|string|max:50',
            'description' => 'nullable|string',
            'specifications' => 'nullable|string',
            'features' => 'nullable|string',
            'power_source' => 'nullable|string',
            'dimensions' => 'nullable|string',
            'weight' => 'nullable|string',
            'certification' => 'nullable|string',
            'status' => 'required|in:Active,Inactive,Maintenance,Retired',
            'last_maintenance' => 'nullable|date',
            'next_maintenance' => 'nullable|date',
            'supplier' => 'nullable|string|max:255',
            'calibration_required' => 'boolean',
            'disposable' => 'boolean',
            'sterile' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($device->image_url) {
                Storage::disk('public')->delete($device->image_url);
            }
            
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('medical_devices', $imageName, 'public');
            $data['image_url'] = 'medical_devices/' . $imageName;
        }

        $device->update($data);

        return response()->json([
            'success' => true,
            'data' => $device,
            'message' => 'Medical device updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $device = MedicalDevice::find($id);
        
        if (!$device) {
            return response()->json([
                'success' => false,
                'message' => 'Medical device not found'
            ], 404);
        }

        // Delete image
        if ($device->image_url) {
            Storage::disk('public')->delete($device->image_url);
        }

        $device->delete();

        return response()->json([
            'success' => true,
            'message' => 'Medical device deleted successfully'
        ]);
    }

    public function getCategories()
    {
        $categories = MedicalDevice::select('category')->distinct()->pluck('category');
        
        return response()->json([
            'success' => true,
            'data' => $categories,
            'message' => 'Categories retrieved successfully'
        ]);
    }

    public function getManufacturers()
    {
        $manufacturers = MedicalDevice::select('manufacturer')->distinct()->pluck('manufacturer');
        
        return response()->json([
            'success' => true,
            'data' => $manufacturers,
            'message' => 'Manufacturers retrieved successfully'
        ]);
    }

    public function getLowStock()
    {
        $devices = MedicalDevice::lowStock()->get();
        
        return response()->json([
            'success' => true,
            'data' => $devices,
            'message' => 'Low stock devices retrieved successfully'
        ]);
    }

    public function getCriticalStock()
    {
        $devices = MedicalDevice::criticalStock()->get();
        
        return response()->json([
            'success' => true,
            'data' => $devices,
            'message' => 'Critical stock devices retrieved successfully'
        ]);
    }

    public function getExpiringSoon()
    {
        $devices = MedicalDevice::expiringSoon()->get();
        
        return response()->json([
            'success' => true,
            'data' => $devices,
            'message' => 'Devices expiring soon retrieved successfully'
        ]);
    }

    public function getStats()
    {
        $total = MedicalDevice::count();
        $active = MedicalDevice::active()->count();
        $lowStock = MedicalDevice::lowStock()->count();
        $criticalStock = MedicalDevice::criticalStock()->count();
        $expiringSoon = MedicalDevice::expiringSoon()->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total' => $total,
                'active' => $active,
                'low_stock' => $lowStock,
                'critical_stock' => $criticalStock,
                'expiring_soon' => $expiringSoon
            ],
            'message' => 'Stats retrieved successfully'
        ]);
    }
}
