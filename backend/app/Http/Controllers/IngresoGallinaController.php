<?php

namespace App\Http\Controllers;

use App\Models\gallinas_reproductoras;
use Illuminate\Http\Request;

class IngresoGallinaController extends Controller
{
    

//Funcion de consulta de los registros
public function obtenerIngresoGallina()
    {
        return response()->json(gallinas_reproductoras::all());
    }
// funcion para crear un resgistro
    public function nuevoIngresoGallina(Request $request)
    {
        $request->validate([
            'identificacion' => 'unique:gallinas_reproductoras|max:50',
            'nombre' => 'nullable|max:50',
            'fecha_nacimiento' => 'nullable|max:50',
            'edad_meses' => 'nullable|max:50',
            'raza' => 'nullable|max:50',
            'color' => 'nullable|max:50',
            'caracteristicas' => 'nullable|max:50',
            'criadero_origen' => 'nullable|max:50',
            'activo' => 'boolean|default(true)', // si sigue siendo padrote
        ]);

        $ingreso = gallinas_reproductoras::create($request->all());
        return response()->json($ingreso, 201);
    }

    public function ActualizacionInformacionGallina(Request $request, $id)
    {
        $ingreso = gallinas_reproductoras::findOrFail($id);
        $ingreso->update($request->all());
        return response()->json($ingreso);
    }

    public function BorrarRegistroGallina($id)
    {
        $ingreso = gallinas_reproductoras::findOrFail($id);
        $ingreso->delete();
        return response()->json(['mensaje' => 'Registro de gallina eliminado']);
    }
}
