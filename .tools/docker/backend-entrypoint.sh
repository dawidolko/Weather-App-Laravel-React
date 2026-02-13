#!/bin/bash
set -e

echo "================================="
echo "Starting Laravel Backend Setup"
echo "================================="

# Wait for MySQL to be ready
echo "Waiting for MySQL to be ready..."
for i in {1..30}; do
    if mysqladmin ping -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" --silent --skip-ssl 2>/dev/null; then
        echo "MySQL is ready!"
        break
    fi
    echo "Waiting for MySQL... ($i/30)"
    sleep 2
done

# Copy .env.example to .env if .env doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    
    # Update database credentials in .env
    sed -i "s/DB_HOST=.*/DB_HOST=${DB_HOST}/" .env
    sed -i "s/DB_DATABASE=.*/DB_DATABASE=${DB_DATABASE}/" .env
    sed -i "s/DB_USERNAME=.*/DB_USERNAME=${DB_USERNAME}/" .env
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=${DB_PASSWORD}/" .env
fi

# Install Composer dependencies if vendor doesn't exist or is empty
if [ ! -f "vendor/autoload.php" ]; then
    echo "Installing Composer dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Generate application key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo "Generating application key..."
    php artisan key:generate
fi

# Create storage link if it doesn't exist
if [ ! -L public/storage ]; then
    echo "Creating storage link..."
    php artisan storage:link
fi

# Set proper permissions
echo "Setting permissions..."
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache

# Run migrations and seeders
echo "Running migrations and seeders..."
php artisan migrate:fresh --seed --force

echo "================================="
echo "Backend setup completed!"
echo "================================="

# Start Apache
exec apache2-foreground
