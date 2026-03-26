#!/bin/bash

# ATS Resume Analyzer - Complete Setup Script
# This script installs all dependencies for both frontend and backend

set -e  # Exit on error

echo "=========================================="
echo "ATS Resume Analyzer - Setup Script"
echo "=========================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running on Linux
if [[ "$OSTYPE" != "linux-gnu"* ]]; then
    echo -e "${RED}Error: This script is designed for Linux only.${NC}"
    exit 1
fi

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${YELLOW}[1/5]${NC} Checking system dependencies..."
echo ""

# Check for Node.js and npm
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed.${NC}"
    echo "Please install Node.js (v16 or higher) from https://nodejs.org/"
    exit 1
else
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Node.js is installed: $NODE_VERSION"
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}npm is not installed.${NC}"
    exit 1
else
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} npm is installed: $NPM_VERSION"
fi

echo ""

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Python 3 is not installed.${NC}"
    echo "Please install Python 3 (v3.8 or higher)"
    exit 1
else
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✓${NC} Python 3 is installed: $PYTHON_VERSION"
fi

echo ""

# Check for pip
if ! command -v pip3 &> /dev/null; then
    echo -e "${RED}pip3 is not installed.${NC}"
    exit 1
else
    echo -e "${GREEN}✓${NC} pip3 is installed"
fi

echo ""
echo -e "${YELLOW}[2/5]${NC} Installing frontend dependencies..."
echo ""

cd "$SCRIPT_DIR/frontend"
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${RED}Error: package.json not found in frontend directory${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}[3/5]${NC} Installing backend dependencies..."
echo ""

cd "$SCRIPT_DIR/backend"
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${RED}Error: requirements.txt not found in backend directory${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}[4/5]${NC} Setting up project structure..."
echo ""

# Create uploads directory if it doesn't exist
mkdir -p "$SCRIPT_DIR/backend/uploads"
echo -e "${GREEN}✓${NC} Uploads directory ready"

echo ""
echo -e "${YELLOW}[5/5]${NC} Setup completed successfully!"
echo ""
echo "=========================================="
echo " Setup Complete!"
echo "=========================================="
echo ""
echo "To start the application:"
echo ""
echo "Option 1 - Start both services together:"
echo "  bash run.sh"
echo ""
echo "Option 2 - Start services separately:"
echo "  Backend:  cd backend && python3 -m uvicorn api.main:app --reload"
echo "  Frontend: cd frontend && npm run dev"
echo ""
echo "Frontend will be available at: http://localhost:5173"
echo "Backend API will be available at: http://localhost:8000"
echo ""
