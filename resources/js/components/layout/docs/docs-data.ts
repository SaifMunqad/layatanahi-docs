import customer from '@/routes/customer';
import business from '@/routes/business';
import support from '@/routes/support';
import api from '@/routes/api';
import type { RouteQueryOptions, RouteDefinition } from '@/wayfinder';

type RouteHelper = (options?: RouteQueryOptions) => RouteDefinition<'get'>;

export type NavItem = {
    label: string;
    slug: string;
    path: RouteHelper;
    active?: boolean;
    children?: NavItem[];
};

export type NavSectionData = {
    label: string;
    items: NavItem[];
};

export const resolveHref = (path: NavItem['path']) => path().url;

export const NAV_SECTIONS: NavSectionData[] = [
    {
        label: 'CUSTOMER',
        items: [
            { label: 'Overview', slug: 'customer-overview', path: customer.overview },
            { label: 'Customer Portal', slug: 'customer-portal', path: customer.portal },
            { label: 'Account Center', slug: 'customer-account-center', path: customer.accountCenter },
        ],
    },
    {
        label: 'BUSINESS',
        items: [
            {
                label: 'Purchase',
                slug: 'business-purchase',
                path: business.purchase.overview,
                active: true,
                children: [
                    { label: 'Overview', slug: 'purchase-overview', path: business.purchase.overview },
                    { label: 'Listing', slug: 'purchase-listing', path: business.purchase.listing },
                    { label: 'Demo', slug: 'purchase-demo', path: business.purchase.demo },
                ],
            },
            {
                label: 'Inventory',
                slug: 'business-inventory',
                path: business.inventory.overview,
                children: [
                    { label: 'Overview', slug: 'inventory-overview', path: business.inventory.overview },
                    { label: 'Listing', slug: 'inventory-listing', path: business.inventory.listing },
                    { label: 'Demo', slug: 'inventory-demo', path: business.inventory.demo },
                ],
            },
            {
                label: 'Sale',
                slug: 'business-sale',
                path: business.sale.overview,
                children: [
                    { label: 'Overview', slug: 'sale-overview', path: business.sale.overview },
                    { label: 'Listing', slug: 'sale-listing', path: business.sale.listing },
                    { label: 'Demo', slug: 'sale-demo', path: business.sale.demo },
                ],
            },
            {
                label: 'Store',
                slug: 'business-store',
                path: business.store.overview,
                children: [
                    { label: 'Overview', slug: 'store-overview', path: business.store.overview },
                    { label: 'Listing', slug: 'store-listing', path: business.store.listing },
                    { label: 'Demo', slug: 'store-demo', path: business.store.demo },
                ],
            },
            {
                label: 'Public',
                slug: 'business-public',
                path: business.public.overview,
                children: [
                    { label: 'Overview', slug: 'public-overview', path: business.public.overview },
                    { label: 'Listing', slug: 'public-listing', path: business.public.listing },
                    { label: 'Demo', slug: 'public-demo', path: business.public.demo },
                ],
            },
        ],
    },
    {
        label: 'SUPPORT',
        items: [
            { label: 'Help Center', slug: 'support-help-center', path: support.helpCenter },
            { label: 'Knowledge Base', slug: 'support-knowledge-base', path: support.knowledgeBase },
            { label: 'Contact Team', slug: 'support-contact-team', path: support.contactTeam },
        ],
    },
    {
        label: 'API',
        items: [
            { label: 'Overview', slug: 'api-overview', path: api.overview },
            { label: 'Authentication', slug: 'api-authentication', path: api.authentication },
            { label: 'Reference', slug: 'api-reference', path: api.reference },
        ],
    },
];

export function findActiveNavBranch(pathname: string) {
    const normalized = pathname.replace(/\/+$/, '') || '/';

    for (const section of NAV_SECTIONS) {
        for (const item of section.items) {
            if (isNavItemActive(item, normalized)) {
                return { sectionLabel: section.label, itemPath: resolveHref(item.path) };
            }
        }
    }

    return { sectionLabel: null, itemPath: null };
}

export function isNavItemActive(item: NavItem, pathname: string): boolean {
    if (resolveHref(item.path) === pathname) {
        return true;
    }

    return Boolean(item.children?.some((child) => isNavItemActive(child, pathname)));
}
