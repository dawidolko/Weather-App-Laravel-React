# 📦 Docker Setup - Podsumowanie Zmian

## ✅ Co zostało zrobione?

### 1. Struktura katalogów Docker

Utworzono katalog `.tools/docker/` z kompletną konfiguracją:

```
.tools/docker/
├── docker-compose.yml                    # Główna konfiguracja
├── Dockerfile.backend                    # Obraz dla Laravel
├── Dockerfile.frontend                   # Obraz dla React
├── backend-entrypoint.sh                 # Skrypt inicjalizacyjny backendu
├── init-db.sh                           # Skrypt inicjalizacyjny bazy
├── start.sh / start.bat                 # Skrypty startowe
├── stop.sh / stop.bat                   # Skrypty zatrzymania
├── Makefile                             # Pomocnicze komendy (Unix)
├── .env.example                         # Przykładowa konfiguracja
├── .gitignore                           # Ignorowane pliki
├── docker-compose.override.yml.example  # Przykład customizacji
├── README.md                            # Pełna dokumentacja
└── QUICKSTART.md                        # Szybki start
```

### 2. Kontenery Docker

Aplikacja składa się z 4 serwisów:

- **MySQL 8.0** (port 3307)
  - Automatyczne tworzenie bazy danych `weather_app`
  - Health check dla pewności gotowości
  - Persistent volume dla danych

- **Backend - Laravel** (port 8000)
  - PHP 8.2 + Apache
  - Automatyczna instalacja Composer dependencies
  - Automatyczne migracje i seedery
  - Storage link
  - Generowanie klucza aplikacji

- **Frontend - React + Vite** (port 5173)
  - Node 20 Alpine
  - Hot reload
  - Automatyczna instalacja npm dependencies
  - Serwer deweloperski

- **PHPMyAdmin** (port 8080)
  - Panel zarządzania bazą danych
  - Automatyczne połączenie z MySQL

### 3. Automatyzacja

Wszystko działa automatycznie przy pierwszym uruchomieniu:

✅ Tworzenie bazy danych  
✅ Kopiowanie .env.example → .env  
✅ Instalacja zależności (composer + npm)  
✅ Generowanie klucza Laravel  
✅ Tworzenie storage link  
✅ Uruchamianie migracji  
✅ Uruchamianie seederów  
✅ Ustawianie uprawnień

### 4. Woluminy (Persistent Storage)

Dane przetrwają restart kontenerów:

- `mysql_data` - Baza danych
- `backend_vendor` - Pakiety Composer
- `backend_storage` - Storage Laravel (zdjęcia)
- `frontend_node_modules` - Pakiety npm

### 5. Konfiguracja API dla Docker

Zaktualizowano frontend do używania zmiennych środowiskowych:

