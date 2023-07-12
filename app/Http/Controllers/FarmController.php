<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFarmRequest;
use App\Http\Requests\UpdateFarmRequest;
use App\Models\Farm;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class FarmController extends Controller
{
    public function index(): JsonResponse
    {
        $farms = Auth::user()->farms()->paginate(10);

        return response()->json($farms);
    }

    public function store(StoreFarmRequest $request): JsonResponse
    {
        $farm = Auth::user()->farms()->create([
            'name' => $request->name,
            'email' => $request->email,
            'website' => $request->website,
        ]);

        return response()->json($farm, 201);
    }

    public function show(Farm $farm): JsonResponse
    {
        return response()->json($farm);
    }

    public function update(UpdateFarmRequest $request, Farm $farm): JsonResponse
    {
        $farm->update([
            'name' => $request->name,
            'email' => $request->email,
            'website' => $request->website,
        ]);

        return response()->json($farm);
    }

    public function destroy(Farm $farm): JsonResponse
    {
        $farm->delete();

        return response()->json(null, 204);
    }
}
