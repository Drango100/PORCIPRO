<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('cruzamientos')) {
            return; // Si ya existe, salta esta migración
        }
        Schema::create('cruzamientos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('gallo_id')->constrained('gallos')->onDelete('set null');
            $table->foreignId('gallina_id')->constrained('gallinas')->onDelete('set null');
            $table->date('fecha_cruza');
            $table->date('fecha_estimacion_eclosion')->nullable(); // calculada automáticamente
            $table->string('observaciones')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cruzaminetos');
    }
};
