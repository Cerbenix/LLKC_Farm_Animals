<?php

namespace Tests\Feature;

use App\Models\Farm;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FarmControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        Farm::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->get('/api/farms');

        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    public function testStore()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $payload = [
            'name' => 'Test Farm',
            'email' => 'test@example.com',
            'website' => 'https://example.com',
        ];

        $response = $this->post('/api/farms', $payload);

        $response->assertStatus(201);
        $this->assertDatabaseHas('farms', ['name' => 'Test Farm']);
    }

    public function testShow()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $farm = Farm::factory()->create(['user_id' => $user->id]);

        $response = $this->get('/api/farms/' . $farm->id);

        $response->assertStatus(200);
        $response->assertJson(['name' => $farm->name]);
    }

    public function testUpdate()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $farm = Farm::factory()->create(['user_id' => $user->id]);

        $payload = [
            'name' => 'Updated Farm',
            'email' => 'updated@example.com',
            'website' => 'https://updated.com',
        ];

        $response = $this->put('/api/farms/' . $farm->id, $payload);

        $response->assertStatus(200);
        $this->assertDatabaseHas('farms', ['name' => 'Updated Farm']);
    }

    public function testDestroy()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $farm = Farm::factory()->create(['user_id' => $user->id]);

        $response = $this->delete('/api/farms/' . $farm->id);

        $response->assertStatus(204);
        $this->assertDeleted($farm);
    }
}
