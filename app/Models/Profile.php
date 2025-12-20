<?php

// app/Models/Profile.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Profile Model
 *
 * This model stores additional user information
 * related to blood donation and personal details.
 */
class Profile extends Model
{
    // Enables factory support for testing and seeding
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * These fields can be filled using Profile::create([...])
     */
    protected $fillable = [
        'user_id',             // ID of the user this profile belongs to
        'blood_group',         // User's blood group (e.g., A+, O-)
        'location',            // User's city or area
        'is_donor',            // Indicates if the user is an active donor
        'bio',                 // Short biography or additional info
        'image',               // Profile image path or URL
        'last_donation_date',  // Date of the user's last blood donation
    ];

    /**
     * Attribute casting.
     *
     * Automatically converts:
     * - is_donor to boolean
     * - last_donation_date to a Carbon date instance
     */
    protected $casts = [
        'is_donor' => 'boolean',
        'last_donation_date' => 'date',
    ];

    /**
     * Get the user that owns the profile.
     *
     * Relationship: Profile belongs to a User
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
