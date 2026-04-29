@echo off
title Medigo Healthcare - Full Stack Development
echo ================================================
echo Starting Medigo Healthcare Full Stack Development
echo ================================================
echo.

REM Check if PHP is available
php --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: PHP is not installed or not in PATH
    echo Please install PHP and add it to your PATH
    pause
    exit /b 1
)

REM Check/Install Composer
if not exist "composer.phar" (
    echo Downloading Composer...
    powershell -Command "Invoke-WebRequest -Uri https://getcomposer.org/composer-stable.phar -OutFile composer.phar"
    if %errorlevel% neq 0 (
        echo Failed to download Composer. Please download manually from https://getcomposer.org/download/
        pause
        exit /b 1
    )
)

REM Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js and add it to your PATH
    pause
    exit /b 1
)

REM Install PHP Dependencies
echo.
echo [1/6] Installing PHP dependencies...
php composer.phar install --no-dev --optimize-autoloader
if %errorlevel% neq 0 (
    echo Composer install failed. Please check your PHP and Composer installation.
    pause
    exit /b %errorlevel%
)

REM Install Node Dependencies
echo.
echo [2/6] Installing Node.js dependencies...
npm install
if %errorlevel% neq 0 (
    echo npm install failed. Please check your Node.js installation.
    pause
    exit /b %errorlevel%
)

REM Laravel Setup
echo.
echo [3/6] Generating application key...
php artisan key:generate --force

echo.
echo [4/6] Running database migrations and seeding...
php artisan migrate:fresh --seed
if %errorlevel% neq 0 (
    echo Database migration failed. Please check your database configuration in .env
    pause
    exit /b %errorlevel%
)

REM Cache configuration
echo.
echo [5/6] Optimizing application...
php artisan config:cache
php artisan route:cache

REM Start Laravel Server
echo.
echo [6/6] Starting servers...
echo.
echo Starting Laravel API server (http://localhost:8000)...
start "Laravel API - http://localhost:8000" cmd /k "php artisan serve --host=0.0.0.0 --port=8000"

REM Wait a moment for Laravel to start
timeout /t 3 /nobreak >nul

REM Start Frontend
echo Starting Vite dev server (http://localhost:5173)...
echo.
echo ================================================
echo Full stack is ready!
echo ================================================
echo Frontend: http://localhost:5173
echo API:      http://localhost:8000
echo.
echo Admin login: admin@example.com / password
echo Patient login: patient@example.com / password123
echo.
echo Press Ctrl+C to stop servers
echo ================================================

npm run dev

