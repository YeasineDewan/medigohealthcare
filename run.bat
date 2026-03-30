@echo off
if "%1"=="dev" (
    start "Backend" cmd /k "php artisan serve"
    start "Frontend" cmd /k "npm run dev"
) else if "%1"=="build" (
    npm run build
) else (
    echo Usage: run.bat [dev|build]
    echo dev: Starts Laravel + Vite
    echo build: Vite production build
)

