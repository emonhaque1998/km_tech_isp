<?php

namespace App\Http\Controllers\Admin;

use App\Models\ViewWebsite;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ViewWebsiteController extends Controller
{
    public function setColumeMax(Request $request)
    {
        $request->validate([
            "col_number" => "required|integer"
        ]);

        $viewWebsite = ViewWebsite::first();
        if ($viewWebsite) {
            $viewWebsite->update($request->all());
        } else {
            ViewWebsite::create($request->all());
        }

        return redirect()->route("dashboard");
    }
}
