@echo off
echo ========================================
echo  AI SHADOW - Mental Health Companion
echo ========================================
echo.
echo Starting all services...
echo.

echo [1/3] Starting Backend Server...
start "Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Frontend Server...
start "Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 5 /nobreak >nul

echo [3/3] Starting Desktop App...
start "Desktop" cmd /k "cd desktop && npm run dev"

echo.
echo ========================================
echo  All services started!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:5173
echo Desktop:  Opening in new window...
echo.
echo Press any key to close this window...
pause >nul

