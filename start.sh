#!/bin/bash
echo "Installing backend dependencies..."
cd backend && npm install
echo "Installing frontend dependencies..."
cd ../frontend && npm install
echo "Starting development servers..."
npm run dev
