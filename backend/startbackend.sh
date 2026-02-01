#!/bin/bash

# Start the FastAPI backend server
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Use the full path to uvicorn in the venv
UVICORN_PATH="$SCRIPT_DIR/venv/bin/uvicorn"

echo "Starting ATS Resume Analyzer Backend..."
echo "Server running on http://localhost:8000"
echo "API Docs available at http://localhost:8000/docs"

$UVICORN_PATH app.main:app --reload --host 0.0.0.0 --port 8000
