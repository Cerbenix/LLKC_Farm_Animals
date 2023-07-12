<?php

namespace App\Http\Middleware;

use App\Models\Animal;
use Closure;
use Illuminate\Http\Request;

class VerifyAnimalOwner
{
    public function handle(Request $request, Closure $next)
    {
        $animal = $request->route('animal');

        if ($animal->farm->user_id !== auth()->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
