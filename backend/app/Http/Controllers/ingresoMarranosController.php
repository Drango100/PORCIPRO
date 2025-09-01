<?php

namespace App\Http\Controllers;
use App\Models\ingreso_marranos;
use Illuminate\Http\Request;

class ingresoMarranosController extends Controller
{
    
// funcion para crear un resgistro
     public function obtenerIngresos()
    {
        return response()->json(ingreso_marranos::all());
    }

    public function nuevoIngreso(Request $request)
    {
        $request->validate([
            'chapeta' => 'required|max:10',
            'nombre' => 'required|max:50',
            'peso_marrano' => 'required|max:10',
            'raza' => 'required|max:30',
        ]);

        $ingreso = ingreso_marranos ::create($request->all());
        return response()->json($ingreso, 201);
    }

    public function actualizacionIngreso(Request $request, $id)
    {
        $ingreso = ingreso_marranos::findOrFail($id);
        $ingreso->update($request->all());
        return response()->json($ingreso);
    }

    public function borrarIngreso($id)
    {
        $ingreso = ingreso_marranos::findOrFail($id);
        $ingreso->delete();
        return response()->json(['mensaje' => 'Ingreso eliminado']);
    }
}
