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

    public function usage()
    {
        return Inertia::render('docs/api/usage', ['section' => 'API', 'page' => 'Usage']);
    }

    public function guideline()
    {
        return Inertia::render('docs/api/guideline', ['section' => 'API', 'page' => 'Guideline']);
    }

    public function apiKey()
    {
        return Inertia::render('docs/api/api-key', ['section' => 'API', 'page' => 'API Key']);
    }

    public function products()
    {
        return Inertia::render('docs/api/products', ['section' => 'API', 'page' => 'Products']);
    }

    public function stocks()
    {
        return Inertia::render('docs/api/stocks', ['section' => 'API', 'page' => 'Stocks']);
    }

    public function accounts()
    {
        return Inertia::render('docs/api/accounts', ['section' => 'API', 'page' => 'Accounts']);
    }

    public function activities()
    {
        return Inertia::render('docs/api/activities', ['section' => 'API', 'page' => 'Activities']);
    }

    public function errors()
    {
        return Inertia::render('docs/api/errors', ['section' => 'API', 'page' => 'Errors']);
    }

    public function pagination()
    {
        return Inertia::render('docs/api/pagination', ['section' => 'API', 'page' => 'Pagination']);
    }

    public function rateLimits()
    {
        return Inertia::render('docs/api/rate-limits', ['section' => 'API', 'page' => 'Rate Limits']);
    }

    public function webhooks()
    {
        return Inertia::render('docs/api/webhooks', ['section' => 'API', 'page' => 'Webhooks']);
    }

    public function changelog()
    {
        return Inertia::render('docs/api/changelog', ['section' => 'API', 'page' => 'Changelog']);
    }
}
