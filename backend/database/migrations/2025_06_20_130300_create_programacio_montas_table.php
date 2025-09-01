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
        Schema::create('programacio_montas', function (Blueprint $table) {
            $table->id();
            $table->date('fecha_programada');
            $table->string('estado', 20);
            $table->string('chapeta_marrana', 4);
            $table->string('nombre_marrana', 20);
            $table->string('chapeta_marrano', 4);
            $table->string('nombre_marrano', 20);
            $table->string('estado_programacion', 20);
            $table->string('tipo_monta', 20);
            $table->string('observaciones', 250);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programacio_montas');
    }
};
