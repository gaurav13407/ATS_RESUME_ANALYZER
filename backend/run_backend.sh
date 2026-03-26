#!/bin/bash

# Backend Run Script
# Activates venv and runs the backend server

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if venv exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Virtual environment not found. Running setup...${NC}"
    bash setup_backend.sh
fi

echo ""
echo "=========================================="
echo "Starting Backend Server"
echo "=========================================="
echo ""

source venv/bin/activate

echo -e "${YELLOW}Activating virtual environment...${NC}"
echo -e "${GREEN}✓${NC} Virtual environment activated"
echo ""

echo -e "${YELLOW}Starting FastAPI server...${NC}"
echo ""
python -m uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
