<?php
// app/Http/Controllers/HomeController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['user', 'comments.user'])
            ->where('is_active', true)
            ->latest();

        if ($request->has('blood_group')) {
            $query->where('blood_group', $request->blood_group);
        }

        if ($request->has('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $posts = $query->paginate(10);

        $posts->getCollection()->transform(function ($post) use ($request) {
            $post->is_liked = $post->likedByUser($request->user()?->id);
            return $post;
        });

        return Inertia::render('Home/Index', [
            'posts' => $posts,
            'filters' => $request->only(['blood_group', 'location', 'type']),
        ]);
    }

    public function createRequest()
    {
        return Inertia::render('Home/CreateRequest');
    }

    public function storeRequest(Request $request)
    {
        $validated = $request->validate([
            'blood_group' => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'units_needed' => 'required|integer|min:1',
            'hospital_name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'urgency' => 'required|in:low,medium,high,critical',
            'description' => 'required|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);
 
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        $post = $request->user()->posts()->create([
            'type' => 'request',
            'blood_group' => $validated['blood_group'],
            'units_needed' => $validated['units_needed'],
            'hospital_name' => $validated['hospital_name'],
            'location' => $validated['location'],
            'urgency' => $validated['urgency'],
            'description' => $validated['description'],
            'image' => $imagePath,
        ]);

        return redirect()->route('home')
            ->with('success', 'Blood request posted successfully');
    }

    public function createDonorPost()
    {
        return Inertia::render('Home/CreateDonorPost');
    }

    public function storeDonorPost(Request $request)
    {
        $validated = $request->validate([
            'blood_group' => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'location' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }
 
        $post = $request->user()->posts()->create([
            'type' => 'donor',
            'blood_group' => $validated['blood_group'],
            'location' => $validated['location'],
            'description' => $validated['description'],
            'image' => $imagePath,
        ]);

        return redirect()->route('home')
            ->with('success', 'Donor availability posted successfully');
    }
}