<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ingresoMarranaController;
use App\Http\Controllers\UserController;

Route::controller(ingresoMarranaController::class)->group(function () {
    Route::get('/getIngresosMarrana', 'obtenerIngresos');
    Route::post('/newIngresoMarrana', 'nuevoIngreso');
    Route::put('/updateIngresoMarrana/{id}', 'actualizacionIngreso');
    Route::delete( '/borrarIngresoMarrana/{id}','borrarIngreso');

Route::post('/auth/register', [UserController::class, 'register']);
Route::post('/auth/login', [UserController::class, 'login']);


});

