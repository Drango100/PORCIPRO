<?php

namespace App\Http\Controllers;

use App\Models\Seguimiento;
use Illuminate\Http\Request;

class IngresoSeguimientoController extends Controller
{
    // GET /seguimientos - Listar todos los seguimientos
    public function index()
    {
        return response()->json(Seguimiento::with('ave')->get(), 200);
    }

    // GET /seguimientos/{id} - Mostrar un seguimiento específico
    public function show($id)
    {
        $seguimiento = Seguimiento::with('ave')->findOrFail($id);
        return response()->json($seguimiento);
    }

    // POST /seguimientos - Crear un nuevo seguimiento
    public function store(Request $request)
    {
        $request->validate([
            'ave_id' => 'required|exists:aves,id',
            'fecha' => 'required|date',
            'tipo' => 'nullable|string|max:100',
            'descripcion' => 'nullable|string',
        ]);

        $seguimiento = Seguimiento::create($request->all());

        return response()->json([
            'mensaje' => 'Seguimiento registrado correctamente',
            'data' => $seguimiento
        ], 201);
    }

    // PUT /seguimientos/{id} - Actualizar seguimiento
    public function update(Request $request, $id)
    {
        $seguimiento = Seguimiento::findOrFail($id);

        $request->validate([
            'fecha' => 'nullable|date',
            'tipo' => 'nullable|string|max:100',
            'descripcion' => 'nullable|string',
        ]);

        $seguimiento->update($request->all());

        return response()->json([
            'mensaje' => 'Seguimiento actualizado',
            'data' => $seguimiento
        ]);
    }

    // DELETE /seguimientos/{id} - Eliminar seguimiento
    public function destroy($id)
    {
        $seguimiento = Seguimiento::findOrFail($id);
        $seguimiento->delete();

        return response()->json(['mensaje' => 'Seguimiento eliminado']);
    }
}
