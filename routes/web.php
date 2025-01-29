<?php

use Inertia\Inertia;
use App\Models\Category;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AddUserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\HyperlinkController;
use App\Http\Controllers\Admin\AddCategoryController;
use App\Http\Controllers\Admin\AddHyperlinkController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $hyperlinks = $user->hyperlink;
    $categories = Category::whereHas('hyperlink', function ($query) use ($user) {
        $query->where('user_id', $user->id);
    })->with(['hyperlink' => function ($query) use ($user) {
        $query->where('user_id', $user->id);
    }])->get();

    if ($hyperlinks) {
        $hyperlinks = $hyperlinks->load(['category']);
        $categoryCounts = $hyperlinks->groupBy('category_id')->map->count();
        $hyperlinks->each(function ($hyperlink) use ($categoryCounts) {
            $hyperlink->category_count = $categoryCounts[$hyperlink->category_id] ?? 0;
        });
    }

    return Inertia::render('Dashboard', [
        'categories' => $categories,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware("auth", "verified", CheckRole::class.":admin")->group(function () {
    Route::resource("/hyperlink", HyperlinkController::class)->only(["index", "store"]);
    Route::resource("/users", UserController::class)->only(["index", "show", "destroy"]);
    Route::resource("/categories", CategoryController::class)->only(["index"]);
    Route::resource("/add-category", AddCategoryController::class)->only(["index", "store", "destroy"]);
    Route::resource("/add-user", AddUserController::class)->only(["index", "store"]);
    Route::get("user/{id}/add-hyperlink", [AddHyperlinkController::class, "index"])->name("add-hyperlink.index");
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
});

require __DIR__.'/auth.php';
