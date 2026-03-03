<?php

namespace App\Http\Middleware;

use App\Models\ApiKey;
use Closure;
use Illuminate\Http\Request;

class ApiKeyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $apiKey = $request->header('X-API-Key');

        if (!$apiKey) {
            return response()->json(['message' => 'API key required'], 401);
        }

        $key = ApiKey::where('key', $apiKey)
            ->where('is_active', true)
            ->first();

        if (!$key) {
            return response()->json(['message' => 'Invalid API key'], 401);
        }

        if ($key->expires_at && $key->expires_at->isPast()) {
            return response()->json(['message' => 'API key expired'], 401);
        }

        $key->update(['last_used_at' => now()]);

        return $next($request);
    }
}
