<?php

namespace App\Http\Controllers;

use App\Models\Animal;
use App\Models\Farm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AnimalController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $animals = $user->animals()->paginate(10);
        return response()->json($animals);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'animal_number' => 'required|numeric',
            'type_name' => 'required',
            'years' => 'nullable|numeric',
            'farm_id' => 'required|exists:farms,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $farmId = $request->farm_id;
        $animalCount = Animal::where('farm_id', $farmId)->count();
        $maxAnimalLimit = 3;

        if ($animalCount >= $maxAnimalLimit) {
            return response()->json([
                'errors' => ['animals' => 'Farm has reached the maximum animal limit.'
                ]], 422);
        }

        $animal = new Animal([
            'animal_number' => $request->animal_number,
            'type_name' => $request->type_name,
            'years' => $request->years,
            'farm_id' => $request->farm_id,
        ]);

        $animal->save();

        return response()->json($animal, 201);
    }


    public function show(Request $request)
    {
        $farm = Farm::findOrFail($request->farm_id);
        $animals = $farm->animals()->get();
        return response()->json($animals);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'animal_number' => 'required',
            'type_name' => 'required',
            'years' => 'numeric|nullable'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $animal = Animal::findOrFail($id);

        $animal->update([
            'animal_number' => $request->animal_number,
            'type_name' => $request->type_name,
            'years' => $request->years,
        ]);

        return response()->json($animal);
    }

    public function destroy($id)
    {
        $animal = Animal::findOrFail($id);
        $animal->delete();
        return response()->json(null, 204);
    }
}
