<?php

namespace App\Http\Controllers;

use App\Models\movimientos_etapas;
use App\Models\aves; 
use Illuminate\Http\Request;

class IngresoMovimientoController extends Controller
{
    // GET /movimientos-etapas - Ver todos los movimientos
    public function index()
    {
        return response()->json(movimientos_etapas::with('ave')->get(), 200);
    }

    // GET /movimientos-etapas/{id} - Ver un movimiento específico
    public function show($id)
    {
        $movimiento = movimientos_etapas::with('ave')->findOrFail($id);
        return response()->json($movimiento);
    }

    // POST /movimientos-etapas - Crear un movimiento de etapa
    public function store(Request $request)
    {
        $request->validate([
            'ave_id' => 'required|exists:aves,id',
            'etapa' => 'required|in:encerrado,potrero,jaula,entreno',
            'fecha_cambio' => 'required|date',
            'responsable' => 'nullable|string|max:100',
            'observaciones' => 'nullable|string',
        ]);

        // Actualiza etapa actual de la ave
        $ave = Aves::findOrFail($request->ave_id);
        $ave->etapa_actual = $request->etapa;
        $ave->save();

        $movimiento = movimientos_etapas::create($request->all());

        return response()->json([
            'mensaje' => 'Movimiento de etapa registrado',
            'data' => $movimiento
        ], 201);
    }

    // PUT /movimientos-etapas/{id} - Actualizar movimiento
    public function update(Request $request, $id)
    {
        $movimiento = movimientos_etapas::findOrFail($id);

        $request->validate([
            'etapa' => 'nullable|in:encerrado,potrero,jaula,entreno',
            'fecha_cambio' => 'nullable|date',
            'responsable' => 'nullable|string|max:100',
            'observaciones' => 'nullable|string',
        ]);

        $movimiento->update($request->all());

        return response()->json([
            'mensaje' => 'Movimiento actualizado',
            'data' => $movimiento
        ]);
    }

    // DELETE /movimientos-etapas/{id} - Eliminar movimiento
    public function destroy($id)
    {
        $movimiento = movimientos_etapas::findOrFail($id);
        $movimiento->delete();

        return response()->json(['mensaje' => 'Movimiento de etapa eliminado']);
    }
}
