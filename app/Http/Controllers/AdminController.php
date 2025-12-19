<?php
// app/Http/Controllers/AdminController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware(function ($request, $next) {
            if (!$request->user()->isAdmin()) {
                abort(403, 'Unauthorized');
            }
            return $next($request);
        });
    }

    public function dashboard()
    {
        $stats = [
            'total_users' => User::count(),
            'total_posts' => Post::count(),
            'active_donors' => User::whereHas('profile', function ($query) {
                $query->where('is_donor', true);
            })->count(),
            'blood_requests' => Post::where('type', 'request')->count(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_posts' => Post::with('user')->latest()->take(10)->get(),
        ]);
    }

    public function users()
    {
        $users = User::with('profile')->latest()->paginate(20);
        
        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function posts()
    {
        $posts = Post::with('user')->latest()->paginate(20);
        
        return Inertia::render('Admin/Posts', [
            'posts' => $posts,
        ]);
    }

    public function deletePost(Post $post)
    {
        $post->delete();
        
        return back()->with('success', 'Post deleted successfully');
    }
}