<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\EmergencyService;
use App\Models\Service;
use Illuminate\Http\JsonResponse;

class MenuController extends Controller
{
    /**
     * Get services for the mega menu
     */
    public function services(): JsonResponse
    {
        $services = Service::where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'data' => $services,
        ]);
    }

    /**
     * Get emergency services for the emergency menu
     */
    public function emergency(): JsonResponse
    {
        $services = EmergencyService::where('is_active', true)->get();

        return response()->json([
            'data' => $services,
        ]);
    }
}
