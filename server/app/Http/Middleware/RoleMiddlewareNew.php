<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddlewareNew
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $role
     * @return mixed
     */
    public function handle($request, Closure $next, $role = null)
    {
        // If no role is specified, just check authentication
        if ($role === null) {
            if (!Auth::check()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Authentication required',
                    'error' => 'unauthenticated'
                ], 401);
            }
            return $next($request);
        }

        // Check if user is authenticated
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Authentication required',
                'error' => 'unauthenticated'
            ], 401);
        }

        // Get the authenticated user
        $user = Auth::user();

        // Check if user has the required role
        if ($user->role !== $role) {
            return response()->json([
                'success' => false,
                'message' => 'Access denied. Insufficient permissions.',
                'error' => 'unauthorized',
                'required_role' => $role
            ], 403);
        }

        return $next($request);
    }
}
