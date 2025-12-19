<?php
// app/Models/Profile.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'blood_group',
        'location',
        'is_donor',
        'bio',
        'image',
        'last_donation_date',
    ];

    protected $casts = [
        'is_donor' => 'boolean',
        'last_donation_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}