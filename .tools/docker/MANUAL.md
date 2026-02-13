# Manual Installation & Setup Guide

This guide provides step-by-step instructions for setting up the Weather App manually without using automated scripts.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Manual Docker Setup](#manual-docker-setup)
- [Manual Local Setup](#manual-local-setup)
- [Manual Configuration](#manual-configuration)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

### For Docker Setup:

- Docker Engine 20.10+ or Docker Desktop
- Docker Compose V2
- 4GB+ available RAM
- Free ports: 3307, 5173, 8000, 8080

### For Local Setup:

- PHP 8.2+
- Composer 2.x
- Node.js 20+
- npm 10+
- MySQL 8.0+
- Git

---

## Manual Docker Setup

### Step 1: Verify Docker Installation

```bash
# Check Docker version
docker --version
# Should show: Docker version 20.10.x or higher

# Check Docker Compose
docker compose version
# Should show: Docker Compose version v2.x.x or higher

# Verify Docker is running
docker ps
# Should show a list of running containers (may be empty)
```

### Step 2: Navigate to Docker Directory

```bash
cd /path/to/Weather-App-Laravel-React/.tools/docker
```

### Step 3: Review Configuration

```bash
# View the docker-compose configuration
cat docker-compose.yml

# Optional: Test configuration syntax
docker compose config
```

### Step 4: Pull Docker Images (Optional)

This step pre-downloads images before building:

```bash
docker pull mysql:8.0
docker pull php:8.2-apache
docker pull node:20-alpine
docker pull phpmyadmin:latest
```

### Step 5: Build Custom Images

```bash
# Build all images
docker compose build

# Or build individually
docker compose build backend
docker compose build frontend
```

### Step 6: Create and Start Containers

```bash
# Start all services in detached mode
docker compose up -d

# View logs to monitor startup
docker compose logs -f
```

### Step 7: Wait for Services

The first start takes 3-5 minutes. Monitor progress:

```bash
# Check container status
docker compose ps

# Watch backend initialization
docker compose logs -f backend

# Wait for MySQL health check
docker compose exec mysql mysqladmin ping -h localhost -uroot -proot_password
```

### Step 8: Verify Installation

```bash
# Check if backend is responding
curl http://localhost:8000/api

# Check if frontend is running
curl http://localhost:5173

# Check MySQL connection
docker compose exec mysql mysql -uweather_user -pweather_password -e "SHOW DATABASES;"
```

### Step 9: Access the Application

Open in your browser:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000/api
- **PHPMyAdmin:** http://localhost:8080
  - Server: `mysql`
  - Username: `root`
  - Password: `root_password`

---

## Manual Local Setup

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd Weather-App-Laravel-React
```

### Step 2: Setup MySQL Database

#### Using MySQL CLI:

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE weather_app;

# Create user
CREATE USER 'weather_user'@'localhost' IDENTIFIED BY 'weather_password';

# Grant privileges
GRANT ALL PRIVILEGES ON weather_app.* TO 'weather_user'@'localhost';
FLUSH PRIVILEGES;

# Exit
EXIT;
```

#### Using phpMyAdmin:

1. Open phpMyAdmin in browser
2. Click "New" to create database
3. Name: `weather_app`
4. Collation: `utf8mb4_general_ci`
5. Click "Create"

### Step 3: Backend Setup (Laravel)

```bash
# Navigate to backend directory
cd backend

# Install Composer dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Edit .env file
nano .env
# Or use your preferred editor
```

**Configure .env:**

```env
APP_NAME="Weather App"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=weather_app
DB_USERNAME=weather_user
DB_PASSWORD=weather_password

OPENWEATHER_API_KEY=a0aca8a89948154a4182dcecc780b513
```

```bash
# Create storage symlink
php artisan storage:link

# Set permissions (Unix/Mac)
chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Or (Linux)
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Run migrations
php artisan migrate

# Run seeders
php artisan db:seed

# Or combine both
php artisan migrate:fresh --seed

# Start development server
php artisan serve
# Backend will run on http://127.0.0.1:8000
```

### Step 4: Frontend Setup (React)

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Clean npm cache (optional)
rm -rf node_modules package-lock.json
npm cache clean --force

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env
nano .env
```

**Configure .env:**

```env
VITE_API_URL=http://127.0.0.1:8000
VITE_APP_NAME=Weather App
```

```bash
# Start development server
npm run dev
# Frontend will run on http://localhost:5173
```

### Step 5: Verify Local Installation

1. **Test Backend:**
   - Visit: http://127.0.0.1:8000/api
   - Should see API response

2. **Test Frontend:**
   - Visit: http://localhost:5173
   - Should see Weather App interface

3. **Test Database:**
   ```bash
   cd backend
   php artisan tinker
   >>> \App\Models\User::count();
   # Should show number of users
   ```

---

## Manual Configuration

### Change Database Credentials

**For Docker:**

1. Edit `.tools/docker/docker-compose.yml`:

   ```yaml
   mysql:
     environment:
       MYSQL_DATABASE: your_db_name
       MYSQL_ROOT_PASSWORD: your_root_password
       MYSQL_USER: your_username
       MYSQL_PASSWORD: your_password

   backend:
     environment:
       - DB_DATABASE=your_db_name
       - DB_USERNAME=your_username
       - DB_PASSWORD=your_password
   ```

2. Restart containers:
   ```bash
   docker compose down -v
   docker compose up -d
   ```

**For Local:**

1. Edit `backend/.env`
2. Update database credentials
3. Restart Laravel server

### Change Ports

**For Docker:**
Edit `.tools/docker/docker-compose.yml`:

```yaml
services:
  backend:
    ports:
      - "8001:80" # Change 8000 to 8001

  frontend:
    ports:
      - "3000:5173" # Change 5173 to 3000

  mysql:
    ports:
      - "3308:3306" # Change 3307 to 3308
```

Then restart:

```bash
docker compose down
docker compose up -d
```

**For Local:**

- Backend: `php artisan serve --port=8001`
- Frontend: Edit `vite.config.js` to change port

### Change OpenWeather API Key

**For Docker:**
Edit `.tools/docker/docker-compose.yml`:

```yaml
backend:
  environment:
    - OPENWEATHER_API_KEY=your_api_key_here
```

**For Local:**
Edit `backend/.env`:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

### Enable/Disable PHPMyAdmin (Docker only)

To disable PHPMyAdmin:

```bash
docker compose stop phpmyadmin
```

To remove completely, comment out in `docker-compose.yml`:

```yaml
# phpmyadmin:
#   image: phpmyadmin:latest
#   ...
```

---

## Troubleshooting

### Docker Issues

#### Containers won't start

```bash
# Check Docker is running
docker ps

# Check logs
docker compose logs

# Rebuild without cache
docker compose build --no-cache
docker compose up -d
```

#### Port already in use

```bash
# Find process using port (macOS/Linux)
lsof -ti:8000
lsof -ti:5173

# Kill process
lsof -ti:8000 | xargs kill -9

# Or change port in docker-compose.yml
```

#### Permission denied errors

```bash
# Fix script permissions
cd .tools/docker
chmod +x *.sh

# Fix file ownership
docker compose exec backend chown -R www-data:www-data /var/www/html/storage
docker compose exec backend chmod -R 775 /var/www/html/storage
```

#### MySQL won't start

```bash
# Check logs
docker compose logs mysql

# Remove volume and recreate
docker compose down -v
docker compose up -d
```

#### Backend shows 500 error

```bash
# Check logs
docker compose logs backend

# Clear cache
docker compose exec backend php artisan cache:clear
docker compose exec backend php artisan config:clear

# Check .env file exists
docker compose exec backend cat .env

# Regenerate key
docker compose exec backend php artisan key:generate
```

### Local Installation Issues

#### Composer install fails

```bash
# Update Composer
composer self-update

# Clear Composer cache
composer clear-cache

# Install with verbose output
composer install -vvv
```

#### npm install fails

```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Try again
npm install
```

#### Migration fails

```bash
# Check database connection
php artisan tinker
>>> DB::connection()->getPdo();

# Check migrations table exists
php artisan migrate:status

# Rollback and try again
php artisan migrate:rollback
php artisan migrate
```

#### Storage link fails

```bash
# Remove existing link
rm public/storage

# Create link again
php artisan storage:link

# Or create manually (Unix/Mac)
ln -s ../storage/app/public public/storage
```

#### Frontend can't connect to backend

1. Check backend is running: `curl http://127.0.0.1:8000/api`
2. Check `frontend/.env` has correct `VITE_API_URL`
3. Check CORS settings in `backend/config/cors.php`
4. Restart both servers

#### Permission denied (Unix/Mac)

```bash
# Fix storage permissions
cd backend
sudo chown -R $USER:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# Or for development only
sudo chmod -R 777 storage bootstrap/cache
```

---

## Advanced Manual Setup

### Using nginx instead of Apache (Docker)

1. Create `Dockerfile.backend.nginx`:

```dockerfile
FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy application
COPY . /var/www/html

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
RUN composer install

EXPOSE 80
CMD service nginx start && php-fpm
```

### Setting up Redis (Docker)

Add to `docker-compose.yml`:

```yaml
redis:
  image: redis:7-alpine
  container_name: weather-app-redis
  ports:
    - "6379:6379"
  networks:
    - weather-app-network
```

Update backend service:

```yaml
backend:
  environment:
    - REDIS_HOST=redis
    - REDIS_PORT=6379
    - CACHE_DRIVER=redis
    - SESSION_DRIVER=redis
```

### Creating Custom Network

```bash
# Create network manually
docker network create weather-app-custom-network

# Use in docker-compose.yml
networks:
  weather-app-network:
    external: true
    name: weather-app-custom-network
```

---

## Manual Testing

### Test Backend API

```bash
# Test weather endpoint
curl "http://localhost:8000/api/weather?q=Warsaw"

# Test with authentication
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:8000/api/user

# Test login
curl -X POST http://localhost:8000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password"}'
```

### Test Database Connection

```bash
# Docker
docker compose exec backend php artisan tinker
>>> DB::connection()->getPdo();
>>> \App\Models\User::all();

# Local
cd backend
php artisan tinker
>>> DB::connection()->getPdo();
```

### Test Frontend Build

```bash
cd frontend

# Production build
npm run build

# Preview build
npm run preview

# Lint check
npm run lint
```

---

## Maintenance Commands

### Daily Operations

```bash
# View logs
docker compose logs -f

# Update dependencies
docker compose exec backend composer update
docker compose exec frontend npm update

# Clear all caches
docker compose exec backend php artisan optimize:clear

# Backup database
docker compose exec mysql mysqldump -uroot -proot_password weather_app > backup.sql
```

### Weekly Operations

```bash
# Check for updates
docker compose pull

# Rebuild images
docker compose build --pull

# Clean up unused resources
docker system prune
```

---

## Security Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Set `APP_ENV=production` and `APP_DEBUG=false`
- [ ] Use strong, unique `APP_KEY`
- [ ] Configure proper CORS settings
- [ ] Set up HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up automated backups
- [ ] Enable Laravel rate limiting
- [ ] Review file permissions
- [ ] Use environment variables for secrets
- [ ] Enable Laravel's maintenance mode during updates

---

## Getting Help

If you encounter issues not covered here:

1. Check logs: `docker compose logs -f`
2. Review [README.md](README.md) and [QUICKSTART.md](QUICKSTART.md)
3. See [EXAMPLES.md](EXAMPLES.md) for common commands
4. Check Docker and Laravel documentation
5. Visit project repository for issue tracking

---

**Last Updated:** February 13, 2026  
**Version:** 1.0.0
