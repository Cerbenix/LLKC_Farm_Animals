<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum', 'auth.farmowner'])
    ->resource('farms', \App\Http\Controllers\FarmController::class);

Route::middleware('auth:sanctum')
    ->get('animals', [\App\Http\Controllers\AnimalController::class, 'index']);
Route::middleware(['auth:sanctum', 'auth.farmowner'])
    ->get('farms/{farm}/animals', [\App\Http\Controllers\AnimalController::class, 'show']);
Route::middleware(['auth:sanctum', 'auth.farmowner'])
    ->post('farms/{farm}/animals', [\App\Http\Controllers\AnimalController::class, 'store']);
Route::middleware(['auth:sanctum', 'auth.animalowner'])
    ->put('animals/{animal_id}', [\App\Http\Controllers\AnimalController::class, 'update']);
Route::middleware(['auth:sanctum', 'auth.animalowner'])
    ->delete('animals/{animal_id}', [\App\Http\Controllers\AnimalController::class, 'destroy']);
