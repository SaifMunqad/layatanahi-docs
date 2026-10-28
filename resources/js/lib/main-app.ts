/**
 * Resolves the main application URL from the docs application.
 *
 * Examples:
 * - http://docs.localhost -> http://localhost
 * - http://docs.localhost:8081 -> http://localhost:8000 (direct docker ports)
 * - https://docs.layatanahi.store -> https://layatanahi.store
 * - https://docs.example.com -> https://example.com
 */
export function resolveMainAppUrl(): string {
    const configured = import.meta.env.VITE_MAIN_APP_URL || import.meta.env.VITE_APP_URL;
    if (configured && !configured.includes('docs.')) {
        return configured;
    }

    if (typeof window === 'undefined') {
        return 'http://localhost';
    }

    const { protocol, hostname, port } = window.location;

    let mainHost: string;
    if (hostname === 'docs.localhost') {
        mainHost = 'localhost';
    } else if (hostname.startsWith('docs.')) {
        mainHost = hostname.replace(/^docs\./, '');
    } else {
        mainHost = 'localhost';
    }

    let portSuffix = '';
    if (port && port !== '80' && port !== '443') {
        if (port === '8081') {
            portSuffix = ':8000';
        } else {
            portSuffix = `:${port}`;
        }
    }

    return `${protocol}//${mainHost}${portSuffix}`;
}
