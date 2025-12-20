<?php

// app/Http/Controllers/AdminController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * AdminController
 *
 * Handles all administrative functionality such as
 * viewing statistics, managing users, and moderating posts.
 * Access is restricted to admin users only.
 */
class AdminController extends Controller
{
    /**
     * Apply authentication and admin authorization middleware.
     */
    public function __construct()
    {
        // Ensure the user is authenticated
        $this->middleware('auth');

        // Ensure the user has admin privileges
        $this->middleware(function ($request, $next) {
            if (!$request->user()->isAdmin()) {
                abort(403, 'Unauthorized');
            }

            return $next($request);
        });
    }

    /**
     * Display the admin dashboard with system statistics.
     *
     * @return \Inertia\Response
     */
    public function dashboard()
    {
        // Collect key platform statistics
        $stats = [
            'total_users'   => User::count(),
            'total_posts'   => Post::count(),
            'active_donors' => User::whereHas('profile', function ($query) {
                $query->where('is_donor', true);
            })->count(),
            'blood_requests' => Post::where('type', 'request')->count(),
        ];

        // Render the dashboard view with stats and recent posts
        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recent_posts' => Post::with('user')
                ->latest()
                ->take(10)
                ->get(),
        ]);
    }

    /**
     * Display a paginated list of users with their profiles.
     *
     * @return \Inertia\Response
     */
    public function users()
    {
        $users = User::with('profile')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    /**
     * Display a paginated list of all posts.
     *
     * @return \Inertia\Response
     */
    public function posts()
    {
        $posts = Post::with('user')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Posts', [
            'posts' => $posts,
        ]);
    }

    /**
     * Delete a specific post.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deletePost(Post $post)
    {
        // Delete the post from the database
        $post->delete();

        // Redirect back with a success message
        return back()->with('success', 'Post deleted successfully');
    }
}
