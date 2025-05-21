#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Fixing Watchdog Compatibility Issue${NC}"
echo "------------------------------------------------"

# Check if pip is available
if command -v pip3 &> /dev/null; then
    PIP_CMD="pip3"
elif command -v pip &> /dev/null; then
    PIP_CMD="pip"
else
    echo -e "${RED}Error: pip is not installed. Please install pip first.${NC}"
    exit 1
fi

echo -e "${YELLOW}Checking current watchdog version...${NC}"
$PIP_CMD list | grep watchdog

echo -e "${YELLOW}Uninstalling current watchdog version...${NC}"
$PIP_CMD uninstall -y watchdog

echo -e "${YELLOW}Installing compatible watchdog version (3.0.0)...${NC}"
$PIP_CMD install watchdog==3.0.0

echo -e "${GREEN}Watchdog fixed! The Flask application should now run correctly.${NC}"
echo "To run the Flask backend, use one of these commands:"
echo "  - python3 app.py                (with auto-reloading)"
echo "  - python3 run_no_reload.py      (without auto-reloading)"
echo ""
echo "Or use the start.sh script to start both frontend and backend:"
echo "  - ./start.sh"
