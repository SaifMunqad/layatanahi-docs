import React from 'react';
import { Head } from '@inertiajs/react';

export default function SaleIndex() {
    return (
        <>
            <Head title="Sale List" />
            <div className="p-6">
                <h1 className="text-2xl font-semibold">Sale List</h1>
                <p className="mt-2 text-sm text-muted-foreground">Showing sales (list view).</p>
            </div>
        </>
    );
}
