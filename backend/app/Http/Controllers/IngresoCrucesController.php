<?php

namespace App\Http\Controllers;

use App\Models\cruzamientos;
use Illuminate\Http\Request;
use Carbon\Carbon;

class IngresoCrucesController extends Controller
{
    // Obtener todos los cruzamientos
    public function obtenerCruces()
    {
        return response()->json(cruzamientos::with(['gallo', 'gallina'])->get(), 200);
    }

    // Registrar un nuevo cruzamiento
    public function nuevoCruce(Request $request)
    {
        $request->validate([
            'gallo_id' => 'required|exists:gallos,id',
            'gallina_id' => 'required|exists:gallinas,id',
            'fecha_cruza' => 'required|date',
            'observaciones' => 'nullable|string|max:255',
        ]);

        $fechaCruza = Carbon::parse($request->fecha_cruza);
        $fechaEclosion = $fechaCruza->copy()->addDays(21);

        $cruce = cruzamientos::create([
            'gallo_id' => $request->gallo_id,
            'gallina_id' => $request->gallina_id,
            'fecha_cruza' => $request->fecha_cruza,
            'fecha_estimacion_eclosion' => $fechaEclosion,
            'observaciones' => $request->observaciones,
        ]);

        return response()->json(['mensaje' => 'Cruce registrado correctamente', 'data' => $cruce], 201);
    }

    // Actualizar un cruzamiento
    public function actualizarCruce(Request $request, $id)
    {
        $cruce = cruzamientos::findOrFail($id);

        $cruce->update($request->only(['gallo_id', 'gallina_id', 'fecha_cruza', 'observaciones']));

        // Si se cambia la fecha de cruza, se recalcula la fecha de eclosión
        if ($request->filled('fecha_cruza')) {
            $cruce->fecha_estimacion_eclosion = Carbon::parse($request->fecha_cruza)->addDays(21);
            $cruce->save();
        }

        return response()->json(['mensaje' => 'Cruce actualizado', 'data' => $cruce]);
    }

    // Eliminar un cruce
    public function eliminarCruce($id)
    {
        $cruce = cruzamientos::findOrFail($id);
        $cruce->delete();

        return response()->json(['mensaje' => 'Cruce eliminado']);
    }
}
