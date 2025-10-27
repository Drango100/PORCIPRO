<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cruzamientos', function (Blueprint $table) {
            $table->id();
            // Hacer las columnas nullables antes de crear la llave foránea
            $table->unsignedBigInteger('gallo_id')->nullable();
            $table->unsignedBigInteger('gallina_id')->nullable();
            $table->date('fecha_cruza');
            $table->date('fecha_estimacion_eclosion')->nullable();
            $table->string('observaciones')->nullable();
            $table->timestamps();

            // Añadir las llaves foráneas después
            $table->foreign('gallo_id')
                  ->references('id')
                  ->on('gallos_reproductores')
                  ->onDelete('set null');
                  
            $table->foreign('gallina_id')
                  ->references('id')
                  ->on('gallinas_reproductoras')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        // Corregido el typo en 'cruzaminetos'
        Schema::dropIfExists('cruzamientos');
    }
};