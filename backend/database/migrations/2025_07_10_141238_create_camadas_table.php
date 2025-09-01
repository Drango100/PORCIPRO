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
        Schema::create('camadas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cruzamiento_id')->constrained('cruzamientos')->onDelete('cascade');
            $table->date('fecha_nacimiento');
            $table->string('luna')->nullable(); // fase lunar
            $table->integer('cantidad_machos'); // machos
            $table->integer('cantidad_hembras'); // hembras
            $table->string('codigo_marcaje')->nullable(); // anillos, colores, etc.
            $table->text('notas')->nullable()   ; // problemas en incubación, muerte, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('camadas');
    }
};
