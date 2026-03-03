<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->user()
            ->notifications()
            ->paginate(20);

        return response()->json($notifications);
    }

    public function unreadCount(Request $request)
    {
        $count = $request->user()->unreadNotifications()->count();
        
        return response()->json(['count' => $count]);
    }

    public function markAsRead(Request $request, $id)
    {
        $notification = $request->user()
            ->notifications()
            ->where('id', $id)
            ->firstOrFail();

        $notification->markAsRead();

        return response()->json(['message' => 'Notification marked as read']);
    }

    public function markAllAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return response()->json(['message' => 'All notifications marked as read']);
    }

    public function destroy(Request $request, $id)
    {
        $request->user()
            ->notifications()
            ->where('id', $id)
            ->delete();

        return response()->json(['message' => 'Notification deleted']);
    }
}
