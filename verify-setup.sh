#!/bin/bash

echo "🔍 Verifying QuickBG Remover setup..."

# Check Node.js version
echo "📦 Checking Node.js version..."
NODE_VERSION=$(node --version)
echo "Node.js version: $NODE_VERSION"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

# Check npm version
echo "📦 Checking npm version..."
NPM_VERSION=$(npm --version)
echo "npm version: $NPM_VERSION"

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found. Running npm install..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found. Creating from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
    echo "⚠️  Please edit .env.local and add your Remove.bg API key"
fi

# Check required files
REQUIRED_FILES=(
    "src/app/layout.tsx"
    "src/app/page.tsx"
    "src/components/DropZone.tsx"
    "src/components/ImagePreview.tsx"
    "src/components/ProgressBar.tsx"
    "src/lib/removebg.ts"
    "src/lib/utils.ts"
    "src/types/index.ts"
    "tailwind.config.js"
    "next.config.js"
)

echo "📁 Checking required files..."
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    else
        echo "✅ $file"
    fi
done

echo ""
echo "🎉 Setup verification completed successfully!"
echo ""
echo "Ready to start:"
echo "1. Edit .env.local and add your Remove.bg API key"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "For deployment options, check the README.md file"