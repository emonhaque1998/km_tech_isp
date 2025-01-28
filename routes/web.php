<?php

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
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
    return Inertia::render('Dashboard', [
        "categories" => Category::all(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware("auth", "verified")->group(function () {
    Route::resource("/hyperlink", HyperlinkController::class)->only(["index", "store"]);
    Route::resource("/users", UserController::class)->only(["index", "show"]);
    Route::resource("/categories", CategoryController::class)->only(["index"]);
    Route::resource("/add-category", AddCategoryController::class)->only(["index", "store", "destroy"]);
    Route::get("user/{id}/add-hyperlink", [AddHyperlinkController::class, "index"])->name("add-hyperlink.index");
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
