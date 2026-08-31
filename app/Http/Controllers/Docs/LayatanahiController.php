<?php

namespace App\Http\Controllers\Docs;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class LayatanahiController extends Controller
{
    public function overview()
    {
        return Inertia::render('docs/layatanahi/overview', [
            'section' => 'Layatanahi',
            'page' => 'Overview',
        ]);
    }

    public function credits()
    {
        return Inertia::render('docs/layatanahi/credits', [
            'section' => 'Layatanahi',
            'page' => 'Credits',
        ]);
    }

    public function team()
    {
        return Inertia::render('docs/layatanahi/team', [
            'section' => 'Layatanahi',
            'page' => 'Team',
        ]);
    }

    public function idea()
    {
        return Inertia::render('docs/layatanahi/idea', [
            'section' => 'Layatanahi',
            'page' => 'Idea',
        ]);
    }

    public function features()
    {
        return Inertia::render('docs/layatanahi/features', [
            'section' => 'Layatanahi',
            'page' => 'Features',
        ]);
    }
}
