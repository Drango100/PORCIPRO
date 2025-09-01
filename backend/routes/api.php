<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ingresoMarranaController;

Route::controller(ingresoMarranaController::class)->group(function () {
    Route::get('/getIngresosMarrana', 'obtenerIngresos');
    Route::post('/newIngresoMarrana', 'nuevoIngreso');
    Route::put('/updateIngresoMarrana/{id}', 'actualizacionIngreso');
    Route::delete( '/borrarIngresoMarrana/{id}','borrarIngreso');
});
