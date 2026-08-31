export type NavItem = {
    label: string;
    slug: string;
    path: string;
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

const sectionBase = (segment: string, rest = '') => `/${segment}${rest ? `/${rest}` : ''}`;

export const NAV_SECTIONS: NavSectionData[] = [
    {
        label: 'CUSTOMER',
        items: [
            { label: 'Overview', slug: 'customer-overview', path: sectionBase('customer', 'overview') },
            { label: 'Customer Portal', slug: 'customer-portal', path: sectionBase('customer', 'portal') },
            { label: 'Account Center', slug: 'customer-account-center', path: sectionBase('customer', 'account-center') },
        ],
    },
    {
        label: 'BUSINESS',
        items: [
            {
                label: 'Purchase',
                slug: 'business-purchase',
                path: sectionBase('business', 'purchase'),
                active: true,
                children: [
                    { label: 'Overview', slug: 'purchase-overview', path: sectionBase('business', 'purchase/overview') },
                    { label: 'Listing', slug: 'purchase-listing', path: sectionBase('business', 'purchase/listing') },
                    { label: 'Demo', slug: 'purchase-demo', path: sectionBase('business', 'purchase/demo') },
                ],
            },
            {
                label: 'Inventory',
                slug: 'business-inventory',
                path: sectionBase('business', 'inventory'),
                children: [
                    { label: 'Overview', slug: 'inventory-overview', path: sectionBase('business', 'inventory/overview') },
                    { label: 'Listing', slug: 'inventory-listing', path: sectionBase('business', 'inventory/listing') },
                    { label: 'Demo', slug: 'inventory-demo', path: sectionBase('business', 'inventory/demo') },
                ],
            },
            {
                label: 'Sale',
                slug: 'business-sale',
                path: sectionBase('business', 'sale'),
                children: [
                    { label: 'Overview', slug: 'sale-overview', path: sectionBase('business', 'sale/overview') },
                    { label: 'Listing', slug: 'sale-listing', path: sectionBase('business', 'sale/listing') },
                    { label: 'Demo', slug: 'sale-demo', path: sectionBase('business', 'sale/demo') },
                ],
            },
            {
                label: 'Store',
                slug: 'business-store',
                path: sectionBase('business', 'store'),
                children: [
                    { label: 'Overview', slug: 'store-overview', path: sectionBase('business', 'store/overview') },
                    { label: 'Listing', slug: 'store-listing', path: sectionBase('business', 'store/listing') },
                    { label: 'Demo', slug: 'store-demo', path: sectionBase('business', 'store/demo') },
                ],
            },
            {
                label: 'Public',
                slug: 'business-public',
                path: sectionBase('business', 'public'),
                children: [
                    { label: 'Overview', slug: 'public-overview', path: sectionBase('business', 'public/overview') },
                    { label: 'Listing', slug: 'public-listing', path: sectionBase('business', 'public/listing') },
                    { label: 'Demo', slug: 'public-demo', path: sectionBase('business', 'public/demo') },
                ],
            },
        ],
    },
    {
        label: 'SUPPORT',
        items: [
            { label: 'Help Center', slug: 'support-help-center', path: sectionBase('support', 'help-center') },
            { label: 'Knowledge Base', slug: 'support-knowledge-base', path: sectionBase('support', 'knowledge-base') },
            { label: 'Contact Team', slug: 'support-contact-team', path: sectionBase('support', 'contact-team') },
        ],
    },
    {
        label: 'API',
        items: [
            { label: 'Overview', slug: 'api-overview', path: sectionBase('api', 'overview') },
            { label: 'Authentication', slug: 'api-authentication', path: sectionBase('api', 'authentication') },
            { label: 'Reference', slug: 'api-reference', path: sectionBase('api', 'reference') },
        ],
    },
];

export function findActiveNavBranch(pathname: string) {
    const normalized = pathname.replace(/\/+$/, '') || '/';

    for (const section of NAV_SECTIONS) {
        for (const item of section.items) {
            if (isNavItemActive(item, normalized)) {
                return { sectionLabel: section.label, itemPath: item.path };
            }
        }
    }

    return { sectionLabel: null, itemPath: null };
}

export function isNavItemActive(item: NavItem, pathname: string): boolean {
    if (item.path === pathname) {
        return true;
    }

    return Boolean(item.children?.some((child) => isNavItemActive(child, pathname)));
}

export const TOC_ITEMS: TocItem[] = [
    { label: 'Overview', depth: 1, id: 'overview' },
    { label: 'Highlights', depth: 2, id: 'highlights' },
    { label: 'Configuration', depth: 1, id: 'configuration' },
    { label: 'Flows', depth: 2, id: 'flows' },
    { label: 'Demo', depth: 1, id: 'demo' },
    { label: 'Next steps', depth: 2, id: 'next-steps' },
];
