@echo off
echo ========================================
echo  AI SHADOW Installation Verification
echo ========================================
echo.

:: Check Node.js
echo [1/6] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found! Please install Node.js v18 or higher.
    echo    Download: https://nodejs.org/
) else (
    echo ✅ Node.js installed
    node --version
)
echo.

:: Check npm
echo [2/6] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found!
) else (
    echo ✅ npm installed
    npm --version
)
echo.

:: Check PostgreSQL
echo [3/6] Checking PostgreSQL...
psql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  PostgreSQL not found in PATH (may still be installed)
    echo    Download: https://www.postgresql.org/download/
) else (
    echo ✅ PostgreSQL installed
    psql --version
)
echo.

:: Check backend dependencies
echo [4/6] Checking backend dependencies...
if exist "backend\node_modules\" (
    echo ✅ Backend dependencies installed
) else (
    echo ❌ Backend dependencies not installed
    echo    Run: cd backend ^&^& npm install
)
echo.

:: Check frontend dependencies
echo [5/6] Checking frontend dependencies...
if exist "frontend\node_modules\" (
    echo ✅ Frontend dependencies installed
) else (
    echo ❌ Frontend dependencies not installed
    echo    Run: cd frontend ^&^& npm install
)
echo.

:: Check desktop dependencies
echo [6/6] Checking desktop dependencies...
if exist "desktop\node_modules\" (
    echo ✅ Desktop dependencies installed
) else (
    echo ❌ Desktop dependencies not installed
    echo    Run: cd desktop ^&^& npm install
)
echo.

:: Check .env file
echo [Bonus] Checking backend configuration...
if exist "backend\.env" (
    echo ✅ Backend .env file exists
) else (
    echo ❌ Backend .env file missing
    echo    Copy backend\.env.example to backend\.env and configure it
)
echo.

echo ========================================
echo  Verification Complete
echo ========================================
echo.
echo Next steps:
echo 1. Make sure PostgreSQL is running
echo 2. Configure backend/.env file
echo 3. Run: cd backend ^&^& npm run db:setup
echo 4. Run: start-all.bat
echo.
echo For detailed instructions, see COMPLETE-SETUP-GUIDE.md
echo.
pause

