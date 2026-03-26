#!/bin/bash

# ATS Resume Analyzer - Run Script
# This script starts both frontend and backend services

set -e

echo "=========================================="
echo "ATS Resume Analyzer - Starting Services"
echo "=========================================="
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting backend service...${NC}"
cd "$SCRIPT_DIR/backend"
python3 -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

sleep 2

echo -e "${GREEN}✓${NC} Backend started (PID: $BACKEND_PID)"
echo ""

echo -e "${YELLOW}Starting frontend service...${NC}"
cd "$SCRIPT_DIR/frontend"
npm run dev &
FRONTEND_PID=$!

sleep 3

echo -e "${GREEN}✓${NC} Frontend started (PID: $FRONTEND_PID)"
echo ""

echo "=========================================="
echo "Services are running:"
echo "=========================================="
echo -e "${GREEN}Frontend${NC}:  http://localhost:5173"
echo -e "${GREEN}Backend${NC}:   http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID

echo ""
echo "Services stopped."
