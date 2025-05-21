#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Prompt Generator Troubleshooter${NC}"
echo "-------------------------------"

# Check if directories exist
echo -e "${YELLOW}Checking directory structure...${NC}"

BASE_DIR=$(pwd)
PROMPTS_DIR="$BASE_DIR/prompts"
PRODUCTS_DIR="$PROMPTS_DIR/products"
PERSONAS_DIR="$PROMPTS_DIR/personas"
SMALLTALKS_DIR="$PROMPTS_DIR/smalltalks"

check_directory() {
    DIR_PATH=$1
    DIR_NAME=$2
    
    if [ -d "$DIR_PATH" ]; then
        FILE_COUNT=$(ls -1 "$DIR_PATH"/*.txt 2>/dev/null | wc -l)
        if [ "$FILE_COUNT" -gt 0 ]; then
            echo -e "  ✅ $DIR_NAME directory exists with $FILE_COUNT .txt files"
        else
            echo -e "  ⚠️  $DIR_NAME directory exists but contains no .txt files"
        fi
    else
        echo -e "  ❌ $DIR_NAME directory does not exist"
        if [ "$3" == "create" ]; then
            echo -e "  🔨 Creating $DIR_NAME directory..."
            mkdir -p "$DIR_PATH"
            if [ $? -eq 0 ]; then
                echo -e "  ✅ Created $DIR_NAME directory"
            else
                echo -e "  ❌ Failed to create $DIR_NAME directory"
            fi
        fi
    fi
}

check_directory "$PROMPTS_DIR" "Prompts" "create"
check_directory "$PRODUCTS_DIR" "Products" "create"
check_directory "$PERSONAS_DIR" "Personas" "create"
check_directory "$SMALLTALKS_DIR" "Small talks" "create"

# Check if backend server is running
echo -e "\n${YELLOW}Checking if backend server is running...${NC}"
if curl -s http://localhost:5000/api/health > /dev/null; then
    echo -e "  ✅ Backend server is running"
else
    echo -e "  ❌ Backend server is not running"
    echo -e "  💡 Try starting the backend server with:"
    echo -e "     cd backend && python3 app.py"
fi

# Check if required Python packages are installed
echo -e "\n${YELLOW}Checking Python dependencies...${NC}"
if python3 -c "import flask" &> /dev/null; then
    echo -e "  ✅ Flask is installed"
else
    echo -e "  ❌ Flask is not installed"
    echo -e "  💡 Install required packages with:"
    echo -e "     cd backend && pip install -r requirements.txt"
fi

if python3 -c "import flask_cors" &> /dev/null; then
    echo -e "  ✅ Flask-CORS is installed"
else
    echo -e "  ❌ Flask-CORS is not installed"
    echo -e "  💡 Install required packages with:"
    echo -e "     cd backend && pip install -r requirements.txt"
fi

# Verify frontend package.json exists
echo -e "\n${YELLOW}Checking frontend setup...${NC}"
if [ -f "$BASE_DIR/frontend/package.json" ]; then
    echo -e "  ✅ Frontend package.json found"
else
    echo -e "  ❌ Frontend package.json not found"
    echo -e "  💡 Make sure you are in the prompt-generator directory"
fi

echo -e "\n${YELLOW}Troubleshooting completed!${NC}"
echo "If issues persist, try the following steps:"
echo "1. Restart both frontend and backend servers"
echo "2. Check the browser console for any frontend errors"
echo "3. Check the backend terminal for any Python errors"
echo "4. Make sure you have Node.js and npm installed for the frontend"
echo "5. Make sure you have Python 3 installed for the backend"
