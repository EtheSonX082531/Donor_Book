<?php

// app/Http/Controllers/HomeController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/**
 * HomeController
 *
 * Handles public-facing functionality such as:
 * - Viewing and filtering posts
 * - Creating blood requests
 * - Creating donor availability posts
 */
class HomeController extends Controller
{
    /**
     * Display the home page with a list of active posts.
     *
     * Supports filtering by blood group, location, and post type.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Base query: active posts with user and comment relationships
        $query = Post::with(['user', 'comments.user'])
            ->where('is_active', true)
            ->latest();

        // Apply optional blood group filter
        if ($request->has('blood_group')) {
            $query->where('blood_group', $request->blood_group);
        }

        // Apply optional location filter (partial match)
        if ($request->has('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        // Apply optional post type filter (request or donor)
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Paginate results
        $posts = $query->paginate(10);

        // Append "is_liked" flag for the authenticated user
        $posts->getCollection()->transform(function ($post) use ($request) {
            $post->is_liked = $post->likedByUser($request->user()?->id);
            return $post;
        });

        // Render home page with posts and applied filters
        return Inertia::render('Home/Index', [
            'posts' => $posts,
            'filters' => $request->only(['blood_group', 'location', 'type']),
        ]);
    }

    /**
     * Show the form to create a blood request post.
     *
     * @return \Inertia\Response
     */
    public function createRequest()
    {
        return Inertia::render('Home/CreateRequest');
    }

    /**
     * Store a newly created blood request post.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storeRequest(Request $request)
    {
        // Validate request data
        $validated = $request->validate([
            'blood_group'   => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'units_needed'  => 'required|integer|min:1',
            'hospital_name' => 'required|string|max:255',
            'location'      => 'required|string|max:255',
            'urgency'       => 'required|in:low,medium,high,critical',
            'description'   => 'required|string|max:1000',
            'image'         => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        // Handle optional image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        // Create the blood request post
        $request->user()->posts()->create([
            'type'          => 'request',
            'blood_group'   => $validated['blood_group'],
            'units_needed'  => $validated['units_needed'],
            'hospital_name' => $validated['hospital_name'],
            'location'      => $validated['location'],
            'urgency'       => $validated['urgency'],
            'description'   => $validated['description'],
            'image'         => $imagePath,
        ]);

        return redirect()->route('home')
            ->with('success', 'Blood request posted successfully');
    }

    /**
     * Show the form to create a donor availability post.
     *
     * @return \Inertia\Response
     */
    public function createDonorPost()
    {
        return Inertia::render('Home/CreateDonorPost');
    }

    /**
     * Store a newly created donor availability post.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function storeDonorPost(Request $request)
    {
        // Validate donor post data
        $validated = $request->validate([
            'blood_group' => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'location'    => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        // Handle optional image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        // Create the donor availability post
        $request->user()->posts()->create([
            'type'        => 'donor',
            'blood_group' => $validated['blood_group'],
            'location'    => $validated['location'],
            'description' => $validated['description'],
            'image'       => $imagePath,
        ]);

        return redirect()->route('home')
            ->with('success', 'Donor availability posted successfully');
    }
}
