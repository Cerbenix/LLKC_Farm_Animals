<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AnimalFactory extends Factory
{
    public function definition()
    {
        return [
            'animal_number' => $this->faker->unique()->randomNumber(),
            'type_name' => $this->faker->randomElement([
                'Cows',
                'Sheep',
                'Pigs',
                'Chickens',
                'Goats',
                'Horses',
                'Ducks'
            ]),
            'years' => $this->faker->numberBetween(1, 10),
        ];
    }
}
