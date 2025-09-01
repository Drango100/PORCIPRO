<?php

namespace App\Http\Controllers;

use App\Models\gallos_reproductores;
use Illuminate\Http\Request;

class IngresoGalloController extends Controller
{
    

//Funcion de consulta de los registros
public function obtenerIngresoGallo()
    {
        return response()->json(gallos_reproductores::all());
    }
// funcion para crear un resgistro
    public function nuevoIngresoGallo(Request $request)
    {
        $request->validate([
            'identificacion' => 'unique:gallos_reproductores|max:50',
            'nombre' => 'nullable|max:50',
            'fecha_nacimiento' => 'nullable|max:50',
            'edad_meses' => 'nullable|max:50',
            'raza' => 'nullable|max:50',
            'color' => 'nullable|max:50',
            'caracteristicas' => 'nullable|max:50',
            'criadero_origen' => 'nullable|max:50',
            'activo' => 'boolean|default(true)', // si sigue siendo padrote
        ]);

        $ingreso = gallos_reproductores::create($request->all());
        return response()->json($ingreso, 201);
    }

    public function ActualizacionInformacionGallo(Request $request, $id)
    {
        $ingreso = gallos_reproductores::findOrFail($id);
        $ingreso->update($request->all());
        return response()->json($ingreso);
    }

    public function BorrarRegistroGallo($id)
    {
        $ingreso = gallos_reproductores::findOrFail($id);
        $ingreso->delete();
        return response()->json(['mensaje' => 'Registro de gallo eliminado']);
    }
}
