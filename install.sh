#!/bin/bash

echo "🚀 Installing Kumbh Sava - Full Stack Application"
echo "=================================================="
echo ""

# Check Node.js version
echo "📋 Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Warning: Node.js version 18 or higher is recommended. Current version: $(node -v)"
fi

# Check MongoDB
echo ""
echo "📋 Checking MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB is not installed or not in PATH."
    echo "   Please install MongoDB 6+ from: https://www.mongodb.com/try/download/community"
    echo "   Or use MongoDB Atlas cloud: https://www.mongodb.com/cloud/atlas"
fi

# Install Backend Dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Backend installation failed"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env file. Please update it with your MongoDB URI."
fi

# Install Frontend Dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Frontend installation failed"
    exit 1
fi

echo ""
echo "✅ Installation Complete!"
echo ""
echo "📝 Next Steps:"
echo "=============="
echo ""
echo "1. Start MongoDB (if not already running):"
echo "   mongod"
echo ""
echo "2. Configure backend (edit backend/.env):"
echo "   MONGODB_URI=your_mongodb_connection_string"
echo ""
echo "3. Start the backend server:"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "4. In a new terminal, start the frontend:"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "5. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "🎉 Enjoy Kumbh Sava Control System!"
