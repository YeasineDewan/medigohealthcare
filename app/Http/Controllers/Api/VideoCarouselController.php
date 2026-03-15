<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\VideoCarousel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VideoCarouselController extends Controller
{
    /**
     * Public list: active videos, optionally filtered by display page.
     * GET /api/v1/video-carousel?page=home|doctors|about&limit=50
     */
    public function index(Request $request)
    {
        $query = VideoCarousel::query()->active()->orderBy('display_order')->orderBy('created_at', 'desc');

        if ($request->filled('page')) {
            $query->forPage($request->get('page'));
        }
        if ($request->filled('featured')) {
            if ($request->get('featured') === 'true') {
                $query->featured();
            }
        }
        if ($request->filled('category')) {
            $query->where('category', $request->get('category'));
        }

        $perPage = min(100, max(1, (int) $request->get('limit', 50)));
        $videos = $query->limit($perPage)->get();

        $items = $videos->map(fn ($v) => $v->toCarouselItem());

        return response()->json([
            'success' => true,
            'videos' => $items,
            'pagination' => [
                'total' => $items->count(),
                'limit' => $perPage,
            ],
        ]);
    }

    /**
     * Admin list: all videos with filters and pagination.
     */
    public function adminIndex(Request $request)
    {
        $query = VideoCarousel::query()->orderBy('display_order')->orderBy('created_at', 'desc');

        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }
        if ($request->filled('category')) {
            $query->where('category', $request->get('category'));
        }
        if ($request->filled('featured')) {
            $query->where('featured', $request->get('featured') === 'true');
        }
        if ($request->filled('search')) {
            $term = $request->get('search');
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', "%{$term}%")
                  ->orWhere('description', 'like', "%{$term}%");
            });
        }

        $perPage = min(100, max(1, (int) $request->get('per_page', 24)));
        $paginated = $query->paginate($perPage);
        $videos = $paginated->getCollection()->map(fn ($v) => $this->toAdminItem($v));
        $paginated->setCollection($videos);

        $stats = [
            'total' => VideoCarousel::count(),
            'active' => VideoCarousel::where('status', 'active')->count(),
            'featured' => VideoCarousel::where('featured', true)->count(),
            'totalViews' => (int) VideoCarousel::sum('views'),
        ];

        return response()->json([
            'success' => true,
            'videos' => $paginated->items(),
            'pagination' => [
                'current_page' => $paginated->currentPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
                'total_pages' => $paginated->lastPage(),
            ],
            'stats' => $stats,
        ]);
    }

    public function show($id)
    {
        $video = VideoCarousel::findOrFail($id);
        return response()->json([
            'success' => true,
            'video' => $this->toAdminItem($video),
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'video_url' => 'required|url|max:500',
            'thumbnail_url' => 'nullable|url|max:500',
            'category' => 'nullable|string|max:100',
            'status' => 'nullable|in:active,inactive',
            'display_order' => 'nullable|integer|min:0',
            'autoplay' => 'nullable|boolean',
            'mute' => 'nullable|boolean',
            'loop' => 'nullable|boolean',
            'show_controls' => 'nullable|boolean',
            'featured' => 'nullable|boolean',
            'display_pages' => 'nullable|array',
            'display_pages.*' => 'string|max:50',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'duration' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();
        $data['display_order'] = $data['display_order'] ?? (VideoCarousel::max('display_order') + 1);
        $data['status'] = $data['status'] ?? 'active';
        $data['autoplay'] = $data['autoplay'] ?? true;
        $data['mute'] = $data['mute'] ?? true;
        $data['loop'] = $data['loop'] ?? true;
        $data['show_controls'] = $data['show_controls'] ?? true;
        $data['featured'] = $data['featured'] ?? false;

        $video = VideoCarousel::create($data);
        return response()->json([
            'success' => true,
            'message' => 'Video created successfully',
            'video' => $this->toAdminItem($video),
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $video = VideoCarousel::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:200',
            'description' => 'nullable|string',
            'video_url' => 'sometimes|url|max:500',
            'thumbnail_url' => 'nullable|url|max:500',
            'category' => 'nullable|string|max:100',
            'status' => 'nullable|in:active,inactive',
            'display_order' => 'nullable|integer|min:0',
            'autoplay' => 'nullable|boolean',
            'mute' => 'nullable|boolean',
            'loop' => 'nullable|boolean',
            'show_controls' => 'nullable|boolean',
            'featured' => 'nullable|boolean',
            'display_pages' => 'nullable|array',
            'display_pages.*' => 'string|max:50',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:100',
            'duration' => 'nullable|string|max:20',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $video->update($validator->validated());
        return response()->json([
            'success' => true,
            'message' => 'Video updated successfully',
            'video' => $this->toAdminItem($video->fresh()),
        ]);
    }

    public function destroy($id)
    {
        $video = VideoCarousel::findOrFail($id);
        $video->delete();
        return response()->json([
            'success' => true,
            'message' => 'Video deleted successfully',
        ]);
    }

    /**
     * Reorder videos. Body: { "order": [1, 3, 2] } (ids).
     */
    public function reorder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order' => 'required|array',
            'order.*' => 'integer|exists:video_carousel,id',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        foreach ($request->get('order') as $position => $id) {
            VideoCarousel::where('id', $id)->update(['display_order' => $position]);
        }

        $videos = VideoCarousel::orderBy('display_order')->get()->map(fn ($v) => $this->toAdminItem($v));
        return response()->json([
            'success' => true,
            'message' => 'Order updated',
            'videos' => $videos,
        ]);
    }

    /**
     * Toggle status (active/inactive).
     */
    public function toggleStatus($id)
    {
        $video = VideoCarousel::findOrFail($id);
        $video->status = $video->status === 'active' ? 'inactive' : 'active';
        $video->save();
        return response()->json([
            'success' => true,
            'video' => $this->toAdminItem($video->fresh()),
        ]);
    }

    /**
     * Toggle featured.
     */
    public function toggleFeatured($id)
    {
        $video = VideoCarousel::findOrFail($id);
        $video->featured = !$video->featured;
        $video->save();
        return response()->json([
            'success' => true,
            'video' => $this->toAdminItem($video->fresh()),
        ]);
    }

    private function toAdminItem(VideoCarousel $v): array
    {
        return [
            'id' => $v->id,
            'title' => $v->title,
            'description' => $v->description ?? '',
            'url' => $v->video_url,
            'thumbnail' => $v->thumbnail_url,
            'video_url' => $v->video_url,
            'thumbnail_url' => $v->thumbnail_url,
            'category' => $v->category,
            'status' => $v->status,
            'order' => (int) $v->display_order,
            'display_order' => (int) $v->display_order,
            'autoplay' => $v->autoplay,
            'mute' => $v->mute,
            'loop' => $v->loop,
            'showControls' => $v->show_controls,
            'show_controls' => $v->show_controls,
            'featured' => $v->featured,
            'displayPages' => $v->display_pages ?? [],
            'display_pages' => $v->display_pages ?? [],
            'tags' => $v->tags ?? [],
            'views' => (int) $v->views,
            'likes' => (int) $v->likes,
            'shares' => (int) $v->shares,
            'duration' => $v->duration,
            'createdAt' => $v->created_at?->toIso8601String(),
            'updatedAt' => $v->updated_at?->toIso8601String(),
        ];
    }
}
