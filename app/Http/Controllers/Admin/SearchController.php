<?php

namespace App\Http\Controllers\Admin;

use App\Models\Hyperlink;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class SearchController extends Controller
{
    public function searchHyperlinksForDashboard(Request $request){
        $user = Auth::user();

        $hyperlinks = Hyperlink::query()
            ->where('visibility', 'global')
            ->orWhere("user_id", $user->id)
            ->when(request('search'), function ($query) {
                // Assuming you want to search in the 'title' and 'description' columns
                $query->where(function ($subQuery) {
                    $subQuery->where('alternative', 'like', '%' . request('search') . '%');
                });
            })
            ->with("category")
            ->paginate(10);
        
            return Redirect::route('dashboard', [
                "hyperlinks" => $hyperlinks
            ]);
    }
}
