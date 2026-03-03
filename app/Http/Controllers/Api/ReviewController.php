<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $query = Review::with(['user', 'reviewable']);

        if ($request->has('reviewable_type')) {
            $query->where('reviewable_type', $request->reviewable_type);
        }
        if ($request->has('reviewable_id')) {
            $query->where('reviewable_id', $request->reviewable_id);
        }

        $reviews = $query->latest()->paginate(20);

        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'reviewable_type' => 'required|string',
            'reviewable_id' => 'required|integer',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review = Review::create([
            ...$validated,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($review, 201);
    }

    public function show($id)
    {
        $review = Review::with(['user', 'reviewable'])->findOrFail($id);
        
        return response()->json($review);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        $review = Review::findOrFail($id);
        
        if ($review->user_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->update($validated);

        return response()->json($review);
    }

    public function destroy(Request $request, $id)
    {
        $review = Review::findOrFail($id);
        
        if ($review->user_id !== $request->user()->id && $request->user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }
}
