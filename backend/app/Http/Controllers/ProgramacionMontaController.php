<?php

namespace App\Http\Controllers;
use App\Models\programacio_monta;
use Illuminate\Http\Request;

class ProgramacionMontaController extends Controller
{
    
// funcion para consultar los registros
     public function obtenerProgramacion()
    {
        return response()->json(programacio_monta::all());
    }
// funcion para ingresar un nuevo registro
    public function nuevaProgramacion(Request $request)
    {
        $request->validate([
            'fecha_programada' => 'required|date',
            'fecha_realizada' => 'nullable|date',
            'estado' => 'required|max:20',
            'chapeta_marrana' => 'required|max:4',
            'nombre_marrana' => 'required|max:20',
            'chapeta_marrano' => 'required|max:4',
            'nombre_marrano' => 'required|max:20',
            'estado_programacion' => 'required|max:20',
            'tipo_monta' => 'required|max:20',
            'observaciones' => 'nullable|max:250',
        ]);

        $programacion = programacio_monta::create($request->all());
        return response()->json($programacion, 201);
    }

    // funcion para actualizar un registro
    public function actualizacionProgramacion(Request $request, $id)
    {
        $programacion = programacio_monta::findOrFail($id);
        $programacion->update($request->all());
        return response()->json($programacion);
    }

    // funcion para eliminar un registro
    public function borrarProgramacion($id)
    {
        $programacion = programacio_monta::findOrFail($id);
        $programacion->delete();
        return response()->json(['mensaje' => 'Programación eliminada']);
    }
}
