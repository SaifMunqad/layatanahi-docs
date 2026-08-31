<?php

use App\Http\Controllers\Docs\ApiController;
use App\Http\Controllers\Docs\BusinessController;
use App\Http\Controllers\Docs\CustomerController;
use App\Http\Controllers\Docs\SupportController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'docs/home')->name('home');

Route::prefix('customer')->name('customer.')->group(function () {
    Route::get('/overview', [CustomerController::class, 'overview'])->name('overview');
    Route::get('/portal', [CustomerController::class, 'portal'])->name('portal');
    Route::get('/account-center', [CustomerController::class, 'accountCenter'])->name('account-center');
});

Route::prefix('business')->name('business.')->group(function () {
    Route::prefix('purchase')->name('purchase.')->group(function () {
        Route::get('/overview', [BusinessController::class, 'purchaseOverview'])->name('overview');
        Route::get('/listing', [BusinessController::class, 'purchaseListing'])->name('listing');
        Route::get('/demo', [BusinessController::class, 'purchaseDemo'])->name('demo');
    });

    Route::prefix('inventory')->name('inventory.')->group(function () {
        Route::get('/overview', [BusinessController::class, 'inventoryOverview'])->name('overview');
        Route::get('/listing', [BusinessController::class, 'inventoryListing'])->name('listing');
        Route::get('/demo', [BusinessController::class, 'inventoryDemo'])->name('demo');
    });

    Route::prefix('sale')->name('sale.')->group(function () {
        Route::get('/overview', [BusinessController::class, 'saleOverview'])->name('overview');
        Route::get('/listing', [BusinessController::class, 'saleListing'])->name('listing');
        Route::get('/demo', [BusinessController::class, 'saleDemo'])->name('demo');
    });

    Route::prefix('store')->name('store.')->group(function () {
        Route::get('/overview', [BusinessController::class, 'storeOverview'])->name('overview');
        Route::get('/listing', [BusinessController::class, 'storeListing'])->name('listing');
        Route::get('/demo', [BusinessController::class, 'storeDemo'])->name('demo');
    });

    Route::prefix('public')->name('public.')->group(function () {
        Route::get('/overview', [BusinessController::class, 'publicOverview'])->name('overview');
        Route::get('/listing', [BusinessController::class, 'publicListing'])->name('listing');
        Route::get('/demo', [BusinessController::class, 'publicDemo'])->name('demo');
    });
});

Route::prefix('support')->name('support.')->group(function () {
    Route::get('/help-center', [SupportController::class, 'helpCenter'])->name('help-center');
    Route::get('/knowledge-base', [SupportController::class, 'knowledgeBase'])->name('knowledge-base');
    Route::get('/contact-team', [SupportController::class, 'contactTeam'])->name('contact-team');
});

Route::prefix('api')->name('api.')->group(function () {
    Route::get('/overview', [ApiController::class, 'overview'])->name('overview');
    Route::get('/authentication', [ApiController::class, 'authentication'])->name('authentication');
    Route::get('/reference', [ApiController::class, 'reference'])->name('reference');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
