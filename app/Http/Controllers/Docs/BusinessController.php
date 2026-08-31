<?php

namespace App\Http\Controllers\Docs;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class BusinessController extends Controller
{
    public function purchaseOverview()
    {
        return Inertia::render('docs/business/purchase/overview', [
            'section' => 'Business',
            'page' => 'Purchase Overview',
        ]);
    }

    public function purchaseListing()
    {
        return Inertia::render('docs/business/purchase/listing', [
            'section' => 'Business',
            'page' => 'Purchase Listing',
        ]);
    }

    public function purchaseDemo()
    {
        return Inertia::render('docs/business/purchase/demo', [
            'section' => 'Business',
            'page' => 'Purchase Demo',
        ]);
    }

    public function inventoryOverview()
    {
        return Inertia::render('docs/business/inventory/overview', [
            'section' => 'Business',
            'page' => 'Inventory Overview',
        ]);
    }

    public function inventoryListing()
    {
        return Inertia::render('docs/business/inventory/listing', [
            'section' => 'Business',
            'page' => 'Inventory Listing',
        ]);
    }

    public function inventoryDemo()
    {
        return Inertia::render('docs/business/inventory/demo', [
            'section' => 'Business',
            'page' => 'Inventory Demo',
        ]);
    }

    public function saleOverview()
    {
        return Inertia::render('docs/business/sale/overview', [
            'section' => 'Business',
            'page' => 'Sale Overview',
        ]);
    }

    public function saleListing()
    {
        return Inertia::render('docs/business/sale/listing', [
            'section' => 'Business',
            'page' => 'Sale Listing',
        ]);
    }

    public function saleDemo()
    {
        return Inertia::render('docs/business/sale/demo', [
            'section' => 'Business',
            'page' => 'Sale Demo',
        ]);
    }

    public function storeOverview()
    {
        return Inertia::render('docs/business/store/overview', [
            'section' => 'Business',
            'page' => 'Store Overview',
        ]);
    }

    public function storeListing()
    {
        return Inertia::render('docs/business/store/listing', [
            'section' => 'Business',
            'page' => 'Store Listing',
        ]);
    }

    public function storeDemo()
    {
        return Inertia::render('docs/business/store/demo', [
            'section' => 'Business',
            'page' => 'Store Demo',
        ]);
    }

    public function publicOverview()
    {
        return Inertia::render('docs/business/public/overview', [
            'section' => 'Business',
            'page' => 'Public Overview',
        ]);
    }

    public function publicListing()
    {
        return Inertia::render('docs/business/public/listing', [
            'section' => 'Business',
            'page' => 'Public Listing',
        ]);
    }

    public function publicDemo()
    {
        return Inertia::render('docs/business/public/demo', [
            'section' => 'Business',
            'page' => 'Public Demo',
        ]);
    }
}
