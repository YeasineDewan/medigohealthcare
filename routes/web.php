<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Medigo Healthcare API',
        'version' => '1.0.0',
        'status' => 'running',
    ]);
});
