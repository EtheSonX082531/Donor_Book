<?php
// routes/web.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', function () {
    return Inertia::render('Home/Landing');
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
});

// Protected routes
Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    
    // Dashboard route (redirects to home)
    Route::get('/dashboard', function () {
        return redirect('/home');
    })->name('dashboard');
    
    // Home routes
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/posts/create/request', [HomeController::class, 'createRequest'])->name('posts.create.request');
    Route::post('/posts/create/request', [HomeController::class, 'storeRequest']);
    Route::get('/posts/create/donor', [HomeController::class, 'createDonorPost'])->name('posts.create.donor');
    Route::post('/posts/create/donor', [HomeController::class, 'storeDonorPost']);
    
    // Profile routes
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/availability', [ProfileController::class, 'updateAvailability']);
    
    // Post interactions (Likes & Comments)
    Route::post('/posts/{post}/like', [LikeController::class, 'toggle'])->name('posts.like');
    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
    
    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('/', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
        Route::get('/posts', [AdminController::class, 'posts'])->name('admin.posts');
        Route::delete('/posts/{post}', [AdminController::class, 'deletePost'])->name('admin.posts.delete');
    });
});