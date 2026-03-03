<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckPermission
{
    public function handle(Request $request, Closure $next, $permission)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        if ($user->role === 'admin') {
            return $next($request);
        }

        if ($user->role_id) {
            $role = $user->roleModel;
            if ($role && $role->hasPermission($permission)) {
                return $next($request);
            }
        }

        return response()->json(['message' => 'Unauthorized'], 403);
    }
}
