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
        Schema::create('aves', function (Blueprint $table) {
            $table->id();
            $table->foreignId('camada_id')->constrained('camadas')->onDelete('cascade');
            $table->string('identificacion')->unique();
            $table->enum('sexo', ['M', 'F']);
            $table->string('raza')->nullable();
            $table->date('fecha_nacimiento');
            $table->string('marcaje')->nullable(); // color, anillo, etc.
            $table->text('observaciones')->nullable();
            $table->enum('etapa_actual', ['encerrado', 'potrero', 'jaula', 'entreno'])->default('encerrado');
            $table->date('fecha_estimado_potrero')->nullable();
            $table->date('fecha_estimado_jaula')->nullable();
            $table->date('fecha_estimado_entreno')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aves');
    }
};
