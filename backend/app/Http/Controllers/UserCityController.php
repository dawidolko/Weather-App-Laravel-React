<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\City;
use App\Models\WeatherData;
use Illuminate\Support\Facades\Http;

class UserCityController extends Controller
{
    public function addCity(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'city_id' => 'required|integer',
        ]);

        $city = City::where('openweather_city_id', $validated['city_id'])->first();

        if (!$city) {
            $apiKey = env('OPENWEATHER_API_KEY');
            $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
                'id'    => $validated['city_id'],
                'units' => 'metric',
                'appid' => $apiKey,
            ]);
            
            if (!$response->ok()) {
                return response()->json(['message' => 'City not found in OpenWeather API'], 404);
            }
            
            $data = $response->json();
            $city = City::create([
                'openweather_city_id' => $data['id'],
                'name'         => $data['name'],
                'state'        => $data['state'] ?? null,
                'country_code' => $data['sys']['country'] ?? null,
                'lat'          => $data['coord']['lat'],
                'lon'          => $data['coord']['lon'],
                'timezone'     => $data['timezone'] ?? null,
                'population'   => $data['population'] ?? null,
            ]);
            
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
        }

        if ($user->cities()->where('city_id', $city->id)->exists()) {
            return response()->json(['message' => 'City already added.'], 200);
        }

        // Limit 10 miast
        if ($user->cities()->count() >= 10) {
            return response()->json(['message' => 'Max 10 cities allowed'], 400);
        }

        $user->cities()->attach($city->id);

        $this->fetchWeatherData($city->id);

        return response()->json(['message' => 'City added successfully']);
    }

    private function fetchWeatherData($city_id)
    {
        $city = City::find($city_id);
        if (!$city) {
            return;
        }

        $apiKey = env('OPENWEATHER_API_KEY');
        $response = Http::get("https://api.openweathermap.org/data/2.5/weather", [
            'lat'   => $city->lat,
            'lon'   => $city->lon,
            'units' => 'metric',
            'appid' => $apiKey,
        ]);

        if ($response->ok()) {
            $data = $response->json();
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
        }
    }

    public function removeCity(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'city_id' => 'required|integer',
        ]);

        $city = City::where('openweather_city_id', $validated['city_id'])->first();
        if (!$city) {
            return response()->json(['message' => 'City not found'], 404);
        }

        $user->cities()->detach($city->id);
        return response()->json(['message' => 'City removed successfully']);
    }

    public function getUserCities(Request $request)
    {
        $user = $request->user();
        return response()->json($user->cities);
    }

    public function updateWeatherData(Request $request)
    {
        $user = $request->user();
        foreach ($user->cities as $city) {
            $this->fetchWeatherData($city->id);
        }
        return response()->json(['message' => 'Weather data updated']);
    }

    public function getCityHistory(Request $request, $cityId)
    {
        try {
            $cityId = (int)$cityId;
            $user = $request->user();

            $cityPivot = $user->cities()->where('cities.id', $cityId)->first();
            if (!$cityPivot) {
                return response()->json(['message' => 'City not found or not authorized'], 404);
            }
            $addedAt = $cityPivot->pivot->created_at;
            
            $history = WeatherData::where('city_id', $cityId)
                        ->where('forecast_time', '>=', $addedAt)
                        ->orderBy('forecast_time', 'asc')
                        ->get();
            return response()->json($history);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Internal server error'], 500);
        }
    }
}
