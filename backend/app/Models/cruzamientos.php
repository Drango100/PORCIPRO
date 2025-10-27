<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Cruzamiento extends Model
{
    use HasFactory;

    protected $table = 'cruzamientos';

    protected $fillable = [
        'gallo_id',
        'gallina_id',
        'fecha_cruza',
        'fecha_estimacion_eclosion',
        'observaciones'
    ];

    protected $casts = [
        'fecha_cruza' => 'datetime',
        'fecha_estimacion_eclosion' => 'datetime'
    ];

    // Relación con gallo
    public function gallo()
    {
        return $this->belongsTo(Gallo::class, 'gallo_id');
    }

    // Relación con gallina
    public function gallina()
    {
        return $this->belongsTo(Gallina::class, 'gallina_id');
    }
}