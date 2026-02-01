#!/bin/bash

# Start the React frontend development server
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Starting ATS Resume Analyzer Frontend..."
echo "Frontend running on http://localhost:5173"
echo ""
echo "Make sure the backend is running on http://localhost:8000"
echo ""

npm run dev
