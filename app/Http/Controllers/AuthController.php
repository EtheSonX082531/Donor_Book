<?php

// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

/**
 * AuthController
 *
 * Handles user authentication actions such as
 * registration, login, and logout.
 */
class AuthController extends Controller
{
    /**
     * Show the login page.
     *
     * @return \Inertia\Response
     */
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Show the registration page.
     *
     * @return \Inertia\Response
     */
    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle user registration.
     *
     * Creates a new user and associated profile,
     * then logs the user in automatically.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function register(Request $request)
    {
        // Validate incoming registration data
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'email'        => 'required|string|email|max:255|unique:users',
            'phone'        => 'required|string|max:20',
            'password'     => 'required|string|min:8|confirmed',
            'blood_group'  => 'required|in:A+,A-,B+,B-,AB+,AB-,O+,O-',
            'location'     => 'required|string|max:255',
        ]);

        // Create the user account
        $user = User::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'phone'    => $validated['phone'],
            'password' => Hash::make($validated['password']),
            'role'     => 'user',
        ]);

        // Create the user's profile via relationship
        // This ensures foreign keys and model events are handled correctly
        $user->profile()->create([
            'blood_group' => $validated['blood_group'],
            'location'    => $validated['location'],
            'is_donor'    => true, // Default new users as donors
        ]);

        // Log the user in after successful registration
        Auth::login($user);

        return redirect()->route('home');
    }

    /**
     * Handle user login.
     *
     * Validates credentials and starts an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(Request $request)
    {
        // Validate login credentials manually
        $validator = Validator::make($request->all(), [
            'email'    => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Redirect back if validation fails
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Extract credentials from request
        $credentials = $request->only('email', 'password');

        // Attempt authentication
        if (Auth::attempt($credentials, $request->remember)) {
            // Prevent session fixation attacks
            $request->session()->regenerate();

            return redirect()->route('home');
        }

        // Authentication failed
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    /**
     * Log the user out and destroy the session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        // Log out the authenticated user
        Auth::logout();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate CSRF token for security
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
