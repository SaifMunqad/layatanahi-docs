<?php

namespace App\Http\Controllers\Docs;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function helpCenter()
    {
        return Inertia::render('docs/support/help-center', [
            'section' => 'Support',
            'page' => 'Help Center',
        ]);
    }

    public function knowledgeBase()
    {
        return Inertia::render('docs/support/knowledge-base', [
            'section' => 'Support',
            'page' => 'Knowledge Base',
        ]);
    }

    public function contactTeam()
    {
        return Inertia::render('docs/support/contact-team', [
            'section' => 'Support',
            'page' => 'Contact Team',
        ]);
    }
}
