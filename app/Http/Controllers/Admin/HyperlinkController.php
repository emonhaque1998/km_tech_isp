<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Hyperlink;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class HyperlinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hyperlinks = Hyperlink::with(['user', "category"])->paginate(10); // Paginate hyperlinks with 10 per page
        $categoris = Category::where("isLive", "0")->get();

        return Inertia::render("Hyperlink/Hyperlink", [
            "hyperlinks" => $hyperlinks,
            "categories" => $categoris,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'nullable|exists:users,id',
            "alternative" => "required",
            "url" => ["required", "url"],
            "category_id" => "required",
        ]);

        if($request->user_id != null) {
            $request->merge([
                "visibility" => "single"
            ]);
        }
        
        Hyperlink::create($request->all());

        return Redirect::back();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Category::destroy($id);

        return Redirect::route("hyperlink.index");
    }
}
