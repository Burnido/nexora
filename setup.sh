#!/bin/bash

echo "🚀 Starting Nexora ADHD Platform Setup..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Frontend setup
echo "📦 Setting up Frontend..."
cd frontend
npm install
echo "✅ Frontend dependencies installed"
echo ""

# Backend setup
echo "📦 Setting up Backend..."
cd ../backend
npm install
cp .env.example .env
echo "✅ Backend dependencies installed"
echo "⚠️  Please update .env with your configuration"
echo ""

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo ""
echo "   Terminal 1 (Frontend):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "   Terminal 2 (Backend):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "   Open http://localhost:3000 in your browser"
echo ""
