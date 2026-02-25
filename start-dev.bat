@echo off
echo Starting Medigo Healthcare Development Environment...
echo.
echo Starting Mock API Server...
start "API Server" cmd /k "npm run api"
timeout /t 2 /nobreak >nul
echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm run dev"
echo.
echo Both servers are starting...
echo Frontend: http://localhost:5173
echo API: http://localhost:8000
echo.
pause
