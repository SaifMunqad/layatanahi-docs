<?php

use App\Http\Controllers\Docs\ApiController;
use App\Http\Controllers\Docs\BusinessController;
use App\Http\Controllers\Docs\LayatanahiController;
use App\Http\Controllers\Docs\LegalController;
use App\Http\Controllers\Docs\SupportController;
use App\Http\Controllers\Docs\UserController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\SaleController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'docs/home')->name('home');

Route::prefix('user')->name('user.')->group(function () {
    Route::get('/overview', [UserController::class, 'overview'])->name('overview');
    Route::get('/purchase', [UserController::class, 'purchase'])->name('purchase');
    Route::get('/ai', [UserController::class, 'ai'])->name('ai');
    Route::get('/profile', [UserController::class, 'profile'])->name('profile');
});

Route::prefix('business')->name('business.')->group(function () {
    Route::prefix('purchase')->name('purchase.')->group(function () {
        Route::get('/overview', [BusinessController::class, 'purchaseOverview'])->name('overview');
        Route::get('/listing', [BusinessController::class, 'purchaseListing'])->name('listing');
        Route::get('/demo', [BusinessController::class, 'purchaseDemo'])->name('demo');
        Route::get('/create', [BusinessController::class, 'purchaseCreate'])->name('create');
        Route::get('/show', [BusinessController::class, 'purchaseShow'])->name('show');
        Route::get('/status', [BusinessController::class, 'purchaseStatus'])->name('status');
        Route::get('/requests', [BusinessController::class, 'purchaseRequests'])->name('requests');
        Route::get('/filters', [BusinessController::class, 'purchaseFilters'])->name('filters');
    });

    Route::prefix('inventory')->name('inventory.')->group(function () {
        Route::get('/overview', [BusinessController::class, 'inventoryOverview'])->name('overview');
        Route::get('/listing', [BusinessController::class, 'inventoryListing'])->name('listing');
        Route::get('/configurations', [BusinessController::class, 'inventoryConfigurations'])->name('configurations');
        Route::get('/transfers', [BusinessController::class, 'inventoryTransfers'])->name('transfers');
        Route::get('/changes', [BusinessController::class, 'inventoryChanges'])->name('changes');
    });

    Route::prefix('sale')->name('sale.')->group(function () {
        Route::get('/overview', [BusinessController::class, 'saleOverview'])->name('overview');
        Route::get('/listing', [BusinessController::class, 'saleListing'])->name('listing');
        Route::get('/demo', [BusinessController::class, 'saleDemo'])->name('demo');
        Route::get('/create', [BusinessController::class, 'saleCreate'])->name('create');
        Route::get('/show', [BusinessController::class, 'saleShow'])->name('show');
        Route::get('/status', [BusinessController::class, 'saleStatus'])->name('status');
        Route::get('/requests', [BusinessController::class, 'saleRequests'])->name('requests');
        Route::get('/filters', [BusinessController::class, 'saleFilters'])->name('filters');
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

Route::prefix('layatanahi')->name('layatanahi.')->group(function () {
    Route::get('/overview', [LayatanahiController::class, 'overview'])->name('overview');
    Route::get('/introduction', [LayatanahiController::class, 'introduction'])->name('introduction');
    Route::get('/credits', [LayatanahiController::class, 'credits'])->name('credits');
    Route::get('/team', [LayatanahiController::class, 'team'])->name('team');
    Route::get('/idea', [LayatanahiController::class, 'idea'])->name('idea');
    Route::get('/features', [LayatanahiController::class, 'features'])->name('features');
});

Route::prefix('legal')->name('legal.')->group(function () {
    Route::get('/privacy-policy', [LegalController::class, 'privacyPolicy'])->name('privacy-policy');
    Route::get('/terms-of-service', [LegalController::class, 'termsOfService'])->name('terms-of-service');
    Route::get('/return-policy', [LegalController::class, 'returnPolicy'])->name('return-policy');
});

Route::prefix('api')->name('api.')->group(function () {
    Route::get('/overview', [ApiController::class, 'overview'])->name('overview');
    Route::get('/authentication', [ApiController::class, 'authentication'])->name('authentication');
    Route::get('/reference', [ApiController::class, 'reference'])->name('reference');
});

Route::middleware([])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Purchase routes
    Route::prefix('purchase')->name('purchase.')->group(function () {
        Route::get('/list', [PurchaseController::class, 'index'])->name('list');
        Route::get('/create', [PurchaseController::class, 'create'])->name('create');
        Route::get('/{id}', [PurchaseController::class, 'show'])->name('show');
        Route::get('/status', [PurchaseController::class, 'status'])->name('status');
        Route::get('/requests', [PurchaseController::class, 'requests'])->name('requests');
        Route::get('/filters', [PurchaseController::class, 'filters'])->name('filters');
    });

    // Sale routes
    Route::prefix('sale')->name('sale.')->group(function () {
        Route::get('/list', [SaleController::class, 'index'])->name('list');
        Route::get('/create', [SaleController::class, 'create'])->name('create');
        Route::get('/{id}', [SaleController::class, 'show'])->name('show');
        Route::get('/status', [SaleController::class, 'status'])->name('status');
        Route::get('/requests', [SaleController::class, 'requests'])->name('requests');
        Route::get('/filters', [SaleController::class, 'filters'])->name('filters');
    });
});

require __DIR__.'/settings.php';