**Nowy plik:** `frontend/src/config/api.js`

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
```

**Zaktualizowane pliki:**

- `frontend/src/Context/AuthContext.jsx`
- `frontend/src/pages/Auth/CityHistory.jsx`
- `frontend/src/components/Product/ProductSearch.jsx`
- `frontend/src/components/Product/ProductChart.jsx`
- `frontend/src/components/Product/ProductForecast.jsx`

**Nowy plik env:** `frontend/.env.example`

```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Weather App
```

### 6. Pliki .dockerignore

Dodano dla obu części aplikacji:

- `backend/.dockerignore` - Wyklucza node_modules, vendor, .env, logi
- `frontend/.dockerignore` - Wyklucza node_modules, dist, .env, logi

### 7. Dokumentacja

Utworzono kompleksową dokumentację:

- **`.tools/docker/README.md`** - Pełna dokumentacja (120+ linii)
  - Instalacja i konfiguracja
  - Wszystkie dostępne komendy
  - Troubleshooting
  - Zarządzanie woluminami
  - Notatki deweloperskie

- **`.tools/docker/QUICKSTART.md`** - Szybki start
  - 3 kroki do uruchomienia
  - Podstawowe komendy
  - Częste problemy

- **`README-DOCKER.md`** - Główny README z Docker
  - Przegląd całego projektu
  - Porównanie Docker vs lokalna instalacja
  - Struktura projektu
  - Konfiguracja API

### 8. Narzędzia pomocnicze

**Makefile** (Unix/macOS):

```bash
make up          # Uruchom
make down        # Zatrzymaj
make logs        # Logi
make fresh       # Zresetuj bazę
make backup      # Backup bazy
make help        # Wszystkie komendy
```

**Skrypty shell:**

- `start.sh` / `start.bat` - Inteligentne uruchamianie z checkpoints
- `stop.sh` / `stop.bat` - Zatrzymywanie

---

## 🚀 Jak używać?

### Pierwsze uruchomienie:

```bash
cd .tools/docker
./start.sh          # macOS/Linux
start.bat           # Windows
```

Poczekaj 3-5 minut (pierwsze uruchomienie).

### Dostęp do aplikacji:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api
- PHPMyAdmin: http://localhost:8080
  - User: `root`
  - Password: `root_password`

### Zatrzymanie:

```bash
./stop.sh           # macOS/Linux
stop.bat            # Windows
```

---

## 🔧 Konfiguracja

### Zmiana portów:

Edytuj `docker-compose.yml` sekcję `ports`

### Zmiana hasła do bazy:

Edytuj `docker-compose.yml` sekcję `environment` dla MySQL

### Zmiana klucza API OpenWeather:

Edytuj `docker-compose.yml` sekcję `environment` dla backendu

### Lokalne customizacje:

```bash
cp docker-compose.override.yml.example docker-compose.override.yml
# Edytuj docker-compose.override.yml
```

---

## 🐛 Rozwiązywanie problemów

### Backend nie startuje:

```bash
docker compose logs backend
docker compose restart backend
```

### Port zajęty:

```bash
lsof -ti:8000 | xargs kill -9
```

### Zresetuj wszystko:

```bash
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

---

## 📝 Ważne uwagi

### ⚠️ Środowisko deweloperskie

Ta konfiguracja jest przygotowana dla **developmentu**, NIE dla produkcji!

Dla produkcji trzeba:

- Zmienić hasła
- Wyłączyć debug mode
- Skonfigurować HTTPS
- Użyć production build frontendu
- Skonfigurować backupy

### 🔐 Bezpieczeństwo

- Pliki `.env` są ignorowane przez git
- Hasła w `docker-compose.yml` są dla developmentu
- Dla produkcji użyj Docker secrets lub zmiennych środowiskowych

### 💾 Dane

- Dane w woluminach są persistent (przetrwają restart)
- `docker compose down` NIE usuwa danych
- `docker compose down -v` USUWA WSZYSTKIE DANE

---

## 🎯 Co dalej?

### Rozszerzenie:

- Dodaj Redis dla cache
- Dodaj Nginx jako reverse proxy
- Dodaj certyfikaty SSL
- Dodaj monitoring (Prometheus, Grafana)

### CI/CD:

- Dodaj GitHub Actions
- Automatyczne testy
- Automatyczny deploy

### Produkcja:

- Użyj docker-compose.prod.yml
- Multi-stage builds dla mniejszych obrazów
- Health checks dla wszystkich serwisów

---

## ✨ Podsumowanie

Wszystko jest gotowe do użycia! 🎉

**Jednym poleceniem uruchamiasz:**

- Backend API (Laravel)
- Frontend (React)
- Bazę danych (MySQL)
- Panel admin bazy (PHPMyAdmin)

**Automatycznie:**

- Instalują się wszystkie zależności
- Tworzą się tabele w bazie
- Dodają się przykładowe dane
- Konfiguruje się storage

**Bez konieczności:**

- Instalowania PHP, Composer, MySQL lokalnie
- Manualnej konfiguracji
- Rozwiązywania konfliktów portów/wersji

---

**Autor:** Weather App Docker Setup  
**Data:** 2026-02-13  
**Wersja:** 1.0.0
