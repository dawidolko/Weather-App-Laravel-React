<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weather_data', function (Blueprint $table) {
            $table->id();

            $table->foreignId('city_id')
                  ->constrained('cities')
                  ->onDelete('cascade');

            $table->timestamp('forecast_time')->nullable();

            $table->float('temperature')->nullable();
            $table->float('feels_like')->nullable();
            $table->integer('pressure')->nullable();
            $table->integer('humidity')->nullable();
            $table->integer('clouds')->nullable(); 
            $table->float('wind_speed')->nullable();
            $table->float('wind_deg')->nullable();
            $table->integer('visibility')->nullable(); 
            $table->float('rain')->nullable();
            $table->float('snow')->nullable();
            $table->string('weather_main', 50)->nullable();
            $table->string('weather_description', 100)->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('weather_data');
    }
};
