<?php

// Minimal Laravel bootstrap for deployment without composer
define('LARAVEL_START', microtime(true));

// Register the auto loader
require __DIR__.'/../vendor/autoload.php';

// If vendor/autoload.php doesn't exist, create a minimal autoloader
if (!file_exists(__DIR__.'/../vendor/autoload.php')) {
    // Simple autoloader for App namespace
    spl_autoload_register(function ($class) {
        if (strpos($class, 'App\\') === 0) {
            $path = __DIR__ . '/../app/' . str_replace('\\', '/', substr($class, 4)) . '.php';
            if (file_exists($path)) {
                require_once $path;
                return true;
            }
        }
        return false;
    });
    
    // Define some essential constants
    if (!defined('LARAVEL_START')) {
        define('LARAVEL_START', microtime(true));
    }
}

// Create a minimal application instance
$app = new Illuminate\Foundation\Application(
    $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__)
);

// Bind important interfaces
$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);

return $app;
