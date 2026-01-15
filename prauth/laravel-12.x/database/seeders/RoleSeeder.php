<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User; // <-- Importante

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crea los roles (si no existen)
        $adminRole = Role::updateOrCreate(['name' => 'admin']);
        Role::updateOrCreate(['name' => 'user']);

        // 2. Busca al primer usuario y dale el rol
        $user = User::first();
        if ($user) {
            $user->assignRole($adminRole);
        }
    }
}