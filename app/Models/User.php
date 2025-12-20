<?php

// app/Models/User.php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * User Model
 *
 * This model represents an authenticated user of the system.
 * It handles authentication, authorization, and relationships
 * with profiles, posts, and comments.
 */
class User extends Authenticatable
{
    // Enables API token authentication, factories, and notifications
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * These fields can be filled using User::create([...])
     */
    protected $fillable = [
        'name',      // Full name of the user
        'email',     // Email address (used for login)
        'phone',     // Contact phone number
        'password',  // Hashed password
        'role',      // User role (e.g., user, admin)
    ];

    /**
     * The attributes that should be hidden when serialized.
     *
     * These fields will not appear in API or JSON responses.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Attribute casting.
     *
     * Automatically converts email_verified_at to a DateTime object.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Get the user's profile.
     *
     * Relationship: User has one Profile
     */
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    /**
     * Get all posts created by the user.
     *
     * Relationship: User has many Posts
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Get all comments written by the user.
     *
     * Relationship: User has many Comments
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Check if the user has admin privileges.
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }
}
