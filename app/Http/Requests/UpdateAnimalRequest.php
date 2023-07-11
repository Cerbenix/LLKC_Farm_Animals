<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnimalRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'animal_number' => 'required|numeric',
            'type_name' => 'required',
            'years' => 'nullable|numeric',
        ];
    }
}
