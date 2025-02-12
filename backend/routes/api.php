<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserCityController;
use App\Http\Controllers\WeatherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/user/update', [AuthController::class, 'updateUser'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/add-city', [UserCityController::class, 'addCity']);
    Route::post('/user/remove-city', [UserCityController::class, 'removeCity']);
    Route::get('/user/cities', [UserCityController::class, 'getUserCities']);
    Route::get('/user/update-weather', [UserCityController::class, 'updateWeatherData']);
    Route::get('/city-history/{cityId}', [UserCityController::class, 'getCityHistory']);
});

// Endpoint wyszukiwania aktualnej pogody
Route::get('/weather', [WeatherController::class, 'searchCity']);

// Nowy endpoint do pobierania prognozy pogodowej
Route::get('/weather/forecast', [WeatherController::class, 'forecast']);
