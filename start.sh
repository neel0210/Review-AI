#!/usr/bin/env bash
set -e

# Ensure dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run the development server
echo "Starting Vite development server..."
npm run dev
