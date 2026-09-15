import React from 'react';
import { Head } from '@inertiajs/react';

export default function PurchaseIndex() {
    return (
        <>
            <Head title="Purchase List" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Purchase List</h1>
                <p className="mt-2 text-sm text-muted-foreground">Showing purchases (list view).</p>
            </div>
        </>
    );
}
