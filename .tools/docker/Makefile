.PHONY: help up down restart logs ps build clean migrate seed fresh install backend frontend db

# Kolory dla outputu
GREEN  := \033[0;32m
YELLOW := \033[0;33m
RED    := \033[0;31m
NC     := \033[0m # No Color

help: ## Pokaż pomoc
	@echo "$(GREEN)Weather App - Docker Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Dostępne komendy:$(NC)"
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""

up: ## Uruchom wszystkie kontenery
	@echo "$(GREEN)Starting all containers...$(NC)"
	docker compose up -d
	@echo "$(GREEN)Done! Check status with 'make ps'$(NC)"

down: ## Zatrzymaj wszystkie kontenery
	@echo "$(YELLOW)Stopping all containers...$(NC)"
	docker compose down
	@echo "$(GREEN)Done!$(NC)"

restart: ## Zrestartuj wszystkie kontenery
	@echo "$(YELLOW)Restarting all containers...$(NC)"
	docker compose restart
	@echo "$(GREEN)Done!$(NC)"

logs: ## Pokaż logi wszystkich kontenerów
	docker compose logs -f

ps: ## Pokaż status kontenerów
	docker compose ps

build: ## Przebuduj wszystkie obrazy
	@echo "$(YELLOW)Building all images...$(NC)"
	docker compose build --no-cache
	@echo "$(GREEN)Done!$(NC)"

clean: ## Usuń wszystkie kontenery i woluminy (UWAGA: usuwa dane!)
	@echo "$(RED)WARNING: This will delete all data including database!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo ""; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose down -v; \
		echo "$(GREEN)Cleaned!$(NC)"; \
	else \
		echo "$(YELLOW)Cancelled$(NC)"; \
	fi

migrate: ## Uruchom migracje bazy danych
	@echo "$(YELLOW)Running migrations...$(NC)"
	docker compose exec backend php artisan migrate
	@echo "$(GREEN)Done!$(NC)"

seed: ## Uruchom seedery
	@echo "$(YELLOW)Running seeders...$(NC)"
	docker compose exec backend php artisan db:seed
	@echo "$(GREEN)Done!$(NC)"

fresh: ## Zresetuj bazę (migrate:fresh + seed)
	@echo "$(RED)WARNING: This will delete all data from database!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo ""; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose exec backend php artisan migrate:fresh --seed; \
		echo "$(GREEN)Done!$(NC)"; \
	else \
		echo "$(YELLOW)Cancelled$(NC)"; \
	fi

install: ## Zainstaluj zależności (composer + npm)
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	docker compose exec backend composer install
	docker compose exec frontend npm install
	@echo "$(GREEN)Done!$(NC)"

backend: ## Wejdź do kontenera backendu
	docker compose exec backend bash

frontend: ## Wejdź do kontenera frontendu
	docker compose exec frontend sh

db: ## Połącz się z MySQL
	docker compose exec mysql mysql -uweather_user -pweather_password weather_app

test: ## Uruchom testy backendu
	@echo "$(YELLOW)Running tests...$(NC)"
	docker compose exec backend php artisan test

cache-clear: ## Wyczyść cache Laravel
	@echo "$(YELLOW)Clearing cache...$(NC)"
	docker compose exec backend php artisan cache:clear
	docker compose exec backend php artisan config:clear
	docker compose exec backend php artisan route:clear
	docker compose exec backend php artisan view:clear
	@echo "$(GREEN)Done!$(NC)"

backup: ## Backup bazy danych
	@echo "$(YELLOW)Creating database backup...$(NC)"
	@mkdir -p backups
	docker compose exec mysql mysqldump -uroot -proot_password weather_app > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Backup created in backups/ directory$(NC)"

restore: ## Restore bazy z ostatniego backupu
	@echo "$(YELLOW)Restoring database from latest backup...$(NC)"
	@LATEST=$$(ls -t backups/*.sql 2>/dev/null | head -1); \
	if [ -z "$$LATEST" ]; then \
		echo "$(RED)No backup files found!$(NC)"; \
		exit 1; \
	fi; \
	echo "Restoring from: $$LATEST"; \
	docker compose exec -T mysql mysql -uroot -proot_password weather_app < $$LATEST; \
	echo "$(GREEN)Done!$(NC)"

status: ## Pełny status aplikacji
	@echo "$(GREEN)=== Docker Containers ===$(NC)"
	@docker compose ps
	@echo ""
	@echo "$(GREEN)=== Docker Volumes ===$(NC)"
	@docker volume ls | grep weather
	@echo ""
	@echo "$(GREEN)=== Application URLs ===$(NC)"
	@echo "Frontend:    http://localhost:5173"
	@echo "Backend API: http://localhost:8000/api"
	@echo "PHPMyAdmin:  http://localhost:8080"
