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
use App\Models\Hyperlink;

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
    $allHyperlinks = $user->hyperlink;
    $hyperlinks = Hyperlink::where("user_id", $user->id)->paginate(10);
    
    $categories = Category::where(function ($query) use ($user) {
        $query->whereHas('hyperlink', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->orWhere('isLive', "1");
    })->with(['hyperlink' => function ($query) use ($user) {
        $query->where('user_id', $user->id);
    }])->get(); // Added pagination

    if ($allHyperlinks) {
        $allHyperlinks = $allHyperlinks->load(['category']);
        $categoryCounts = $allHyperlinks->groupBy('category_id')->map->count();
        $allHyperlinks->each(function ($hyperlink) use ($categoryCounts) {
            $hyperlink->category_count = $categoryCounts[$hyperlink->category_id] ?? 0;
        });
    }

    return Inertia::render('Dashboard', [
        'categories' => $categories,
        "hyperlinks" => $hyperlinks
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware("auth", "verified", CheckRole::class.":admin")->group(function () {
    Route::resource("/hyperlink", HyperlinkController::class)->only(["index", "store"]);
    Route::resource("/users", UserController::class)->only(["index", "show", "destroy"]);
    Route::resource("/categories", CategoryController::class)->only(["index", "show", "update"]);
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
