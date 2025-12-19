<?php
// database/seeders/DatabaseSeeder.php
namespace Database\Seeders;

use App\Models\User;
use App\Models\Profile;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@donorbook.com',
            'phone' => '+1234567890',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);

        Profile::create([
            'user_id' => $admin->id,
            'blood_group' => 'O+',
            'location' => 'New York, NY',
            'is_donor' => true,
            'bio' => 'System Administrator',
        ]);

        // Create sample users
        $users = [
            [
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'phone' => '+1234567891',
                'blood_group' => 'A+',
                'location' => 'Los Angeles, CA',
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'phone' => '+1234567892',
                'blood_group' => 'B-',
                'location' => 'Chicago, IL',
            ],
            [
                'name' => 'Robert Johnson',
                'email' => 'robert@example.com',
                'phone' => '+1234567893',
                'blood_group' => 'O+',
                'location' => 'Houston, TX',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'phone' => $userData['phone'],
                'password' => Hash::make('password123'),
                'role' => 'user',
            ]);

            Profile::create([
                'user_id' => $user->id,
                'blood_group' => $userData['blood_group'],
                'location' => $userData['location'],
                'is_donor' => true,
                'bio' => 'Ready to help save lives',
            ]);
        }

        // Create sample posts
        $posts = [
            [
                'user_id' => 2,
                'type' => 'request',
                'blood_group' => 'A+',
                'units_needed' => 2,
                'hospital_name' => 'LA General Hospital',
                'location' => 'Los Angeles, CA',
                'urgency' => 'high',
                'description' => 'Emergency surgery required. Need A+ blood urgently.',
            ],
            [
                'user_id' => 3,
                'type' => 'donor',
                'blood_group' => 'B-',
                'location' => 'Chicago, IL',
                'urgency' => 'medium',
                'description' => 'Available for donation. Contact me for appointment.',
            ],
            [
                'user_id' => 4,
                'type' => 'request',
                'blood_group' => 'O+',
                'units_needed' => 1,
                'hospital_name' => 'Texas Medical Center',
                'location' => 'Houston, TX',
                'urgency' => 'critical',
                'description' => 'Accident victim needs immediate blood transfusion.',
            ],
        ];

        foreach ($posts as $postData) {
            Post::create($postData);
        }
    }
}