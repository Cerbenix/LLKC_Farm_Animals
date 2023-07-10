<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware('auth:sanctum')->resource('farms', \App\Http\Controllers\FarmController::class);

Route::middleware('auth:sanctum')->get('animals', [\App\Http\Controllers\AnimalController::class, 'index']);
Route::middleware('auth:sanctum')->get('farms/{farm_id}/animals', [\App\Http\Controllers\AnimalController::class, 'show']);
Route::middleware('auth:sanctum')->post('farms/{farm_id}/animals', [\App\Http\Controllers\AnimalController::class, 'store']);
Route::middleware('auth:sanctum')->put('animals/{animal_id}', [\App\Http\Controllers\AnimalController::class, 'update']);
Route::middleware('auth:sanctum')->get('farms/{farm}/animals', [\App\Http\Controllers\AnimalController::class, 'show']);
Route::middleware('auth:sanctum')->delete('animals/{animal}', [\App\Http\Controllers\AnimalController::class, 'destroy']);
