#!/bin/bash

# Weather App Docker - Test Script
# Ten skrypt testuje czy wszystko jest poprawnie skonfigurowane

echo "=========================================="
echo "Weather App Docker - Configuration Test"
echo "=========================================="
echo ""

cd "$(dirname "$0")"

# Test 1: Docker
echo "📦 Test 1: Checking Docker..."
if command -v docker &> /dev/null; then
    echo "✅ Docker is installed"
    docker --version
else
    echo "❌ Docker is not installed"
    exit 1
fi
echo ""

# Test 2: Docker Compose
echo "🐙 Test 2: Checking Docker Compose..."
if docker compose version &> /dev/null; then
    echo "✅ Docker Compose is available"
    docker compose version
else
    echo "❌ Docker Compose is not available"
    exit 1
fi
echo ""

# Test 3: docker-compose.yml validation
echo "📝 Test 3: Validating docker-compose.yml..."
if docker compose config > /dev/null 2>&1; then
    echo "✅ docker-compose.yml is valid"
else
    echo "❌ docker-compose.yml has errors"
    docker compose config
    exit 1
fi
echo ""

# Test 4: Check ports
echo "🔌 Test 4: Checking if ports are available..."
PORTS=(3307 5173 8000 8080)
ALL_PORTS_FREE=true

for PORT in "${PORTS[@]}"; do
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "⚠️  Port $PORT is already in use"
        ALL_PORTS_FREE=false
    else
        echo "✅ Port $PORT is available"
    fi
done

if [ "$ALL_PORTS_FREE" = false ]; then
    echo ""
    echo "⚠️  Some ports are in use. You may need to:"
    echo "   - Stop services using those ports"
    echo "   - Change ports in docker-compose.yml"
fi
echo ""

# Test 5: Check required files
echo "📄 Test 5: Checking required files..."
FILES=(
    "docker-compose.yml"
    "Dockerfile.backend"
    "Dockerfile.frontend"
    "backend-entrypoint.sh"
    "init-db.sh"
    "start.sh"
    "stop.sh"
    "README.md"
    "QUICKSTART.md"
)

for FILE in "${FILES[@]}"; do
    if [ -f "$FILE" ]; then
        echo "✅ $FILE exists"
    else
        echo "❌ $FILE is missing"
    fi
done
echo ""

# Test 6: Check execute permissions
echo "🔐 Test 6: Checking execute permissions..."
SCRIPTS=(
    "backend-entrypoint.sh"
    "init-db.sh"
    "start.sh"
    "stop.sh"
)

for SCRIPT in "${SCRIPTS[@]}"; do
    if [ -x "$SCRIPT" ]; then
        echo "✅ $SCRIPT is executable"
    else
        echo "⚠️  $SCRIPT is not executable (fixing...)"
        chmod +x "$SCRIPT"
        echo "✅ Fixed: $SCRIPT"
    fi
done
echo ""

# Summary
echo "=========================================="
echo "✨ Configuration test completed!"
echo "=========================================="
echo ""
echo "If all tests passed, you can start the app:"
echo "  ./start.sh"
echo ""
echo "Access the application at:"
echo "  Frontend:    http://localhost:5173"
echo "  Backend API: http://localhost:8000/api"
echo "  PHPMyAdmin:  http://localhost:8080"
echo ""
