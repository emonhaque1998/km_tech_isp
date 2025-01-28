<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\User;

class AddHyperlinkController extends Controller
{
    public function index(string $id)
    {
        return Inertia::render("Hyperlink/Give/GiveHyperlink", [
            "user" => User::find($id),
            "categories" => Category::all()
        ]);
    }
}
