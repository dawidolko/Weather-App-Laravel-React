<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'openweather_city_id', 
        'name', 
        'state',
        'country_code', 
        'lat', 
        'lon', 
        'timezone', 
        'population'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_cities')->withTimestamps();
    }

    public function weatherData()
    {
        return $this->hasMany(WeatherData::class);
    }

    public function latestWeather()
    {
        return $this->hasOne(WeatherData::class)->latest();
    }
}
