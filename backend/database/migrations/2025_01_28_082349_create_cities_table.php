<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('openweather_city_id')->unique();
            
            $table->string('name', 100);
            $table->string('state', 100)->nullable();  
            $table->string('country_code', 10)->nullable();
            $table->double('lat', 10, 6)->nullable();  
            $table->double('lon', 10, 6)->nullable(); 
            $table->integer('timezone')->nullable();  
            $table->integer('population')->nullable(); 

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cities');
    }
};
