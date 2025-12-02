@echo off
echo ========================================
echo  AI SHADOW Desktop App - Quick Start
echo ========================================
echo.
echo This will start the desktop app.
echo.
echo IMPORTANT: Make sure these are running first:
echo   1. Backend server (port 5000)
echo   2. Frontend server (port 5173)
echo.
echo If they're not running, press Ctrl+C now and run:
echo   start-all.bat
echo.
pause

cd desktop
echo Starting desktop app...
npm start

