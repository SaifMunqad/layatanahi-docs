<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SaleController extends Controller
{
    public function index()
    {
        return Inertia::render('sale/index', [
            'section' => 'Sale',
            'page' => 'Sale List',
        ]);
    }

    public function create()
    {
        return Inertia::render('sale/create', [
            'section' => 'Sale',
            'page' => 'Make Sale',
        ]);
    }

    public function show($id)
    {
        return Inertia::render('sale/show', [
            'section' => 'Sale',
            'page' => 'View Sale',
            'id' => $id,
        ]);
    }

    public function status()
    {
        return Inertia::render('sale/status', [
            'section' => 'Sale',
            'page' => 'Sale Status',
        ]);
    }

    public function requests()
    {
        return Inertia::render('sale/requests', [
            'section' => 'Sale',
            'page' => 'Sale Requests',
        ]);
    }

    public function filters()
    {
        return Inertia::render('sale/filters', [
            'section' => 'Sale',
            'page' => 'Sale Filters',
        ]);
    }
}
