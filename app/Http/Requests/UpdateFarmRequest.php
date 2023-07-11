<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFarmRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $regex = '/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/';

        return [
            'name' => 'required|string',
            'email' => 'nullable|email',
            'website' => ['nullable', 'regex:' . $regex],
        ];
    }
}
