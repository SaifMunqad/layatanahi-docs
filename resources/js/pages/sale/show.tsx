import React from 'react';
import { Head } from '@inertiajs/react';

export default function SaleShow({ id }: { id?: string }) {
    return (
        <>
            <Head title={`View Sale ${id ?? ''}`} />
            <div className="p-6">
                <h1 className="text-2xl font-semibold">View Sale {id}</h1>
            </div>
        </>
    );
}
