%systemDrive%\xampp\mysql\bin\mysql -uroot -e "CREATE DATABASE IF NOT EXISTS weather_app;"

if %errorlevel% neq 0 msg %username% "Failed to create database." && exit /b %errorlevel%

php -r "copy('.env.example', '.env');"

call composer install

@REM call composer update

call php artisan key:generate

call composer require laravel/sanctum

call php artisan storage:link

@REM call php artisan migrate

@REM call php artisan db:seed

call php artisan migrate:fresh --seed

call php artisan serve

start http://127.0.0.1:8000

code .
