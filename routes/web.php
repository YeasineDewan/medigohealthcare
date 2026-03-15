<?php

use Illuminate\Support\Facades\Route;

// API info at root (optional; frontend is served by fallback)
Route::get('/', function () {
    $indexPath = public_path('index.html');
    if (file_exists($indexPath)) {
        return response()->file($indexPath);
    }
    return response()->json([
        'message' => 'Medigo Healthcare API',
        'version' => '1.0.0',
        'status' => 'running',
    ]);
});

// SPA fallback: serve React app for all other non-API GET requests (cPanel deployment)
Route::fallback(function () {
    $indexPath = public_path('index.html');
    if (request()->isMethod('GET') && file_exists($indexPath)) {
        return response()->file($indexPath);
    }
    abort(404);
});
