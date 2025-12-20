<?php

// app/Models/Comment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Comment Model
 *
 * This model represents a comment made by a user on a post.
 * It handles database interactions for the `comments` table.
 */
class Comment extends Model
{
    // Enables factory support for testing and seeding
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * These fields can be filled using Comment::create([...])
     */
    protected $fillable = [
        'user_id',   // ID of the user who wrote the comment
        'post_id',   // ID of the post the comment belongs to
        'content',   // The actual comment text
    ];

    /**
     * Get the user who wrote the comment.
     *
     * Relationship: Comment belongs to a User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the post that this comment belongs to.
     *
     * Relationship: Comment belongs to a Post
     */
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}

