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

    public function purchaseCreate()
    {
        return Inertia::render('docs/business/purchase/create', [
            'section' => 'Business',
            'page' => 'Make Purchase',
        ]);
    }

    public function purchaseShow()
    {
        return Inertia::render('docs/business/purchase/show', [
            'section' => 'Business',
            'page' => 'View Purchase',
        ]);
    }

    public function purchaseStatus()
    {
        return Inertia::render('docs/business/purchase/status', [
            'section' => 'Business',
            'page' => 'Purchase Status',
        ]);
    }

    public function purchaseRequests()
    {
        return Inertia::render('docs/business/purchase/requests', [
            'section' => 'Business',
            'page' => 'Purchase Requests',
        ]);
    }

    public function purchaseFilters()
    {
        return Inertia::render('docs/business/purchase/filters', [
            'section' => 'Business',
            'page' => 'Purchase Filters',
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

    public function inventoryConfigurations()
    {
        return Inertia::render('docs/business/inventory/configurations', [
            'section' => 'Business',
            'page' => 'Inventory Configurations',
        ]);
    }

    public function inventoryTransfers()
    {
        return Inertia::render('docs/business/inventory/transfers', [
            'section' => 'Business',
            'page' => 'Inventory Transfers',
        ]);
    }

    public function inventoryChanges()
    {
        return Inertia::render('docs/business/inventory/changes', [
            'section' => 'Business',
            'page' => 'Inventory Changes',
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

    public function saleCreate()
    {
        return Inertia::render('docs/business/sale/create', [
            'section' => 'Business',
            'page' => 'Make Sale',
        ]);
    }

    public function saleShow()
    {
        return Inertia::render('docs/business/sale/show', [
            'section' => 'Business',
            'page' => 'View Sale',
        ]);
    }

    public function saleStatus()
    {
        return Inertia::render('docs/business/sale/status', [
            'section' => 'Business',
            'page' => 'Sale Status',
        ]);
    }

    public function saleRequests()
    {
        return Inertia::render('docs/business/sale/requests', [
            'section' => 'Business',
            'page' => 'Sale Requests',
        ]);
    }

    public function saleFilters()
    {
        return Inertia::render('docs/business/sale/filters', [
            'section' => 'Business',
            'page' => 'Sale Filters',
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
