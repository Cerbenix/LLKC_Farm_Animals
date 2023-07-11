<?php

namespace Tests\Feature;

use App\Models\Animal;
use App\Models\Farm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AnimalControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $farm = Farm::factory()->create(['user_id' => $user->id]);
        Animal::factory()->create(['farm_id' => $farm->id, 'animal_number' => 7]);

        $response = $this->get('/api/animals');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonFragment(['animal_number' => "7"]);
    }

    public function testStore()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $farm = Farm::factory()->create(['user_id' => $user->id]);

        $payload = [
            'animal_number' => '1234',
            'type_name' => 'Cat',
            'years' => 2,
            'farm' => $farm->id,
        ];

        $response = $this->post("/api/farms/{$farm->id}/animals", $payload);

        $response->assertStatus(201);
        $this->assertDatabaseHas('animals', ['animal_number' => '1234']);
    }

    public function testShow()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $farm = Farm::factory()->create(['user_id' => $user->id]);
        $animals = Animal::factory()->count(3)->create(['farm_id' => $farm->id]);

        $response = $this->get("/api/farms/{$farm->id}/animals");

        $response->assertStatus(200);
        $response->assertJsonCount(3);
        $response->assertJsonFragment(['animal_number' => "{$animals->first()->animal_number}"]);
    }

    public function testUpdate()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $farm = Farm::factory()->create(['user_id' => $user->id]);
        $animal = Animal::factory()->create(['farm_id' => $farm->id]);

        $payload = [
            'animal_number' => '5678',
            'type_name' => 'Dog',
            'years' => 3,
        ];

        $response = $this->put("/api/animals/{$animal->id}", $payload);

        $response->assertStatus(200);
        $this->assertDatabaseHas('animals', ['animal_number' => '5678']);
    }

    public function testDestroy()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $farm = Farm::factory()->create(['user_id' => $user->id]);
        $animal = Animal::factory()->create(['farm_id' => $farm->id]);

        $response = $this->delete("/api/animals/{$animal->id}");

        $response->assertStatus(204);
        $this->assertDeleted($animal);
    }
}
