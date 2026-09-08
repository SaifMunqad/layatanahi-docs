<?php

namespace App\Http\Controllers\Docs;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class UserController extends Controller
{
    public function overview()
    {
        return Inertia::render('docs/user/overview', [
            'section' => 'User',
            'page' => 'Overview',
        ]);
    }

    public function purchase()
    {
        return Inertia::render('docs/user/purchase', [
            'section' => 'User',
            'page' => 'Purchase',
        ]);
    }

    public function ai()
    {
        return Inertia::render('docs/user/ai', [
            'section' => 'User',
            'page' => 'AI',
        ]);
    }

    public function profile()
    {
        return Inertia::render('docs/user/profile', [
            'section' => 'User',
            'page' => 'Profile',
        ]);
    }
}
