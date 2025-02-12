@echo off
echo =================================
echo Starting Frontend Setup Script
echo ==================================

call rm -rf node_modules package-lock.json
call npm cache clean --force

:: Checking if Node.js is installed
node -v >nul 2>&1
IF ERRORLEVEL 1 (
echo Error: Node.js is not installed. Please install Node.js and try again.
pause
exit /b
)

:: Installing dependencies
echo Installing dependencies...
call npm install
call npm install react-toastify
call npm install react-countup
call npm install cors
call npm install -D sass
call npm install react-icons
call npm install framer-motion react-countup react-slick react-intersection-observer slick-carousel

:: Installing axios
echo Installing axios...
call npm install axios

:: Installing react-router-dom
echo Installing react-router-dom...
call npm install react-router-dom

:: Building the application
echo Building the project...
call npm run build

:: Starting the application
echo Starting the development server...
call npm start
pause