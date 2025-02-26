<?php

namespace App\Models;

use App\Models\Hyperlink;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ["name", "slug", "color", "isLive", "ifream"];

    public function hyperlink()
    {
        return $this->hasMany(Hyperlink::class);
    }
}
