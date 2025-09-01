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
        Schema::create('movimientos_etapas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ave_id')->constrained('aves')->onDelete('cascade');
            $table->enum('etapa', ['encerrado', 'potrero', 'jaula', 'entreno']);
            $table->date('fecha_cambio');
            $table->string('responsable')->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movimientos_etapas');
    }
};
