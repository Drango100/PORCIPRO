<?php

namespace App\Http\Controllers;

use App\Models\Camada;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class IngresoCamadaController extends Controller
{
    /**
     * GET: Ver todas las camadas con paginación
     */
    public function index()
    {
        try {
            $camadas = Camada::with('cruzamiento')
                            ->latest()
                            ->paginate(10);
            
            return response()->json([
                'status' => 'success',
                'data' => $camadas
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener las camadas',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * GET: Ver una camada específica
     */
    public function show($id)
    {
        try {
            $camada = Camada::with('cruzamiento')->findOrFail($id);
            return response()->json([
                'status' => 'success',
                'data' => $camada
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Camada no encontrada',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * POST: Registrar nueva camada
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'cruzamiento_id' => 'required|exists:cruzamientos,id',
                'fecha_nacimiento' => 'required|date|before_or_equal:today',
                'cantidad_machos' => 'required|integer|min:0|max:30',
                'cantidad_hembras' => 'required|integer|min:0|max:30',
                'luna' => 'nullable|string|max:50',
                'codigo_marcaje' => 'nullable|string|max:100|unique:camadas,codigo_marcaje',
                'notas' => 'nullable|string|max:500',
            ]);

            DB::beginTransaction();
            
            $camada = Camada::create($validated);
            
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Camada registrada correctamente',
                'data' => $camada->load('cruzamiento')
            ], 201);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Error al registrar la camada',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT: Actualizar camada
     */
    public function update(Request $request, $id)
    {
        try {
            $camada = Camada::findOrFail($id);

            $validated = $request->validate([
                'cruzamiento_id' => 'sometimes|exists:cruzamientos,id',
                'fecha_nacimiento' => 'sometimes|date|before_or_equal:today',
                'cantidad_machos' => 'sometimes|integer|min:0|max:30',
                'cantidad_hembras' => 'sometimes|integer|min:0|max:30',
                'luna' => 'nullable|string|max:50',
                'codigo_marcaje' => 'nullable|string|max:100|unique:camadas,codigo_marcaje,'.$id,
                'notas' => 'nullable|string|max:500',
            ]);

            DB::beginTransaction();
            
            $camada->update($validated);
            
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Camada actualizada correctamente',
                'data' => $camada->fresh()->load('cruzamiento')
            ]);

        } catch (ValidationException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Error al actualizar la camada',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * DELETE: Eliminar camada
     */
    public function destroy($id)
    {
        try {
            DB::beginTransaction();
            
            $camada = Camada::findOrFail($id);
            $camada->delete();
            
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Camada eliminada correctamente'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Error al eliminar la camada',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}