<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_values(array_filter(array_merge(
        [
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
            'http://127.0.0.1:3000',
            'https://test.medigohealthcares.com',
            'http://test.medigohealthcares.com',
        ],
        env('FRONTEND_URL') ? [rtrim(env('FRONTEND_URL'), '/')] : [],
        env('CORS_ORIGINS') ? array_map('trim', explode(',', env('CORS_ORIGINS'))) : []
    ))),

    'allowed_origins_patterns' => [
        // Allow any subdomain of medigohealthcares.com (http and https)
        '#^https?://([a-z0-9-]+\.)?medigohealthcares\.com$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 600,

    'supports_credentials' => true,

];
