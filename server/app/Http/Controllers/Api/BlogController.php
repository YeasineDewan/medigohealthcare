<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $query = BlogPost::where('is_published', true)
            ->with('author');

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('content', 'like', '%' . $request->search . '%');
        }

        $posts = $query->orderBy('published_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json($posts);
    }

    public function show($id)
    {
        $post = BlogPost::with('author')->findOrFail($id);
        
        // Increment views
        $post->increment('views');
        
        return response()->json($post);
    }
}
