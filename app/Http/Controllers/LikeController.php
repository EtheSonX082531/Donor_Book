<?php

// app/Http/Controllers/LikeController.php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * LikeController
 *
 * Handles adding and removing likes (supports)
 * on posts by authenticated users.
 */
class LikeController extends Controller
{
    /**
     * Toggle like status for a post.
     *
     * If the user has already liked the post, the like is removed.
     * Otherwise, a new like is created.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post          $post
     * @return \Illuminate\Http\RedirectResponse
     */
    public function toggle(Request $request, Post $post)
    {
        // Ensure the user is authenticated
        $user = $request->user();
        if (!$user) {
            abort(403, 'Unauthorized');
        }

        DB::transaction(function () use ($post, $user, &$message) {
            // Check if the user has already liked the post
            $like = $post->likes()
                ->where('user_id', $user->id)
                ->first();

            if ($like) {
                // Remove existing like
                $like->delete();

                // Safely decrement cached likes count
                $post->decrement('likes_count');

                $message = 'Support removed';
            } else {
                // Create a new like
                $post->likes()->create([
                    'user_id' => $user->id,
                ]);

                // Safely increment cached likes count
                $post->increment('likes_count');

                $message = 'Support added';
            }
        });

        return back()->with('success', $message);
    }
}
