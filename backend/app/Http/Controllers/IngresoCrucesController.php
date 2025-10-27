<?php

namespace App\Http\Controllers;

use App\Models\Cruzamiento;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class IngresoCrucesController extends Controller
{
    /**
     * GET: Obtener todos los cruzamientos
     */
    public function obtenerCruces()
    {
        try {
            $cruces = Cruzamiento::with(['gallo', 'gallina'])
                                ->latest('fecha_cruza')
                                ->paginate(10);

            return response()->json([
                'status' => 'success',
                'data' => $cruces
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Error al obtener cruzamientos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * POST: Registrar nuevo cruzamiento
     */
    public function nuevoCruce(Request $request)
    {
        try {
            $validated = $request->validate([
                'gallo_id' => 'required|exists:gallos,id',
                'gallina_id' => 'required|exists:gallinas,id',
                'fecha_cruza' => 'required|date|before_or_equal:today',
                'observaciones' => 'nullable|string|max:255',
            ]);

            DB::beginTransaction();

            $fechaCruza = Carbon::parse($validated['fecha_cruza']);
            $fechaEclosion = $fechaCruza->copy()->addDays(21);

            $cruce = Cruzamiento::create([
                ...$validated,
                'fecha_estimacion_eclosion' => $fechaEclosion
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Cruce registrado correctamente',
                'data' => $cruce->load(['gallo', 'gallina'])
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
                'message' => 'Error al registrar el cruce',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * PUT: Actualizar cruzamiento
     */
    public function actualizarCruce(Request $request, $id)
    {
        try {
            $cruce = Cruzamiento::findOrFail($id);

            $validated = $request->validate([
                'gallo_id' => 'sometimes|exists:gallos,id',
                'gallina_id' => 'sometimes|exists:gallinas,id',
                'fecha_cruza' => 'sometimes|date|before_or_equal:today',
                'observaciones' => 'nullable|string|max:255',
            ]);

            DB::beginTransaction();

            if (isset($validated['fecha_cruza'])) {
                $validated['fecha_estimacion_eclosion'] = Carbon::parse($validated['fecha_cruza'])->addDays(21);
            }

            $cruce->update($validated);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Cruce actualizado correctamente',
                'data' => $cruce->fresh()->load(['gallo', 'gallina'])
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
                'message' => 'Error al actualizar el cruce',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * DELETE: Eliminar cruzamiento
     */
    public function eliminarCruce($id)
    {
        try {
            DB::beginTransaction();
            
            $cruce = Cruzamiento::findOrFail($id);
            $cruce->delete();
            
            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Cruce eliminado correctamente'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => 'Error al eliminar el cruce',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}