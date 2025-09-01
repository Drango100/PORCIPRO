<?php

namespace App\Http\Controllers;
use App\Models\registro_nacimientos;
use Illuminate\Http\Request;

class registro_nacimientosController extends Controller
{
    
// funcion para crear un resgistro
     public function obtenerIngresos()
    {
        return response()->json(registro_nacimientos::all());
    }

    public function nuevoIngreso(Request $request)
    {
        $request->validate([
            'id_camada' => 'required|max:10',
            'no_marranos' => 'required|max:10',
            'peso_aprox_marranos' => 'required|max:10',
            
        ]);

        $ingreso = registro_nacimientos ::create($request->all());
        return response()->json($ingreso, 201);
    }

    public function actualizacionIngreso(Request $request, $id)
    {
        $ingreso = registro_nacimientos::findOrFail($id);
        $ingreso->update($request->all());
        return response()->json($ingreso);
    }

    public function borrarIngreso($id)
    {
        $ingreso = registro_nacimientos::findOrFail($id);
        $ingreso->delete();
        return response()->json(['mensaje' => 'Ingreso eliminado']);
    }
}
