#!/bin/bash

echo "🔍 Kumbh Sava - Installation Verification"
echo "=========================================="
echo ""

# Check project structure
echo "📁 Checking project structure..."
if [ -d "frontend" ] && [ -d "backend" ]; then
    echo "✅ Project folders exist"
else
    echo "❌ Project folders missing"
    exit 1
fi

# Check frontend files
echo ""
echo "🎨 Checking frontend files..."
FRONTEND_FILES=(
    "frontend/package.json"
    "frontend/vite.config.js"
    "frontend/tailwind.config.js"
    "frontend/src/App.jsx"
    "frontend/src/components/DashboardController.jsx"
    "frontend/src/components/MacOSDock.jsx"
)

for file in "${FRONTEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done

# Check backend files
echo ""
echo "🔧 Checking backend files..."
BACKEND_FILES=(
    "backend/package.json"
    "backend/server.js"
    "backend/models/User.js"
    "backend/models/Alert.js"
    "backend/routes/dashboard.js"
)

for file in "${BACKEND_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done

# Check documentation
echo ""
echo "📚 Checking documentation..."
DOC_FILES=(
    "README.md"
    "SETUP.md"
    "API.md"
    "FEATURES.md"
    "DEPLOYMENT.md"
    "QUICK_REFERENCE.md"
    "BUILD_SUMMARY.md"
)

for file in "${DOC_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done

# Check dependencies
echo ""
echo "📦 Checking dependencies installation..."

if [ -d "frontend/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed (run: cd frontend && npm install)"
fi

if [ -d "backend/node_modules" ]; then
    echo "✅ Backend dependencies installed"
else
    echo "⚠️  Backend dependencies not installed (run: cd backend && npm install)"
fi

# Check environment
echo ""
echo "⚙️  Checking environment setup..."

if [ -f "backend/.env" ]; then
    echo "✅ Backend .env file exists"
else
    echo "⚠️  Backend .env not found (copy from .env.example)"
fi

# Check Node version
echo ""
echo "🔧 Checking Node.js version..."
NODE_VERSION=$(node -v 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js not found"
fi

# Check MongoDB
echo ""
echo "🗄️  Checking MongoDB..."
if command -v mongod &> /dev/null; then
    echo "✅ MongoDB is installed"
else
    echo "⚠️  MongoDB not found (required for backend)"
fi

# Count files
echo ""
echo "📊 Project Statistics..."
JS_COUNT=$(find . -name "*.js" -o -name "*.jsx" | grep -v node_modules | wc -l | xargs)
MD_COUNT=$(find . -name "*.md" | wc -l | xargs)
JSON_COUNT=$(find . -name "*.json" | grep -v node_modules | wc -l | xargs)

echo "   JavaScript files: $JS_COUNT"
echo "   Documentation files: $MD_COUNT"
echo "   Configuration files: $JSON_COUNT"

# Final verdict
echo ""
echo "=========================================="
if [ -d "frontend" ] && [ -d "backend" ] && [ -f "backend/server.js" ] && [ -f "frontend/src/App.jsx" ]; then
    echo "✅ Installation verification PASSED!"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Configure backend/.env with MongoDB URI"
    echo "   2. Run backend: cd backend && npm run dev"
    echo "   3. Run frontend: cd frontend && npm run dev"
    echo "   4. Access: http://localhost:3000"
else
    echo "❌ Installation verification FAILED"
    echo "   Please check missing files above"
fi
echo "=========================================="
