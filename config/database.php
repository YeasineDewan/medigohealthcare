<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Database Connection
    |--------------------------------------------------------------------------
    |
    | If the environment is set to MySQL but the PDO MySQL driver isn't
    | available, fall back to SQLite so the app can still boot.
    */
    'default' => (env('DB_CONNECTION', 'mysql') === 'mysql' && ! extension_loaded('pdo_mysql'))
        ? 'sqlite'
        : env('DB_CONNECTION', 'mysql'),

    'connections' => [
        'mysql' => [
            'driver'      => 'mysql',
            'url'         => env('DATABASE_URL'),
            'host'        => env('DB_HOST', 'localhost'),
            'port'        => env('DB_PORT', '3306'),
            'database'    => env('DB_DATABASE', 'medigohe_db_yds'),
            'username'    => env('DB_USERNAME', 'medigohe_db_yds'),
            'password'    => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset'     => 'utf8mb4',
            'collation'   => 'utf8mb4_unicode_ci',
            'prefix'      => '',
            'prefix_indexes' => true,
            'strict'      => true,
            'engine'      => null,
            'options'     => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
        'sqlite' => [
            'driver' => 'sqlite',
            'url' => env('DATABASE_URL'),
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],
    ],

    'migrations' => 'migrations',
];
