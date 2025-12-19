<?php
// app/Http/Controllers/LikeController.php
namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggle(Request $request, Post $post)
    {
        $like = $post->likes()->where('user_id', $request->user()->id)->first();

        if ($like) {
            $like->delete();
            $post->decrement('likes_count');
            $message = 'Support removed';
        } else {
            $post->likes()->create([
                'user_id' => $request->user()->id,
            ]);
            $post->increment('likes_count');
            $message = 'Support added';
        }

        return back()->with('success', $message);
    }
}
