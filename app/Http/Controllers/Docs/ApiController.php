<?php

namespace App\Http\Controllers\Docs;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ApiController extends Controller
{
    public function overview()
    {
        return Inertia::render('docs/api/overview', [
            'section' => 'API',
            'page' => 'Overview',
        ]);
    }

    public function authentication()
    {
        return Inertia::render('docs/api/authentication', [
            'section' => 'API',
            'page' => 'Authentication',
        ]);
    }

    public function reference()
    {
        return Inertia::render('docs/api/reference', [
            'section' => 'API',
            'page' => 'Reference',
        ]);
    }
}
