<?php

namespace App\Http\Controllers;

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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'nullable|email',
            'website' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $farm = Auth::user()->farms()->create($request->only('name', 'email', 'website'));

        return response()->json($farm, 201);
    }

    public function show($id)
    {
        $farm = Auth::user()->farms()->findOrFail($id);
        return response()->json($farm);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'nullable|email',
            'website' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $farm = Auth::user()->farms()->findOrFail($id);
        $farm->update($request->only('name', 'email', 'website'));

        return response()->json($farm);
    }

    public function destroy($id)
    {
        $farm = Auth::user()->farms()->findOrFail($id);
        $farm->delete();

        return response()->json(null, 204);
    }
}
