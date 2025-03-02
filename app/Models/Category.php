<?php

namespace App\Models;

use App\Models\Hyperlink;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;
    
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
