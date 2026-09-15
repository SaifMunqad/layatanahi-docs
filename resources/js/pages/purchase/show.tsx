import React from 'react';
import { Head } from '@inertiajs/react';

export default function PurchaseShow({ id }: { id?: string }) {
    return (
        <>
            <Head title={`View Purchase ${id ?? ''}`} />
            <div className="p-6">
                <h1 className="text-2xl font-semibold">View Purchase {id}</h1>
            </div>
        </>
    );
}
