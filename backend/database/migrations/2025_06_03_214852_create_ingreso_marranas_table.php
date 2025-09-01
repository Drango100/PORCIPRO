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
        Schema::create('ingresos_marrana', function (Blueprint $table) {
            $table->id();
            $table->string('chapeta',50);// Maximo caracteres
            $table->string('nombre',50);
            $table->string('peso_marrana',50);
            $table->string('raza',50);
            $table->date('fecha_Ingreso');
            $table->string('estado_marrana',50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingresos_marrana');
    }
};