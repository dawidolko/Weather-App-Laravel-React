#!/bin/bash

echo "================================="
echo "Weather App - Docker Startup"
echo "================================="
echo ""
echo "Starting Docker containers..."
echo ""

# Przejdź do katalogu z docker-compose
cd "$(dirname "$0")"

# Sprawdź czy Docker jest zainstalowany
if ! command -v docker &> /dev/null; then
    echo "❌ Error: Docker is not installed!"
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Sprawdź czy Docker Compose jest dostępny
if ! docker compose version &> /dev/null; then
    echo "❌ Error: Docker Compose is not available!"
    echo "Please make sure Docker Desktop is running."
    exit 1
fi

echo "✅ Docker is ready!"
echo ""

# Sprawdź czy kontenery już działają
if docker compose ps | grep -q "Up"; then
    echo "⚠️  Containers are already running!"
    echo ""
    read -p "Do you want to restart them? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Restarting containers..."
        docker compose down
        docker compose up -d
    else
        echo "Keeping existing containers running."
        docker compose ps
        exit 0
    fi
else
    # Uruchom kontenery
    docker compose up -d
fi

echo ""
echo "================================="
echo "⏳ Waiting for services to start..."
echo "================================="
echo ""

# Poczekaj aż kontenery będą gotowe
sleep 5

# Sprawdź status
echo "Container status:"
docker compose ps
echo ""

# Poczekaj na backend
echo "Waiting for backend to be ready..."
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
    if docker compose exec -T backend php artisan --version &> /dev/null; then
        echo "✅ Backend is ready!"
        break
    fi
    attempt=$((attempt + 1))
    echo -n "."
    sleep 2
done
echo ""

if [ $attempt -eq $max_attempts ]; then
    echo "⚠️  Backend might not be ready yet. Check logs with: docker-compose logs backend"
else
    echo "✅ All services are running!"
fi

echo ""
echo "================================="
echo "🎉 Application is ready!"
echo "================================="
echo ""
echo "Frontend:    http://localhost:5173"
echo "Backend API: http://localhost:8000/api"
echo "PHPMyAdmin:  http://localhost:8080"
echo ""
echo "Database credentials:"
echo "  User:     weather_user"
echo "  Password: weather_password"
echo "  Database: weather_app"
echo ""
echo "Useful commands:"
echo "  docker compose logs -f        # View logs"
echo "  docker compose down           # Stop all containers"
echo "  docker compose restart        # Restart all containers"
echo "  docker compose exec backend bash   # Enter backend container"
echo "  docker compose exec frontend sh    # Enter frontend container"
echo ""
echo "For more information, see README.md"
echo "================================="
