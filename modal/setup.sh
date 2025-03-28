#!/bin/bash
# setup.sh

# Set up Python virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Check if Modal is authenticated
echo "Checking Modal authentication..."
if ! modal token 2>/dev/null; then
    echo "Modal authentication required."
    echo "Running 'modal setup' - please follow the browser prompt to authenticate."
    modal setup
else
    echo "Modal already authenticated."
fi

echo "Environment set up successfully. Activate with 'source venv/bin/activate'"