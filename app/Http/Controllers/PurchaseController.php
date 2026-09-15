<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    public function index()
    {
        return Inertia::render('purchase/index', [
            'section' => 'Purchase',
            'page' => 'Purchase List',
        ]);
    }

    public function create()
    {
        return Inertia::render('purchase/create', [
            'section' => 'Purchase',
            'page' => 'Make Purchase',
        ]);
    }

    public function show($id)
    {
        return Inertia::render('purchase/show', [
            'section' => 'Purchase',
            'page' => 'View Purchase',
            'id' => $id,
        ]);
    }

    public function status()
    {
        return Inertia::render('purchase/status', [
            'section' => 'Purchase',
            'page' => 'Purchase Status',
        ]);
    }

    public function requests()
    {
        return Inertia::render('purchase/requests', [
            'section' => 'Purchase',
            'page' => 'Purchase Requests',
        ]);
    }

    public function filters()
    {
        return Inertia::render('purchase/filters', [
            'section' => 'Purchase',
            'page' => 'Purchase Filters',
        ]);
    }
}
