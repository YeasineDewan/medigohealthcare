<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Notification Settings
    |--------------------------------------------------------------------------
    */
    'channels' => [
        'database' => true,
        'mail' => env('NOTIFICATION_MAIL_ENABLED', false),
        'sms' => env('NOTIFICATION_SMS_ENABLED', false),
    ],

    'sms' => [
        'provider' => env('SMS_PROVIDER', 'twilio'),
        'twilio' => [
            'sid' => env('TWILIO_SID', ''),
            'token' => env('TWILIO_TOKEN', ''),
            'from' => env('TWILIO_FROM', ''),
        ],
    ],

    'events' => [
        'appointment_created' => true,
        'appointment_confirmed' => true,
        'appointment_cancelled' => true,
        'order_placed' => true,
        'order_completed' => true,
        'lab_test_booked' => true,
        'lab_test_completed' => true,
        'prescription_created' => true,
    ],
];
