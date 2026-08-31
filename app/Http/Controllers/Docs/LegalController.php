<?php

namespace App\Http\Controllers\Docs;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class LegalController extends Controller
{
    public function privacyPolicy()
    {
        return Inertia::render('docs/legal/privacy-policy', [
            'section' => 'Legal',
            'page' => 'Privacy Policy',
        ]);
    }

    public function termsOfService()
    {
        return Inertia::render('docs/legal/terms-of-service', [
            'section' => 'Legal',
            'page' => 'Terms of Service',
        ]);
    }

    public function returnPolicy()
    {
        return Inertia::render('docs/legal/return-policy', [
            'section' => 'Legal',
            'page' => 'Return Policy',
        ]);
    }
}
