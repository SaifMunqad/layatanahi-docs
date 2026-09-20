<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DocSection extends Model
{
    protected $fillable = ['title', 'slug', 'sort_order', 'published'];

    protected function casts(): array
    {
        return ['published' => 'boolean'];
    }

    public function pages(): HasMany
    {
        return $this->hasMany(DocPage::class, 'section_id');
    }
}
