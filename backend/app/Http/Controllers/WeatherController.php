<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\City;
use App\Models\WeatherData;

class WeatherController extends Controller
{
    /**
     * Wyszukiwanie aktualnej pogody dla miasta.
     */
    public function searchCity(Request $request)
    {
        $cityName = $request->query('q');
        if (!$cityName) {
            return response()->json(['message' => 'Missing city query parameter'], 400);
        }
        
        $apiKey = env('OPENWEATHER_API_KEY');
        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'q'     => $cityName,
            'units' => 'metric',
            'appid' => $apiKey,
        ]);
        
        if (!$response->ok()) {
            return response()->json(['message' => 'City not found in OpenWeather API'], 404);
        }
        
        $data = $response->json();
        
        $city = City::updateOrCreate(
            ['openweather_city_id' => $data['id']],
            [
                'name'         => $data['name'],
                'state'        => $data['state'] ?? null,
                'country_code' => $data['sys']['country'] ?? null,
                'lat'          => $data['coord']['lat'],
                'lon'          => $data['coord']['lon'],
                'timezone'     => $data['timezone'] ?? null,
                'population'   => $data['population'] ?? null,
            ]
        );
        
        WeatherData::create([
            'city_id'             => $city->id,
            'forecast_time'       => now(),
            'temperature'         => $data['main']['temp'],
            'feels_like'          => $data['main']['feels_like'],
            'pressure'            => $data['main']['pressure'],
            'humidity'            => $data['main']['humidity'],
            'clouds'              => $data['clouds']['all'] ?? null,
            'wind_speed'          => $data['wind']['speed'],
            'wind_deg'            => $data['wind']['deg'],
            'visibility'          => $data['visibility'] ?? null,
            'rain'                => $data['rain']['1h'] ?? null,
            'snow'                => $data['snow']['1h'] ?? null,
            'weather_main'        => $data['weather'][0]['main'],
            'weather_description' => $data['weather'][0]['description'],
        ]);
        
        // Dodajemy do danych wysyłanych do frontendu city_db_id (ID w naszej bazie)
        $data['city_db_id'] = $city->id;
        
        return response()->json($data);
    }
    
    /**
     * Pobieranie prognozy pogodowej – endpoint wykorzystywany przez frontend.
     */
    public function forecast(Request $request)
    {
        $lat = $request->query('lat');
        $lon = $request->query('lon');
        if (!$lat || !$lon) {
            return response()->json(['message' => 'Missing lat or lon parameters'], 400);
        }
        
        $apiKey = env('OPENWEATHER_API_KEY');
        $response = Http::get("https://api.openweathermap.org/data/2.5/forecast", [
            'lat'   => $lat,
            'lon'   => $lon,
            'units' => 'metric',
            'appid' => $apiKey,
        ]);
        
        if (!$response->ok()) {
            return response()->json(['message' => 'Failed to fetch forecast'], $response->status());
        }
        
        return response()->json($response->json());
    }
}
