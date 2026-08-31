export type NavItem = {
    label: string;
    slug: string;
    active?: boolean;
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
        label: 'Prologue',
        items: [
            { label: 'Release Notes', slug: 'release-notes' },
            { label: 'Upgrade Guide', slug: 'upgrade-guide' },
            { label: 'Contribution Guide', slug: 'contributions' },
        ],
    },
    {
        label: 'Getting Started',
        items: [
            { label: 'Installation', slug: 'installation', active: true },
            { label: 'Configuration', slug: 'configuration' },
            { label: 'Directory Structure', slug: 'structure' },
            { label: 'Frontend', slug: 'frontend' },
            { label: 'Starter Kits', slug: 'starter-kits' },
            { label: 'Deployment', slug: 'deployment' },
        ],
    },
    {
        label: 'Architecture Concepts',
        items: [
            { label: 'Request Lifecycle', slug: 'lifecycle' },
            { label: 'Service Container', slug: 'container' },
            { label: 'Service Providers', slug: 'providers' },
            { label: 'Facades', slug: 'facades' },
        ],
    },
    {
        label: 'The Basics',
        items: [
            { label: 'Routing', slug: 'routing' },
            { label: 'Middleware', slug: 'middleware' },
            { label: 'Controllers', slug: 'controllers' },
            { label: 'Requests', slug: 'requests' },
            { label: 'Responses', slug: 'responses' },
            { label: 'Views', slug: 'views' },
            { label: 'Blade Templates', slug: 'blade' },
        ],
    },
    {
        label: 'Database',
        items: [
            { label: 'Getting Started', slug: 'database' },
            { label: 'Query Builder', slug: 'queries' },
            { label: 'Migrations', slug: 'migrations' },
            { label: 'Seeding', slug: 'seeding' },
        ],
    },
    {
        label: 'Eloquent ORM',
        items: [
            { label: 'Getting Started', slug: 'eloquent' },
            { label: 'Relationships', slug: 'eloquent-relationships' },
            { label: 'Collections', slug: 'eloquent-collections' },
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
