# 🌤️ Weather App - Laravel + React

Weather application using OpenWeather API, built with RESTful architecture featuring Laravel backend and React frontend.

## 📋 Table of Contents

- [Quick Start with Docker](#-quick-start-with-docker-recommended)
- [Local Installation](#-local-installation)
- [Features](#-features)
- [Requirements](#-requirements)
- [Documentation](#-documentation)

---

## 🐳 Quick Start with Docker (Recommended)

### Launch in 3 steps:

```bash
# 1. Navigate to docker directory
cd .tools/docker

# 2. Start the application
./start.sh          # macOS/Linux
start.bat           # Windows

# 3. Open in browser
# Frontend: http://localhost:5173
# Backend API: http://localhost:8000/api
# PHPMyAdmin: http://localhost:8080
```

**Done!** 🎉 Everything is configured automatically:

- ✅ MySQL Database
- ✅ Migrations and seeders
- ✅ Dependencies installation
- ✅ Storage for images
- ✅ Application key

### Stop:

```bash
./stop.sh           # macOS/Linux
stop.bat            # Windows
```

### More information:

- **Quick Start:** [.tools/docker/QUICKSTART.md](.tools/docker/QUICKSTART.md)
- **Full documentation:** [.tools/docker/README.md](.tools/docker/README.md)

---

## 💻 Local Installation

### Requirements:

- PHP 8.2+
- Composer
- Node.js 20+
- MySQL 8.0+
- XAMPP/LAMPP (optional)

### Backend (Laravel):

```bash
cd backend

# 1. Create 'weather_app' database in MySQL

# 2. Copy .env.example to .env
cp .env.example .env

# 3. Edit .env and set database credentials (DB_HOST, DB_USERNAME, DB_PASSWORD)

# 4. Install dependencies
composer install

# 5. Generate application key
php artisan key:generate

# 6. Create storage symlink
php artisan storage:link

# 7. Run migrations and seeders
php artisan migrate:fresh --seed

# 8. Start development server
php artisan serve
```

Backend will be available at: `http://127.0.0.1:8000`

### Frontend (React):

```bash
cd frontend

# 1. Copy .env.example to .env
cp .env.example .env

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

**Or use startup scripts:**

```bash
# Backend
cd backend
./start.sh          # macOS/Linux
start.bat           # Windows

# Frontend
cd frontend
./start.sh          # macOS/Linux
start.bat           # Windows
```

---

## ✨ Features

### 🔐 For logged-in users:

- Add cities to profile
- Search history for cities
- Detailed weather history for city
- Charts and visualizations

### 🌍 For everyone:

- Search weather for any city
- Current weather
- 5-day forecast
- Temperature chart (24h)
- Details: humidity, pressure, wind, visibility

---

## 🛠️ Requirements

### Docker (recommended):

- Docker Desktop or Docker Engine + Docker Compose
- 4GB free RAM
- Free ports: 3307, 5173, 8000, 8080

### Local installation:

- **PHP:** 8.2 or higher
- **Composer:** 2.x
- **Node.js:** 20.x or higher
- **npm:** 10.x or higher
- **MySQL:** 8.0 or higher
- **Laravel:** 11.x
- **React:** 18.x
- **Vite:** 5.x

---

## 📚 Documentation

### For Docker:

- [Quick Start Guide](.tools/docker/QUICKSTART.md) - Quick launch
- [Full Docker Documentation](.tools/docker/README.md) - All details, commands, troubleshooting

### Backend (Laravel):

- [Backend README](backend/README.md) - API documentation
- API Endpoints: `/api/weather`, `/api/user`, `/api/login`
- Framework: Laravel 11.x
- Database: MySQL with migrations
- Authentication: Laravel Sanctum

### Frontend (React):

- [Frontend README](frontend/README.md) - Application structure
- Framework: React 18.x + Vite
- Routing: React Router DOM
- Styling: SASS/SCSS
- Charts: Recharts
- Animations: Framer Motion

### Database:

- [Database README](database/README.md) - Database structure
- SQL dump: `database/weather_app.sql`
- City list: `database/city.list.min.json`

---

## 🗂️ Project Structure

```
Weather-App-Laravel-React/
├── .tools/
│   └── docker/              # Docker configuration (NEW!)
│       ├── docker-compose.yml
│       ├── Dockerfile.backend
│       ├── Dockerfile.frontend
│       ├── start.sh / start.bat
│       ├── stop.sh / stop.bat
│       ├── Makefile
│       ├── README.md
│       └── QUICKSTART.md
├── backend/                 # Laravel API
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── ...
├── frontend/                # React App
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── Context/
│   │   └── config/         # API configuration (NEW!)
│   └── ...
├── database/                # SQL dumps and migrations
└── docs/                    # Documentation
```

---

## 🚀 Useful Commands

### Docker:

```bash
# Start
cd .tools/docker && ./start.sh

# Stop
./stop.sh

# View logs
docker compose logs -f

# Status
docker compose ps

# Enter container
docker compose exec backend bash
docker compose exec frontend sh

# Makefile (macOS/Linux)
make up           # Start
make down         # Stop
make logs         # Logs
make fresh        # Reset database
make help         # All commands
```

### Backend:

```bash
# Migrations
php artisan migrate
php artisan migrate:fresh --seed

# Cache
php artisan cache:clear
php artisan config:clear

# Tests
php artisan test
```

### Frontend:

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview
```

---

## 🔑 OpenWeather API Configuration

The application uses OpenWeather API key. If you want to use your own:

1. Create account at [OpenWeatherMap.org](https://openweathermap.org/)
2. Generate free API key
3. **Docker:** Edit `OPENWEATHER_API_KEY` in [.tools/docker/docker-compose.yml](.tools/docker/docker-compose.yml)
4. **Local installation:** Edit `OPENWEATHER_API_KEY` in `backend/.env`

---

## 🐛 Troubleshooting

### Docker cannot start containers:

```bash
# Check if Docker Desktop is running
docker --version

# Check if ports are free
lsof -ti:8000 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Restart Docker Desktop
```

### Backend not working in Docker:

```bash
# View logs
docker compose logs backend

# Restart backend
docker compose restart backend

# Rebuild (if you changed Dockerfile)
docker compose build backend --no-cache
docker compose up -d backend
```

### Frontend not connecting to API:

1. Make sure backend is running: http://localhost:8000/api
2. Check `VITE_API_URL` in `frontend/.env`
3. For Docker should be: `VITE_API_URL=http://localhost:8000`
4. For local installation: `VITE_API_URL=http://127.0.0.1:8000`

### Database has no data:

```bash
# Docker
docker compose exec backend php artisan migrate:fresh --seed

# Local installation
cd backend && php artisan migrate:fresh --seed
```

---

## 📄 License

MIT License - See [LICENSE](LICENSE)

---

## 👨‍💻 Author

Weather App Team

---

## 🎯 Versions

- **v2.0.0** - Added Docker configuration (2026-02-13)
- **v1.0.0** - Initial version

---

**Enjoy Weather App!** ☀️🌧️⛈️❄️
