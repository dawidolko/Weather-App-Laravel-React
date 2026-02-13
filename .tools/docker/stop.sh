#!/bin/bash

echo "================================="
echo "Weather App - Docker Shutdown"
echo "================================="
echo ""

# Przejdź do katalogu z docker-compose
cd "$(dirname "$0")"

echo "Stopping all containers..."
docker compose down

echo ""
echo "✅ All containers stopped!"
echo ""
echo "To remove all data (including database), use:"
echo "  docker compose down -v"
echo ""
echo "To start again, use:"
echo "  ./start.sh"
echo ""
