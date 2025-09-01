<?php

namespace App\Http\Controllers;

use App\Models\Aves;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class IngresoAvesController extends Controller
{
    // GET /aves - Listar todas las aves
    public function index()
    {
        return response()->json(Aves::with('camada')->get(), 200);
    }

    // GET /aves/{id} - Mostrar una ave específica
    public function show($id)
    {
        $ave = Aves::with('camada')->findOrFail($id);
        return response()->json($ave);
    }

    // POST /aves - Registrar una nueva ave
    public function store(Request $request)
    {
        $request->validate([
            'camada_id' => 'required|exists:camadas,id',
            'identificacion' => 'required|unique:aves',
            'sexo' => 'required|in:M,F',
            'raza' => 'nullable|string|max:50',
            'fecha_nacimiento' => 'required|date',
            'marcaje' => 'nullable|string|max:100',
            'observaciones' => 'nullable|string',
        ]);

        $fecha = Carbon::parse($request->fecha_nacimiento);

        $ave = Aves::create([
            'camada_id' => $request->camada_id,
            'identificacion' => $request->identificacion,
            'sexo' => $request->sexo,
            'raza' => $request->raza,
            'fecha_nacimiento' => $fecha,
            'marcaje' => $request->marcaje,
            'observaciones' => $request->observaciones,
            'etapa_actual' => 'encerrado',
            'fecha_estimado_potrero' => $fecha->copy()->addDays(30),
            'fecha_estimado_jaula' => $fecha->copy()->addDays(120),
            'fecha_estimado_entreno' => $fecha->copy()->addDays(210),
        ]);

        return response()->json([
            'mensaje' => 'Ave registrada correctamente',
            'data' => $ave
        ], 201);
    }

    // PUT /aves/{id} - Actualizar datos de una ave
    public function update(Request $request, $id)
    {
        $ave = Aves::findOrFail($id);

        $request->validate([
            'sexo' => 'nullable|in:M,F',
            'raza' => 'nullable|string|max:50',
            'fecha_nacimiento' => 'nullable|date',
            'marcaje' => 'nullable|string|max:100',
            'observaciones' => 'nullable|string',
            'etapa_actual' => 'nullable|in:encerrado,potrero,jaula,entreno',
        ]);

        $ave->update($request->all());

        return response()->json([
            'mensaje' => 'Ave actualizada correctamente',
            'data' => $ave
        ]);
    }

    // DELETE /aves/{id} - Eliminar una ave
    public function destroy($id)
    {
        $ave = Aves::findOrFail($id);
        $ave->delete();

        return response()->json(['mensaje' => 'Ave eliminada']);
    }
}
