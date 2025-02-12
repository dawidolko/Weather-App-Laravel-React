<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeatherData extends Model
{
    use HasFactory;

    protected $fillable = [
        'city_id', 
        'forecast_time', 
        'temperature', 
        'feels_like', 
        'pressure', 
        'humidity', 
        'clouds', 
        'wind_speed', 
        'wind_deg', 
        'visibility',
        'rain',
        'snow',
        'weather_main', 
        'weather_description'
    ];

    public $timestamps = false;

    protected $casts = [
        'forecast_time' => 'datetime',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
