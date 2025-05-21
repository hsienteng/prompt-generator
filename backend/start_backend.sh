#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting backend server with virtual environment${NC}"
echo "-------------------------------------------------"

# Check if venv directory exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Creating new virtual environment...${NC}"
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo -e "${RED}Failed to create virtual environment. Please ensure you have venv installed:${NC}"
        echo "python3 -m pip install --user virtualenv"
        exit 1
    fi
fi

# Activate virtual environment
echo -e "${YELLOW}Activating virtual environment...${NC}"
source venv/bin/activate

# Install dependencies
echo -e "${YELLOW}Installing dependencies in virtual environment...${NC}"
pip install -r requirements.txt

echo -e "${GREEN}Starting Flask backend server...${NC}"
python app.py

# This script will not return until the Flask app is stopped with Ctrl+C
# The virtual environment will be deactivated when the terminal session ends or
# you can manually deactivate it with the 'deactivate' command
