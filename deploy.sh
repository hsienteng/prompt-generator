#!/bin/bash

# Navigate to frontend directory
cd frontend

# Install dependencies
echo "Installing frontend dependencies..."
npm install

# Build frontend
echo "Building frontend..."
npm run build

# Navigate back to root
cd ..

# Start the application
echo "Starting application..."
./start.sh

echo "Deployment complete!"
