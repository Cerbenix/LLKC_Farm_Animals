<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Animal extends Model
{
    protected $fillable = ['animal_number', 'type_name', 'years', 'farm_id'];

    public function farm()
    {
        return $this->belongsTo(Farm::class);
    }
}
