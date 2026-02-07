#!/bin/bash

echo "Starting Mini Social Post Application..."

echo ""
echo "Starting Backend Server..."
cd backend
npm start &
BACKEND_PID=$!

echo "Backend server starting on http://localhost:5000"
echo ""

echo "Starting Frontend Server..."
cd ../frontend
npm start &
FRONTEND_PID=$!

echo "Frontend server starting on http://localhost:3000"
echo ""

echo "Application is ready!"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:5000/api"
echo ""

function cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

wait
