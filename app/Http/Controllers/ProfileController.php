<?php

// app/Http/Controllers/ProfileController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

/**
 * ProfileController
 *
 * Handles viewing and updating the authenticated user's profile,
 * including personal details and donor availability.
 */
class ProfileController extends Controller
{
    /**
     * Display the authenticated user's profile.
     *
     * Loads profile details and paginated posts created by the user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function show(Request $request)
    {
        // Load user with related profile and posts
        $user = $request->user()->load(['profile', 'posts']);

        return Inertia::render('Profile/Show', [
            'user'  => $user,
            'posts' => $user->posts()->latest()->paginate(10),
        ]);
    }

    /**
     * Update the authenticated user's profile information.
     *
     * Handles basic user info, profile details, and profile image upload.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        // Validate incoming profile update data
        $validated = $request->validate([
            'name'     => 'required|string|max:255',
            'phone'    => 'required|string|max:20',
            'bio'      => 'nullable|string|max:500',
            'is_donor' => 'boolean',
            'image'    => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Update basic user information
        $request->user()->update([
            'name'  => $validated['name'],
            'phone' => $validated['phone'],
        ]);

        // Retrieve the user's profile
        $profile = $request->user()->profile;

        // Handle optional profile image upload
        if ($request->hasFile('image')) {
            // Delete old image if it exists
            if ($profile->image) {
                Storage::disk('public')->delete($profile->image);
            }

            // Store new image
            $profile->image = $request->file('image')->store('profiles', 'public');
        }

        // Update profile details
        $profile->update([
            'bio'      => $validated['bio'],
            'is_donor' => $validated['is_donor'] ?? true,
            'image'    => $profile->image,
        ]);

        return back()->with('success', 'Profile updated successfully');
    }

    /**
     * Update donor availability status.
     *
     * Allows users to quickly toggle their donor status.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateAvailability(Request $request)
    {
        // Validate availability input
        $request->validate([
            'is_donor' => 'required|boolean',
        ]);

        // Update donor availability
        $request->user()->profile()->update([
            'is_donor' => $request->is_donor,
        ]);

        return back()->with('success', 'Availability updated successfully');
    }
}
