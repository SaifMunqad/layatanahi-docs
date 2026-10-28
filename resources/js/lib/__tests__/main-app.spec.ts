// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest';
import { resolveMainAppUrl } from '../main-app';

describe('resolveMainAppUrl', () => {
    const originalLocation = window.location;

    const setLocation = (href: string) => {
        const url = new URL(href);
        Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
            value: {
                ...originalLocation,
                href: url.href,
                protocol: url.protocol,
                host: url.host,
                hostname: url.hostname,
                port: url.port,
                pathname: url.pathname,
                search: url.search,
                hash: url.hash,
                origin: url.origin,
            },
        });
    };

    afterEach(() => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            writable: true,
            value: originalLocation,
        });
    });

    it('resolves localhost when on docs.localhost', () => {
        setLocation('http://docs.localhost');
        expect(resolveMainAppUrl()).toBe('http://localhost');
    });

    it('resolves localhost when on docs.localhost:80', () => {
        setLocation('http://docs.localhost:80');
        expect(resolveMainAppUrl()).toBe('http://localhost');
    });

    it('maps port 8081 to 8000 for direct docker ports', () => {
        setLocation('http://docs.localhost:8081');
        expect(resolveMainAppUrl()).toBe('http://localhost:8000');
    });

    it('removes docs. subdomain for apex domains in production', () => {
        setLocation('https://docs.layatanahi.store');
        expect(resolveMainAppUrl()).toBe('https://layatanahi.store');
    });

    it('removes docs. subdomain for arbitrary domains', () => {
        setLocation('https://docs.example.com');
        expect(resolveMainAppUrl()).toBe('https://example.com');
    });

    it('preserves custom port if not 8081', () => {
        setLocation('http://docs.localhost:3000');
        expect(resolveMainAppUrl()).toBe('http://localhost:3000');
    });
});
