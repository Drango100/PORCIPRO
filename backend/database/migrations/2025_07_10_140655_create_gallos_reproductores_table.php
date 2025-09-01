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
        Schema::create('gallos_reproductores', function (Blueprint $table) {
            $table->id();
            $table->string('identificacion')->unique();
            $table->string('nombre')->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->integer('edad_meses')->nullable();
            $table->string('raza')->nullable();
            $table->string('color')->nullable();
            $table->text('caracteristicas')->nullable();
            $table->string('criadero_origen')->nullable();
            $table->boolean('activo')->default(true); // si sigue siendo padrote
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallos_reproductores');
    }
};
