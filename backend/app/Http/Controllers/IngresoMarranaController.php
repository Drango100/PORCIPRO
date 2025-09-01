<?php

namespace App\Http\Controllers;

use App\Models\IngresosMarrana;
use Illuminate\Http\Request;

class ingresoMarranaController extends Controller
{
    
// funcion para crear un resgistro
     public function obtenerIngresos()
    {
        return response()->json(IngresosMarrana::all());
    }

    public function nuevoIngreso(Request $request)
    {
        $request->validate([
            'chapeta' => 'required|max:10',
            'nombre' => 'required|max:50',
            'peso_marrana' => 'required|max:10',
            'raza' => 'required|max:30',
        ]);

        $ingreso = IngresosMarrana::create($request->all());
        return response()->json($ingreso, 201);
    }

    public function actualizacionIngreso(Request $request, $id)
    {
        $ingreso = IngresosMarrana::findOrFail($id);
        $ingreso->update($request->all());
        return response()->json($ingreso);
    }

    public function borrarIngreso($id)
    {
        $ingreso = IngresosMarrana::findOrFail($id);
        $ingreso->delete();
        return response()->json(['mensaje' => 'Ingreso eliminado']);
    }
}
