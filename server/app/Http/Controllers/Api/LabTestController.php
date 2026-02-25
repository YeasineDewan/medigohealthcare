<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LabTest;
use Illuminate\Http\Request;

class LabTestController extends Controller
{
    public function index(Request $request)
    {
        $query = LabTest::where('is_active', true);

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('popular')) {
            $query->where('is_popular', true);
        }

        $tests = $query->orderBy('is_popular', 'desc')
            ->orderBy('name', 'asc')
            ->paginate($request->get('per_page', 20));

        return response()->json($tests);
    }

    public function show($id)
    {
        $test = LabTest::findOrFail($id);
        return response()->json($test);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:lab_tests',
            'category' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'sample_type' => 'nullable|string',
        ]);

        $test = LabTest::create($validated);

        return response()->json($test, 201);
    }

    public function update(Request $request, $id)
    {
        $test = LabTest::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'price' => 'sometimes|numeric|min:0',
            'is_active' => 'sometimes|boolean',
        ]);

        $test->update($validated);

        return response()->json($test);
    }
}
