.PHONY: help up down restart logs ps build clean migrate seed fresh install backend frontend db

# Output colors
GREEN  := \033[0;32m
YELLOW := \033[0;33m
RED    := \033[0;31m
NC     := \033[0m # No Color

help: # Show help
	@echo "$(GREEN)Weather App - Docker Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Available commands:$(NC)"
	@awk 'BEGIN {FS = ":.*##"; printf ""} /^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2 }' $(MAKEFILE_LIST)
	@echo ""

up: # Start all containers
	@echo "$(GREEN)Starting all containers...$(NC)"
	docker compose up -d
	@echo "$(GREEN)Done! Check status with 'make ps'$(NC)"

down: # Stop all containers
	@echo "$(YELLOW)Stopping all containers...$(NC)"
	docker compose down
	@echo "$(GREEN)Done!$(NC)"

restart: # Restart all containers
	@echo "$(YELLOW)Restarting all containers...$(NC)"
	docker compose restart
	@echo "$(GREEN)Done!$(NC)"

logs: # Show logs of all containers
	docker compose logs -f

ps: # Show container status
	docker compose ps

build: # Rebuild all images
	@echo "$(YELLOW)Building all images...$(NC)"
	docker compose build --no-cache
	@echo "$(GREEN)Done!$(NC)"

clean: # Remove all containers and volumes (WARNING: deletes data!)
	@echo "$(RED)WARNING: This will delete all data including database!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo ""; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose down -v; \
		echo "$(GREEN)Cleaned!$(NC)"; \
	else \
		echo "$(YELLOW)Cancelled$(NC)"; \
	fi

migrate: # Run the database migrations
	@echo "$(YELLOW)Running migrations...$(NC)"
	docker compose exec backend php artisan migrate
	@echo "$(GREEN)Done!$(NC)"

seed: # Run the seeders
	@echo "$(YELLOW)Running seeders...$(NC)"
	docker compose exec backend php artisan db:seed
	@echo "$(GREEN)Done!$(NC)"

fresh: # Reset the database (migrate:fresh + seed)
	@echo "$(RED)WARNING: This will delete all data from database!$(NC)"
	@read -p "Are you sure? [y/N] " -n 1 -r; \
	echo ""; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose exec backend php artisan migrate:fresh --seed; \
		echo "$(GREEN)Done!$(NC)"; \
	else \
		echo "$(YELLOW)Cancelled$(NC)"; \
	fi

install: # Install dependencies (composer + npm)
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	docker compose exec backend composer install
	docker compose exec frontend npm install
	@echo "$(GREEN)Done!$(NC)"

backend: # Enter the backend container
	docker compose exec backend bash

frontend: # Enter the frontend container
	docker compose exec frontend sh

db: # Connect to MySQL
	docker compose exec mysql mysql -uweather_user -pweather_password weather_app

test: # Run the backend tests
	@echo "$(YELLOW)Running tests...$(NC)"
	docker compose exec backend php artisan test

cache-clear: # Clear the Laravel cache
	@echo "$(YELLOW)Clearing cache...$(NC)"
	docker compose exec backend php artisan cache:clear
	docker compose exec backend php artisan config:clear
	docker compose exec backend php artisan route:clear
	docker compose exec backend php artisan view:clear
	@echo "$(GREEN)Done!$(NC)"

backup: # Back up the database
	@echo "$(YELLOW)Creating database backup...$(NC)"
	@mkdir -p backups
	docker compose exec mysql mysqldump -uroot -proot_password weather_app > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)Backup created in backups/ directory$(NC)"

restore: # Restore the database from the latest backup
	@echo "$(YELLOW)Restoring database from latest backup...$(NC)"
	@LATEST=$$(ls -t backups/*.sql 2>/dev/null | head -1); \
	if [ -z "$$LATEST" ]; then \
		echo "$(RED)No backup files found!$(NC)"; \
		exit 1; \
	fi; \
	echo "Restoring from: $$LATEST"; \
	docker compose exec -T mysql mysql -uroot -proot_password weather_app < $$LATEST; \
	echo "$(GREEN)Done!$(NC)"

status: # Full application status
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
