<?php

namespace App\Http\Controllers;

use App\Models\Camada;
use Illuminate\Http\Request;

class IngresoCamadaController extends Controller
{
    // GET: Ver todas las camadas
    public function index()
    {
        return response()->json(Camada::with('cruzamiento')->get(), 200);
    }

    // GET: Ver una camada específica
    public function show($id)
    {
        $camada = Camada::with('cruzamiento')->findOrFail($id);
        return response()->json($camada);
    }

    // POST: Registrar nueva camada
    public function store(Request $request)
    {
        $request->validate([
            'cruzamiento_id' => 'required|exists:cruzamientos,id',
            'fecha_nacimiento' => 'required|date',
            'cantidad_machos' => 'required|integer|min:0',
            'cantidad_hembras' => 'required|integer|min:0',
            'luna' => 'nullable|string|max:50',
            'codigo_marcaje' => 'nullable|string|max:100',
            'notas' => 'nullable|string',
        ]);

        $camada = Camada::create($request->all());

        return response()->json([
            'mensaje' => 'Camada registrada correctamente',
            'data' => $camada,
        ], 201);
    }

    // PUT: Actualizar camada
    public function update(Request $request, $id)
    {
        $camada = Camada::findOrFail($id);
        $camada->update($request->all());

        return response()->json([
            'mensaje' => 'Camada actualizada',
            'data' => $camada,
        ]);
    }

    // DELETE: Eliminar camada
    public function destroy($id)
    {
        Camada::destroy($id);
        return response()->json(['mensaje' => 'Camada eliminada']);
    }
}
