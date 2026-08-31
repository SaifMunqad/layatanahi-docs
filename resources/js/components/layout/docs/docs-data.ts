export type NavItem = {
    label: string;
    slug: string;
    active?: boolean;
    children?: NavItem[];
};

export type NavSectionData = {
    label: string;
    items: NavItem[];
};

export type TocItem = {
    label: string;
    depth: 1 | 2;
    id: string;
};

export const NAV_SECTIONS: NavSectionData[] = [
    {
        label: 'CUSTOMER',
        items: [
            { label: 'Overview', slug: 'customer-overview' },
            { label: 'Customer Portal', slug: 'customer-portal' },
            { label: 'Account Center', slug: 'customer-account-center' },
        ],
    },
    {
        label: 'BUSINESS',
        items: [
            {
                label: 'Purchase',
                slug: 'business-purchase',
                active: true,
                children: [
                    { label: 'Overview', slug: 'purchase-overview' },
                    { label: 'Listing', slug: 'purchase-listing' },
                    { label: 'Demo', slug: 'purchase-demo' },
                ],
            },
            {
                label: 'Inventory',
                slug: 'business-inventory',
                children: [
                    { label: 'Overview', slug: 'inventory-overview' },
                    { label: 'Listing', slug: 'inventory-listing' },
                    { label: 'Demo', slug: 'inventory-demo' },
                ],
            },
            {
                label: 'Sale',
                slug: 'business-sale',
                children: [
                    { label: 'Overview', slug: 'sale-overview' },
                    { label: 'Listing', slug: 'sale-listing' },
                    { label: 'Demo', slug: 'sale-demo' },
                ],
            },
            {
                label: 'Store',
                slug: 'business-store',
                children: [
                    { label: 'Overview', slug: 'store-overview' },
                    { label: 'Listing', slug: 'store-listing' },
                    { label: 'Demo', slug: 'store-demo' },
                ],
            },
            {
                label: 'Public',
                slug: 'business-public',
                children: [
                    { label: 'Overview', slug: 'public-overview' },
                    { label: 'Listing', slug: 'public-listing' },
                    { label: 'Demo', slug: 'public-demo' },
                ],
            },
        ],
    },
    {
        label: 'SUPPORT',
        items: [
            { label: 'Help Center', slug: 'support-help-center' },
            { label: 'Knowledge Base', slug: 'support-knowledge-base' },
            { label: 'Contact Team', slug: 'support-contact-team' },
        ],
    },
    {
        label: 'API',
        items: [
            { label: 'Overview', slug: 'api-overview' },
            { label: 'Authentication', slug: 'api-authentication' },
            { label: 'Reference', slug: 'api-reference' },
        ],
    },
];

export const TOC_ITEMS: TocItem[] = [
    { label: 'Meet Laravel', depth: 1, id: 'meet-laravel' },
    { label: 'Why Laravel?', depth: 2, id: 'why-laravel' },
    { label: 'Creating an application', depth: 1, id: 'creating' },
    { label: 'Installing PHP and the installer', depth: 2, id: 'installing-php' },
    { label: 'Initial configuration', depth: 1, id: 'initial-config' },
    { label: 'Environment based configuration', depth: 2, id: 'env-config' },
    { label: 'Databases and migrations', depth: 2, id: 'db-migrations' },
    { label: 'Next steps', depth: 1, id: 'next-steps' },
];
