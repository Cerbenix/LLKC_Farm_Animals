<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnimalRequest;
use App\Http\Requests\UpdateAnimalRequest;
use App\Models\Animal;
use App\Models\Farm;
use Illuminate\Http\JsonResponse;

class AnimalController extends Controller
{
    public function index(): JsonResponse
    {
        $user = auth()->user();
        $animals = $user->animals()->paginate(10);

        return response()->json($animals);
    }

    public function store(StoreAnimalRequest $request): JsonResponse
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

    public function show(Farm $farm): JsonResponse
    {
        $animals = $farm->animals()->get();

        return response()->json($animals);
    }

    public function update(UpdateAnimalRequest $request, Animal $animal): JsonResponse
    {
        $animal->update([
            'animal_number' => $request->animal_number,
            'type_name' => $request->type_name,
            'years' => $request->years,
        ]);

        return response()->json($animal);
    }

    public function destroy(Animal $animal): JsonResponse
    {
        $animal->delete();

        return response()->json(null, 204);
    }
}
