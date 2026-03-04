@echo off
echo Starting Laravel Backend Server...
cd /d "e:\Web App source code\medigohealthcare-main"

REM Check if .env exists, if not copy from .env.example
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

REM Start Laravel development server
php artisan serve --host=127.0.0.1 --port=8000

pause