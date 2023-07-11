<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FarmFactory extends Factory
{
    public function definition()
    {
        return [
            'name' => $this->faker->company,
            'email' => $this->faker->safeEmail,
            'website' => $this->faker->url,
        ];
    }
}
