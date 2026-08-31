<?php

namespace App\Http\Controllers\Docs;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function overview()
    {
        return Inertia::render('docs/customer/overview', [
            'section' => 'Customer',
            'page' => 'Overview',
        ]);
    }

    public function portal()
    {
        return Inertia::render('docs/customer/portal', [
            'section' => 'Customer',
            'page' => 'Portal',
        ]);
    }

    public function accountCenter()
    {
        return Inertia::render('docs/customer/account-center', [
            'section' => 'Customer',
            'page' => 'Account Center',
        ]);
    }
}
