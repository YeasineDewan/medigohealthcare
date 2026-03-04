@echo off
echo ============================================
echo Medigo Healthcare - Database Upload Script
echo ============================================
echo.
echo This script will upload all data to your online database
echo Make sure to update the database configuration first!
echo.
pause

echo Installing dependencies...
call npm install mysql2

echo.
echo Starting database upload...
echo.

node upload_to_online_db.js

echo.
echo Upload process completed!
pause
