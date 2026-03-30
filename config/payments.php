<?php

return [
    'gateway' => env('PAYMENT_GATEWAY', 'bkash'),

    'bkash' => [
        'enabled' => env('BKASH_ENABLED', false),
        'app_key' => env('BKASH_APP_KEY'),
        'app_secret' => env('BKASH_APP_SECRET'),
        'username' => env('BKASH_USERNAME'),
        'password' => env('BKASH_PASSWORD'),
        'base_url' => env('BKASH_BASE_URL', 'https://checkout.pay.bka.sh/v1.2.0-beta'),
    ],

    'nagad' => [
        'enabled' => env('NAGAD_ENABLED', false),
        // ...
    ],
];

