<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ContentSecurityPolicy
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        if (app()->environment('local')) {
            $response->headers->set('Content-Security-Policy', 
                "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; " .
                "connect-src 'self' ws: wss: http://localhost:* https://localhost:*; " .
                "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " .
                "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " .
                "font-src 'self' https://fonts.gstatic.com; " .
                "img-src 'self' data: blob: https:;"
            );
        }
        
        return $response;
    }
}