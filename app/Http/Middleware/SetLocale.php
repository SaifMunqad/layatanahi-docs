<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class SetLocale
{
    public const COOKIE_NAME = 'layatanahi_locale';
    public const DEFAULT_LOCALE = 'fa_AF';
    public const SUPPORTED_LOCALES = ['en', 'fa_AF', 'ps'];

    /**
     * Map common aliases or partial tags to standard supported locales.
     */
    public static function normalizeLocale(?string $locale): string
    {
        if (! $locale) {
            return self::DEFAULT_LOCALE;
        }

        $cleaned = strtolower(trim(str_replace('-', '_', $locale)));

        return match ($cleaned) {
            'en', 'english', '1' => 'en',
            'fa', 'dr', 'dari', 'farsi', 'fa_af', '2' => 'fa_AF',
            'ps', 'pashto', 'pushto', '3' => 'ps',
            default => in_array($locale, self::SUPPORTED_LOCALES, true) ? $locale : self::DEFAULT_LOCALE,
        };
    }

    /**
     * Determine wildcard cookie domain for cross-subdomain sharing.
     */
    public static function getSharedCookieDomain(?string $host = null): ?string
    {
        $host = $host ?: request()->getHost();

        if ($host === 'localhost' || str_ends_with($host, '.localhost')) {
            return '.localhost';
        }

        if (filter_var($host, FILTER_VALIDATE_IP)) {
            return null;
        }

        $parts = explode('.', $host);
        if (count($parts) >= 2) {
            return '.'.implode('.', array_slice($parts, -2));
        }

        return null;
    }

    public function handle(Request $request, Closure $next)
    {
        // 1. Query parameter (?lang= or ?locale=)
        $queryLocale = $request->query('lang') ?: $request->query('locale');

        // 2. Cross-domain shared cookie
        $cookieLocale = $request->cookie(self::COOKIE_NAME);

        // 3. Server session
        $sessionLocale = session('locale');

        $targetLocale = null;
        if ($queryLocale) {
            $targetLocale = self::normalizeLocale($queryLocale);
        } elseif ($cookieLocale) {
            $targetLocale = self::normalizeLocale($cookieLocale);
        } elseif ($sessionLocale) {
            $targetLocale = self::normalizeLocale($sessionLocale);
        }

        if (! $targetLocale) {
            $targetLocale = self::DEFAULT_LOCALE;
        }

        // Save to session and apply to framework
        Session::put('locale', $targetLocale);
        App::setLocale($targetLocale);

        // Queue shared cookie with cross-subdomain domain
        $domain = self::getSharedCookieDomain();
        Cookie::queue(cookie(
            name: self::COOKIE_NAME,
            value: $targetLocale,
            minutes: 525600,
            path: '/',
            domain: $domain,
            secure: $request->isSecure(),
            httpOnly: false,
            raw: false,
            sameSite: 'lax'
        ));

        return $next($request);
    }
}
