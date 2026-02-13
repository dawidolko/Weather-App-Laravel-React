@echo off

echo =================================
echo Weather App - Docker Shutdown
echo =================================
echo.

REM Przejdź do katalogu z docker-compose
cd /d "%~dp0"

echo Stopping all containers...
docker compose down

echo.
echo [92mAll containers stopped![0m
echo.
echo To remove all data (including database), use:
echo   docker compose down -v
echo.
echo To start again, use:
echo   start.bat
echo.

pause
