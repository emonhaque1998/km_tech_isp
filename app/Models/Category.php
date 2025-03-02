<?php

namespace App\Models;

use App\Models\Hyperlink;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ["name", "slug", "color", "isLive", "ifream", "visibility", "user_id"];

    public function hyperlink()
    {
        return $this->hasMany(Hyperlink::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }   
}
