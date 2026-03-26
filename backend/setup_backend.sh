#!/bin/bash

# Backend Setup Script
# Creates venv, activates it, installs requirements

set -e

echo "=========================================="
echo "Backend Setup"
echo "=========================================="
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}[1/3]${NC} Creating Python virtual environment..."
python3 -m venv venv
echo -e "${GREEN}✓${NC} Virtual environment created"
echo ""

echo -e "${YELLOW}[2/3]${NC} Activating virtual environment..."
source venv/bin/activate
echo -e "${GREEN}✓${NC} Virtual environment activated"
echo ""

echo -e "${YELLOW}[3/3]${NC} Installing requirements..."
pip install --upgrade pip
pip install -r requirements.txt
echo -e "${GREEN}✓${NC} Requirements installed"
echo ""

echo "=========================================="
echo "Setup Complete!"
echo "=========================================="
echo ""
echo "To run the backend:"
echo "  source venv/bin/activate"
echo "  python -m uvicorn api.main:app --reload"
echo ""
