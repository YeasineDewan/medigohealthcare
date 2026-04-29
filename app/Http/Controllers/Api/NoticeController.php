<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NoticeController extends Controller
{
    public function index(Request $request)
    {
        $query = Notice::query();

        // Apply filters
        if ($request->search) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('content', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->is_active !== null) {
            $query->where('is_active', $request->is_active);
        }

        if ($request->priority) {
            $query->where('priority', $request->priority);
        }

        // Apply sorting
        $sortBy = $request->sort_by ?? 'created_at';
        $sortOrder = $request->sort_order ?? 'desc';
        
        $query->orderBy($sortBy, $sortOrder);

        $notices = $query->paginate($request->per_page ?? 20);

        return response()->json([
            'success' => true,
            'data' => $notices,
            'message' => 'Notices retrieved successfully'
        ]);
    }

    public function show($id)
    {
        $notice = Notice::findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $notice,
            'message' => 'Notice retrieved successfully'
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string|max:5000',
            'type' => 'required|in:general,emergency,maintenance,holiday,announcement',
            'priority' => 'required|in:low,medium,high,critical',
            'start_date' => 'nullable|date|after_or_equal:today',
            'end_date' => 'nullable|date|after:start_date',
            'target_audience' => 'nullable|array',
            'is_active' => 'boolean',
            'allow_comments' => 'boolean',
            'attachment_url' => 'nullable|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
                'message' => 'Validation failed'
            ], 422);
        }

        $data = $request->all();
        $data['created_by'] = auth()->id();

        $notice = Notice::create($data);

        return response()->json([
            'success' => true,
            'data' => $notice,
            'message' => 'Notice created successfully'
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $notice = Notice::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string|max:5000',
            'type' => 'sometimes|required|in:general,emergency,maintenance,holiday,announcement',
            'priority' => 'sometimes|required|in:low,medium,high,critical',
            'start_date' => 'nullable|date|after_or_equal:today',
            'end_date' => 'nullable|date|after:start_date',
            'target_audience' => 'nullable|array',
            'is_active' => 'boolean',
            'allow_comments' => 'boolean',
            'attachment_url' => 'nullable|string|max:500',
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

        $notice->update($data);

        return response()->json([
            'success' => true,
            'data' => $notice->fresh(),
            'message' => 'Notice updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $notice = Notice::findOrFail($id);
        $notice->delete();

        return response()->json([
            'success' => true,
            'message' => 'Notice deleted successfully'
        ]);
    }

    public function active(Request $request)
    {
        $query = Notice::where('is_active', true)
                       ->where(function($q) {
                           $q->whereNull('start_date')
                             ->orWhere('start_date', '<=', now());
                       })
                       ->where(function($q) {
                           $q->whereNull('end_date')
                             ->orWhere('end_date', '>=', now());
                       });

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->priority) {
            $query->where('priority', $request->priority);
        }

        $notices = $query->orderBy('priority', 'desc')
                        ->orderBy('created_at', 'desc')
                        ->limit($request->limit ?? 10)
                        ->get();

        return response()->json([
            'success' => true,
            'data' => $notices,
            'message' => 'Active notices retrieved successfully'
        ]);
    }

    public function toggle($id)
    {
        $notice = Notice::findOrFail($id);
        $notice->is_active = !$notice->is_active;
        $notice->updated_by = auth()->id();
        $notice->save();

        return response()->json([
            'success' => true,
            'data' => $notice->fresh(),
            'message' => 'Notice status toggled successfully'
        ]);
    }

    public function statistics()
    {
        $total = Notice::count();
        $active = Notice::where('is_active', true)->count();
        $inactive = Notice::where('is_active', false)->count();
        
        $byType = Notice::selectRaw('type, count(*) as count')
                       ->groupBy('type')
                       ->get()
                       ->pluck('count', 'type');
        
        $byPriority = Notice::selectRaw('priority, count(*) as count')
                           ->groupBy('priority')
                           ->get()
                           ->pluck('count', 'priority');

        return response()->json([
            'success' => true,
            'data' => [
                'total_notices' => $total,
                'active' => $active,
                'inactive' => $inactive,
                'by_type' => $byType,
                'by_priority' => $byPriority,
            ],
            'message' => 'Notice statistics retrieved successfully'
        ]);
    }
}
