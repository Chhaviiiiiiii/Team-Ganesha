@echo off
echo 🚀 Installing Kumbh Sava - Full Stack Application
echo ==================================================
echo.

REM Check Node.js
echo 📋 Checking Node.js version...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

node -v
echo.

REM Check MongoDB
echo 📋 Checking MongoDB...
where mongod >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  MongoDB is not installed or not in PATH.
    echo    Please install MongoDB 6+ from: https://www.mongodb.com/try/download/community
    echo    Or use MongoDB Atlas cloud: https://www.mongodb.com/cloud/atlas
    echo.
)

REM Install Backend Dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Backend installation failed
    pause
    exit /b 1
)

REM Create .env file
if not exist .env (
    echo 📝 Creating .env file...
    copy .env.example .env
    echo ✅ Created .env file. Please update it with your MongoDB URI.
)

REM Install Frontend Dependencies
echo.
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Frontend installation failed
    pause
    exit /b 1
)

echo.
echo ✅ Installation Complete!
echo.
echo 📝 Next Steps:
echo ==============
echo.
echo 1. Start MongoDB (if not already running)
echo.
echo 2. Configure backend (edit backend\.env):
echo    MONGODB_URI=your_mongodb_connection_string
echo.
echo 3. Start the backend server:
echo    cd backend
echo    npm run dev
echo.
echo 4. In a new terminal, start the frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 5. Open your browser:
echo    http://localhost:3000
echo.
echo 🎉 Enjoy Kumbh Sava Control System!
pause
