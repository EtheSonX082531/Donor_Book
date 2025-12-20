<?php

// app/Models/Post.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Post Model
 *
 * This model represents a blood donation–related post
 * (request or availability) created by a user.
 */
class Post extends Model
{
    // Enables factory support for testing and seeding
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * These fields can be filled using Post::create([...])
     */
    protected $fillable = [
        'user_id',        // ID of the user who created the post
        'type',           // Type of post (e.g., request or donation)
        'blood_group',    // Required blood group (e.g., A+, O-)
        'units_needed',   // Number of blood units required
        'hospital_name',  // Name of the hospital
        'location',       // Location of the hospital or donation center
        'urgency',        // Urgency level (e.g., low, medium, high)
        'description',    // Additional details about the post
        'image',          // Optional image related to the post
        'is_active',      // Indicates whether the post is currently active
    ];

    /**
     * Attribute casting.
     *
     * Automatically converts is_active to boolean.
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the user who created the post.
     *
     * Relationship: Post belongs to a User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all comments associated with the post.
     *
     * Relationship: Post has many Comments
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Get all likes associated with the post.
     *
     * Relationship: Post has many Likes
     */
    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    /**
     * Check if the post is liked by a specific user.
     *
     * @param  int|null  $userId
     * @return bool
     */
    public function likedByUser($userId)
    {
        // If no user is provided, the post cannot be liked
        if (!$userId) {
            return false;
        }

        // Check if a like exists for the given user
        return $this->likes()
            ->where('user_id', $userId)
            ->exists();
    }
}
