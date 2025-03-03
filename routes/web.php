<?php

use Inertia\Inertia;
use App\Models\Category;
use App\Models\Hyperlink;
use App\Models\ViewWebsite;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AddUserController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\HyperlinkController;
use App\Http\Controllers\Admin\AddCategoryController;
use App\Http\Controllers\Admin\ViewWebsiteController;
use App\Http\Controllers\Admin\AddHyperlinkController;
use App\Http\Controllers\Admin\SearchController;
use Illuminate\Support\Facades\Artisan;

Route::get("/", function () {
    return Redirect::route("login");
})->name("welcome");

Route::get('/dashboard', function () {
    $user = Auth::user();
    $allHyperlinks = $user->hyperlink;
    $hyperlinks = Hyperlink::where('visibility', 'global')->orWhere("user_id", $user->id)->with("category")->paginate(10);
    $hyperlinkCount = Hyperlink::where("user_id", $user->id)->orWhere("visibility", "global")->count();

    
 
    $categories = Category::where(function ($query) use ($user) {
        $query->whereHas('hyperlink', function ($query) use ($user) {
            $query->where('user_id', $user->id);
            $query->orWhere("visibility", "global");
        })
        ->orWhere('isLive', "1") // Include categories with isLive = "1"
        ->where('visibility', 'single')
        ->whereHas('user', function ($query) use ($user) {
            $query->where('id', $user->id);
        })
        ->orWhere('visibility', 'global');
    })
    ->where(function ($query) use ($user) {
        $query->whereHas('hyperlink', function ($query) use ($user) {
            $query->where('user_id', $user->id)
                  ->orWhere("visibility", "global");
        })
        ->orWhere('isLive', "1"); // Ensure categories with isLive = "1" are included
    })
    ->with(['hyperlink' => function ($query) use ($user) {
        $query->where('user_id', $user->id);
        $query->orWhere("visibility", "global");
    }])
    ->get();
 

    if ($allHyperlinks) {
        $allHyperlinks = $allHyperlinks->load(['category']);
        $categoryCounts = $allHyperlinks->groupBy('category_id')->map->count();
        $allHyperlinks->each(function ($hyperlink) use ($categoryCounts) {
            $hyperlink->category_count = $categoryCounts[$hyperlink->category_id] ?? 0;
        });
    }

    return Inertia::render('Dashboard', [
        'categories' => $categories,
        "hyperlinks" => $hyperlinks,
        "hyperlinksCount" => $hyperlinkCount,
        "website" => ViewWebsite::first()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware("auth", "verified", CheckRole::class.":admin")->group(function () {
    Route::resource("/hyperlink", HyperlinkController::class)->only(["index", "store"]);
    Route::resource("/users", UserController::class)->only(["index", "show", "destroy"]);
    Route::resource("/categories", CategoryController::class)->only(["index", "show", "update"]);
    Route::resource("/add-category", AddCategoryController::class)->only(["index", "store", "destroy"]);
    Route::resource("/add-user", AddUserController::class)->only(["index", "store"]);
    Route::get("user/{id}/add-hyperlink", [AddHyperlinkController::class, "index"])->name("add-hyperlink.index");
    Route::post("/website", [ViewWebsiteController::class, "setColumeMax"])->name("add-website-colume.store");
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post("/search-post", [SearchController::class, "searchHyperlinksForDashboard"])->name("search-dashboard.search");
    
});


Route::get('/create-symlink', function () {
    Artisan::call('storage:link');
    return response()->json(['message' => 'Symbolic link created successfully']);
});

require __DIR__.'/auth.php';
