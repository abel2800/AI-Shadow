#!/bin/bash

echo "========================================"
echo " AI SHADOW - Mental Health Companion"
echo "========================================"
echo ""
echo "Starting all services..."
echo ""

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if npm is installed
if ! command_exists npm; then
    echo "Error: npm is not installed. Please install Node.js first."
    exit 1
fi

# Check if directories exist
if [ ! -d "backend" ] || [ ! -d "frontend" ] || [ ! -d "desktop" ]; then
    echo "Error: Required directories (backend, frontend, desktop) not found."
    echo "Please run this script from the project root directory."
    exit 1
fi

# Start backend
echo "[1/3] Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..
sleep 3

# Start frontend
echo "[2/3] Starting Frontend Server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..
sleep 5

# Start desktop app
echo "[3/3] Starting Desktop App..."
cd desktop
npm run dev &
DESKTOP_PID=$!
cd ..

echo ""
echo "========================================"
echo " All services started!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:5000 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:5173 (PID: $FRONTEND_PID)"
echo "Desktop:  Opening in new window... (PID: $DESKTOP_PID)"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for Ctrl+C
trap "echo ''; echo 'Stopping all services...'; kill $BACKEND_PID $FRONTEND_PID $DESKTOP_PID 2>/dev/null; exit" INT

# Keep script running
wait

