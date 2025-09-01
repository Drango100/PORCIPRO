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
        Schema::create('gallinas_reproductoras', function (Blueprint $table) {
            $table->id();
            $table->string('identificacion')->unique(); // placa o anillo
            $table->string('nombre')->nullable();
            $table->date('fecha_nacimiento')->nullable();
            $table->integer('edad_meses')->nullable(); // calculable también
            $table->string('raza')->nullable();
            $table->string('color')->nullable();
            $table->text('caracteristicas')->nullable(); // temperamento, morfología, etc.
            $table->string('criadero_origen')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallinas_reproductoras');
    }
};
