<?php

// app/Http/Controllers/CommentController.php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

/**
 * CommentController
 *
 * Handles creating and deleting comments on posts.
 */
class CommentController extends Controller
{
    /**
     * Store a newly created comment for a specific post.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post          $post
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request, Post $post)
    {
        // Validate incoming comment data
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
        ]);

        // Create the comment via the post relationship
        $comment = $post->comments()->create([
            'user_id' => $request->user()->id, // Author of the comment
            'content' => $validated['content'],
        ]);

        return back()->with('success', 'Comment added successfully');
    }

    /**
     * Delete a comment.
     *
     * Only the comment owner is allowed to delete their comment.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Comment $comment)
    {
        // Ensure the authenticated user owns the comment
        if (auth()->id() !== $comment->user_id) {
            abort(403, 'Unauthorized');
        }

        // Delete the comment
        $comment->delete();

        return back()->with('success', 'Comment deleted successfully');
    }
}
