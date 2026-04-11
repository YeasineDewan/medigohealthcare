@echo off
echo Starting Medigo Health Full Stack...
echo =====================================
echo.

REM Check/Install Composer
if not exist "composer.phar" (
    echo Downloading Composer...
    powershell -Command "Invoke-WebRequest -Uri https://getcomposer.org/composer-stable.phar -OutFile composer.phar"
)

REM Install PHP Dependencies
echo Installing PHP dependencies...
php composer.phar install --no-dev --optimize-autoloader
if %errorlevel% neq 0 (
    echo Composer install failed. Install Composer: https://getcomposer.org/download/
    pause
    exit /b %errorlevel%
)

REM Laravel Setup
echo Generating app key...
php artisan key:generate --force

echo Running migrations + seeding...
php artisan migrate:fresh --seed

REM Start Laravel Server
echo.
echo Starting Laravel API server (http://localhost:8000)...
start "Laravel API" cmd /k "php artisan serve --host=0.0.0.0 --port=8000"

REM Start Frontend
echo.
echo Starting Vite dev server (http://localhost:5173)...
echo Open browser to http://localhost:5173/admin after login.
npm run dev

echo.
echo Full stack ready!
pause

