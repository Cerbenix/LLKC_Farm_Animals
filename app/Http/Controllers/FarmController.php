<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFarmRequest;
use App\Http\Requests\UpdateFarmRequest;
use App\Models\Farm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FarmController extends Controller
{
    public function index()
    {
        $farms = Auth::user()->farms()->paginate(10);
        return response()->json($farms);
    }

    public function store(StoreFarmRequest $request)
    {
        $farm = Auth::user()->farms()->create([
            'name' => $request->name,
            'email' => $request->email,
            'website' => $request->website,
        ]);

        return response()->json($farm, 201);
    }

    public function show($id)
    {
        $farm = Farm::findOrFail($id);
        return response()->json($farm);
    }

    public function update(UpdateFarmRequest $request, $id)
    {
        $farm = Farm::findOrFail($id);

        $farm->update([
            'name' => $request->name,
            'email' => $request->email,
            'website' => $request->website,
        ]);

        return response()->json($farm);
    }

    public function destroy($id)
    {
        $farm = Auth::user()->farms()->findOrFail($id);
        $farm->delete();

        return response()->json(null, 204);
    }
}
