@echo off
echo Starting Mini Social Post Application...

echo.
echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm start"

echo Backend server starting on http://localhost:5000
echo.

echo Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm start"

echo Frontend server starting on http://localhost:3000
echo.

echo Application is ready!
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:5000/api
echo.

pause
