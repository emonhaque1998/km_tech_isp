<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Hyperlink;
use Illuminate\Support\Facades\Redirect;
use App\Models\User;

class HyperlinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $hyperlinks = Hyperlink::with(['user', "category"])->get();
        
        return Inertia::render("Hyperlink/Hyperlink", [
            "hyperlinks" => $hyperlinks,
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
            "user_id" => "required",
            "url" => ["required", "url"],
            "category_id" => "required",
        ]);

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
        //
    }
}
