import layatanahi from '@/routes/layatanahi';
import user from '@/routes/user';
import business from '@/routes/business';
import support from '@/routes/support';
import legal from '@/routes/legal';
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
        label: 'LAYATANAHI',
        items: [
            { label: 'Overview', slug: 'layatanahi-overview', path: layatanahi.overview },
            { label: 'Introduction', slug: 'layatanahi-introduction', path: layatanahi.introduction },
            { label: 'Credits', slug: 'layatanahi-credits', path: layatanahi.credits },
            { label: 'Team', slug: 'layatanahi-team', path: layatanahi.team },
            { label: 'Idea', slug: 'layatanahi-idea', path: layatanahi.idea },
            { label: 'Features', slug: 'layatanahi-features', path: layatanahi.features },
        ],
    },
    {
        label: 'USER',
        items: [
            { label: 'Overview', slug: 'user-overview', path: user.overview },
            { label: 'Purchase', slug: 'user-purchase', path: user.purchase },
            { label: 'AI', slug: 'user-ai', path: user.ai },
            { label: 'Profile', slug: 'user-profile', path: user.profile },
        ],
    },
    {
        label: 'BUSINESS',
        items: [
            {
                label: 'Purchase',
                slug: 'business-purchase',
                path: business?.purchase?.overview ?? (() => ({ url: '/purchase/list', method: 'get' } as any)),
                active: true,
                children: [
                    { label: 'Overview', slug: 'purchase-overview', path: business.purchase.overview },
                    { label: 'Listing', slug: 'purchase-listing', path: business.purchase.listing },
                    { label: 'Make Purchase', slug: 'purchase-create', path: (() => ({ url: '/business/purchase/create', method: 'get' } as any)) },
                    { label: 'View', slug: 'purchase-show', path: (() => ({ url: '/business/purchase/show', method: 'get' } as any)) },
                    { label: 'Status', slug: 'purchase-status', path: (() => ({ url: '/business/purchase/status', method: 'get' } as any)) },
                    { label: 'Purchase Requests', slug: 'purchase-requests', path: (() => ({ url: '/business/purchase/requests', method: 'get' } as any)) },
                    { label: 'Filters', slug: 'purchase-filters', path: (() => ({ url: '/business/purchase/filters', method: 'get' } as any)) },
                ],
            },
            {
                label: 'Inventory',
                slug: 'business-inventory',
                path: business.inventory.overview,
                children: [
                    { label: 'Overview', slug: 'inventory-overview', path: business.inventory.overview },
                    { label: 'Listing', slug: 'inventory-listing', path: business.inventory.listing },
                    { label: 'Configurations (Activities)', slug: 'inventory-configurations', path: business.inventory.configurations },
                    { label: 'Transfers', slug: 'inventory-transfers', path: business.inventory.transfers },
                    { label: 'Changes', slug: 'inventory-changes', path: business.inventory.changes },
                ],
            },
            {
                label: 'Sale',
                slug: 'business-sale',
                path: business?.sale?.overview ?? (() => ({ url: '/sale/list', method: 'get' } as any)),
                children: [
                    { label: 'Overview', slug: 'sale-overview', path: business.sale.overview },
                    { label: 'Listing', slug: 'sale-listing', path: business.sale.listing },
                    { label: 'Make Sale', slug: 'sale-create', path: (() => ({ url: '/business/sale/create', method: 'get' } as any)) },
                    { label: 'View', slug: 'sale-show', path: (() => ({ url: '/business/sale/show', method: 'get' } as any)) },
                    { label: 'Status', slug: 'sale-status', path: (() => ({ url: '/business/sale/status', method: 'get' } as any)) },
                    { label: 'Sale Requests', slug: 'sale-requests', path: (() => ({ url: '/business/sale/requests', method: 'get' } as any)) },
                    { label: 'Filters', slug: 'sale-filters', path: (() => ({ url: '/business/sale/filters', method: 'get' } as any)) },
                ],
            },
            {
                label: 'Store',
                slug: 'business-store',
                path: business.store.overview,
                children: [
                    { label: 'Overview', slug: 'store-overview', path: business.store.overview },
                    { label: 'Branches', slug: 'store-branches', path: business.store.branches },
                    { label: 'Employees', slug: 'store-employees', path: business.store.employees },
                    { label: 'Store Assets', slug: 'store-assets', path: business.store.assets },
                    { label: 'Reports', slug: 'store-reports', path: business.store.reports },
                    { label: 'Activities', slug: 'store-activities', path: business.store.activities },
                    { label: 'Analytics', slug: 'store-analytics', path: business.store.analytics },
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
        label: 'LEGAL',
        items: [
            { label: 'Privacy Policy', slug: 'legal-privacy-policy', path: legal.privacyPolicy },
            { label: 'Terms of Service', slug: 'legal-terms-of-service', path: legal.termsOfService },
            { label: 'Return Policy', slug: 'legal-return-policy', path: legal.returnPolicy },
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
