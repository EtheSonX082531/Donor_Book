<?php
// app/Http/Controllers/ProfileController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user()->load(['profile', 'posts']);
        
        return Inertia::render('Profile/Show', [
            'user' => $user,
            'posts' => $user->posts()->latest()->paginate(10),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'bio' => 'nullable|string|max:500',
            'is_donor' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $request->user()->update([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
        ]);

        $profile = $request->user()->profile;
        
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($profile->image) {
                Storage::disk('public')->delete($profile->image);
            }
            $path = $request->file('image')->store('profiles', 'public');
            $profile->image = $path;
        }

        $profile->update([
            'bio' => $validated['bio'],
            'is_donor' => $validated['is_donor'] ?? true,
            'image' => $profile->image,
        ]);

        return back()->with('success', 'Profile updated successfully');
    }

    public function updateAvailability(Request $request)
    {
        $request->validate([
            'is_donor' => 'required|boolean',
        ]);

        $request->user()->profile()->update([
            'is_donor' => $request->is_donor,
        ]);

        return back()->with('success', 'Availability updated successfully');
    }
}