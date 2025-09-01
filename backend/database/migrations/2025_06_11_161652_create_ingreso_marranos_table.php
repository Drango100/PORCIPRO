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
        Schema::create('ingreso_marranos', function (Blueprint $table) {
            $table->id();
            $table->string('chapeta',4);// Maximo caracteres
            $table->string('nombre',45);
            $table->string('peso_marrano',4);
            $table->string('raza',45);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ingreso_marranos');
    }
};
