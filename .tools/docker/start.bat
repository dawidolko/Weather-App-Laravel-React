@echo off
setlocal enabledelayedexpansion

echo =================================
echo Weather App - Docker Startup
echo =================================
echo.
echo Starting Docker containers...
echo.

REM Przejdź do katalogu z docker-compose
cd /d "%~dp0"

REM Sprawdź czy Docker jest zainstalowany
docker --version >nul 2>&1
if errorlevel 1 (
    echo [91mError: Docker is not installed![0m
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

REM Sprawdź czy Docker Compose jest dostępny
docker compose version >nul 2>&1
if errorlevel 1 (
    echo [91mError: Docker Compose is not available![0m
    echo Please make sure Docker Desktop is running.
    pause
    exit /b 1
)

echo [92mDocker is ready![0m
echo.

REM Sprawdź czy kontenery już działają
docker compose ps | findstr "Up" >nul 2>&1
if not errorlevel 1 (
    echo [93mContainers are already running![0m
    echo.
    set /p restart="Do you want to restart them? (y/n): "
    if /i "!restart!"=="y" (
        echo Restarting containers...
        docker compose down
        docker compose up -d
    ) else (
        echo Keeping existing containers running.
        docker compose ps
        goto end
    )
) else (
    REM Uruchom kontenery
    docker compose up -d
)

echo.
echo =================================
echo Waiting for services to start...
echo =================================
echo.

REM Poczekaj aż kontenery będą gotowe
timeout /t 5 /nobreak >nul

REM Sprawdź status
echo Container status:
docker compose ps
echo.

REM Poczekaj na backend
echo Waiting for backend to be ready...
set max_attempts=30
set attempt=0

:wait_backend
if !attempt! geq !max_attempts! goto backend_timeout

docker compose exec -T backend php artisan --version >nul 2>&1
if not errorlevel 1 (
    echo [92mBackend is ready![0m
    goto backend_ready
)

set /a attempt+=1
echo|set /p="."
timeout /t 2 /nobreak >nul
goto wait_backend

:backend_timeout
echo.
echo [93mBackend might not be ready yet. Check logs with: docker compose logs backend[0m
goto show_info

:backend_ready
echo.
echo [92mAll services are running![0m

:show_info
echo.
echo =================================
echo Application is ready!
echo =================================
echo.
echo Frontend:    http://localhost:5173
echo Backend API: http://localhost:8000/api
echo PHPMyAdmin:  http://localhost:8080
echo.
echo Database credentials:
echo   User:     weather_user
echo   Password: weather_password
echo   Database: weather_app
echo.
echo Useful commands:
echo   docker compose logs -f              # View logs
echo   docker compose down                 # Stop all containers
echo   docker compose restart              # Restart all containers
echo   docker compose exec backend bash    # Enter backend container
echo   docker compose exec frontend sh     # Enter frontend container
echo.
echo For more information, see README.md
echo =================================

:end
pause
