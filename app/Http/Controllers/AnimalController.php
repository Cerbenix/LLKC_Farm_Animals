<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnimalRequest;
use App\Http\Requests\UpdateAnimalRequest;
use App\Models\Animal;
use App\Models\Farm;
use Illuminate\Http\Request;

class AnimalController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $animals = $user->animals()->paginate(10);
        return response()->json($animals);
    }

    public function store(StoreAnimalRequest $request)
    {
        $farmId = $request->farm;
        $animalCount = Animal::where('farm_id', $farmId)->count();
        $animalLimit = 3;

        if ($animalCount >= $animalLimit) {
            return response()->json([
                'errors' => [
                    'animals' => 'Farm has reached the maximum animal limit.'
                ]
            ], 422);
        }

        $animal = new Animal([
            'animal_number' => $request->animal_number,
            'type_name' => $request->type_name,
            'years' => $request->years,
            'farm_id' => $request->farm,
        ]);

        $animal->save();

        return response()->json($animal, 201);
    }

    public function show(Request $request)
    {
        $farm = Farm::findOrFail($request->farm);
        $animals = $farm->animals()->get();
        return response()->json($animals);
    }

    public function update(UpdateAnimalRequest $request, $id)
    {
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
