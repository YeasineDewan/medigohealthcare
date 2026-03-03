<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Backup Settings
    |--------------------------------------------------------------------------
    */
    'backup' => [
        'name' => env('APP_NAME', 'medigo'),
        
        'source' => [
            'files' => [
                'include' => [
                    base_path(),
                ],
                'exclude' => [
                    base_path('vendor'),
                    base_path('node_modules'),
                    base_path('storage/framework/cache'),
                    base_path('storage/framework/sessions'),
                    base_path('storage/framework/views'),
                ],
            ],
            
            'databases' => [
                env('DB_CONNECTION', 'mysql'),
            ],
        ],
        
        'destination' => [
            'filename_prefix' => 'backup-',
            'disks' => [
                'local',
            ],
        ],
        
        'cleanup' => [
            'strategy' => 'default',
            'defaultStrategy' => [
                'keepAllBackupsForDays' => 7,
                'keepDailyBackupsForDays' => 16,
                'keepWeeklyBackupsForWeeks' => 8,
                'keepMonthlyBackupsForMonths' => 4,
                'keepYearlyBackupsForYears' => 2,
                'deleteOldestBackupsWhenUsingMoreMegabytesThan' => 5000,
            ],
        ],
    ],
];
