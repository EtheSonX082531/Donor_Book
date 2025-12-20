<?php

// app/Models/Like.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Like Model
 *
 * This model represents a "like" made by a user on a post.
 * It is typically used to track which users liked which posts.
 */
class Like extends Model
{
    // Enables factory support for testing and database seeding
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * These fields can be safely assigned using Like::create([...])
     */
    protected $fillable = [
        'user_id', // ID of the user who liked the post
        'post_id', // ID of the post that was liked
    ];

    /**
     * Get the user who liked the post.
     *
     * Relationship: Like belongs to a User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the post that was liked.
     *
     * Relationship: Like belongs to a Post
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
