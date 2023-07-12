<?php

namespace App\Http\Middleware;

use App\Models\Farm;
use Closure;
use Illuminate\Http\Request;

class VerifyFarmOwner
{
    public function handle(Request $request, Closure $next)
    {
        $farm = $request->route('farm');

        if ($farm && $farm->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
