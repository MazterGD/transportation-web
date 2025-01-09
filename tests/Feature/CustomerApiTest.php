<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CustomerApiTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_create_customer()
    {
        $response = $this->postJson('/v1/customers', [
            'name' => 'htp',
            'type' => 'I',
            'email' => 'htp03@walker.com',
            'address' => '582 Myrtie Pike Apt. 428',
            'city' => 'Boehmton',
            'state' => 'Minnesota',
            'postalCode' => '30000',
        ]);

        $response->assertStatus(201);
    }

}
