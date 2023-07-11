<?php

namespace Database\Seeders;

use App\Models\Animal;
use App\Models\Farm;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $user1->farms()->createMany(
            Farm::factory()->count(2)->make()->toArray()
        );

        $user2->farms()->createMany(
            Farm::factory()->count(2)->make()->toArray()
        );

        Farm::all()->each(function ($farm) {
            $farm->animals()->createMany(
                Animal::factory()->count(3)->make()->toArray()
            );
        });
    }
}
