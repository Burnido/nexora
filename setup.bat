@echo off
echo.
echo 🚀 Starting Nexora ADHD Platform Setup...
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

echo ✅ Node.js is installed
node --version
echo.

REM Frontend setup
echo 📦 Setting up Frontend...
cd frontend
call npm install
echo ✅ Frontend dependencies installed
echo.
cd ..

REM Backend setup
echo 📦 Setting up Backend...
cd backend
call npm install
if not exist .env (
    copy .env.example .env
)
echo ✅ Backend dependencies installed
echo ⚠️  Please update .env with your configuration
echo.
cd ..

echo ✅ Setup complete!
echo.
echo 🚀 To start development:
echo.
echo    Terminal 1 (Frontend):
echo    cd frontend
echo    npm run dev
echo.
echo    Terminal 2 (Backend):
echo    cd backend
echo    npm run dev
echo.
echo    Open http://localhost:3000 in your browser
echo.
pause
