<?php

use Illuminate\Support\Facades\Route;

Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);
Route::post('/users/store', [App\Http\Controllers\UserController::class, 'store']);


