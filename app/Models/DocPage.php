<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DocPage extends Model
{
    protected $fillable = ['section_id', 'title', 'slug', 'content', 'sort_order', 'published'];

    protected function casts(): array
    {
        return ['published' => 'boolean'];
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(DocSection::class, 'section_id');
    }
}
