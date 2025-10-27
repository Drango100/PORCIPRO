<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Camada extends Model
{
    use HasFactory;

    protected $fillable = [
        'cruzamiento_id',
        'fecha_nacimiento',
        'cantidad_machos',
        'cantidad_hembras',
        'luna',
        'codigo_marcaje',
        'notas'
    ];

    protected $casts = [
        'fecha_nacimiento' => 'date'
    ];

    public function cruzamiento()
    {
        return $this->belongsTo(Cruzamiento::class);
    }
}