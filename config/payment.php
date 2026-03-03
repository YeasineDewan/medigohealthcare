<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Payment Gateway
    |--------------------------------------------------------------------------
    */
    'default' => env('PAYMENT_GATEWAY', 'bkash'),

    /*
    |--------------------------------------------------------------------------
    | Payment Gateways
    |--------------------------------------------------------------------------
    */
    'gateways' => [
        'bkash' => [
            'enabled' => env('BKASH_ENABLED', true),
            'app_key' => env('BKASH_APP_KEY', ''),
            'app_secret' => env('BKASH_APP_SECRET', ''),
            'username' => env('BKASH_USERNAME', ''),
            'password' => env('BKASH_PASSWORD', ''),
            'base_url' => env('BKASH_BASE_URL', 'https://checkout.sandbox.bka.sh/v1.2.0-beta'),
        ],

        'nagad' => [
            'enabled' => env('NAGAD_ENABLED', false),
            'merchant_id' => env('NAGAD_MERCHANT_ID', ''),
            'merchant_number' => env('NAGAD_MERCHANT_NUMBER', ''),
            'public_key' => env('NAGAD_PUBLIC_KEY', ''),
            'private_key' => env('NAGAD_PRIVATE_KEY', ''),
            'base_url' => env('NAGAD_BASE_URL', 'http://sandbox.mynagad.com:10080/remote-payment-gateway-1.0/api/dfs'),
        ],

        'rocket' => [
            'enabled' => env('ROCKET_ENABLED', false),
            'merchant_id' => env('ROCKET_MERCHANT_ID', ''),
            'merchant_password' => env('ROCKET_MERCHANT_PASSWORD', ''),
            'base_url' => env('ROCKET_BASE_URL', ''),
        ],

        'stripe' => [
            'enabled' => env('STRIPE_ENABLED', false),
            'key' => env('STRIPE_KEY', ''),
            'secret' => env('STRIPE_SECRET', ''),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Currency
    |--------------------------------------------------------------------------
    */
    'currency' => env('PAYMENT_CURRENCY', 'BDT'),
    'currency_symbol' => env('PAYMENT_CURRENCY_SYMBOL', '৳'),
];
