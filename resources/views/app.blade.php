<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ in_array(app()->getLocale(), ['fa_AF', 'ps'], true) ? 'rtl' : 'ltr' }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect locale direction and system dark mode preference immediately --}}
        <script>
            (function() {
                try {
                    const cookieMatch = document.cookie.match(/(?:^|;\s*)layatanahi_locale=([^;]+)/);
                    const raw = cookieMatch ? decodeURIComponent(cookieMatch[1]) : (window.localStorage.getItem('docs-locale') || window.localStorage.getItem('layatanahi_locale'));
                    if (raw) {
                        const isRtl = raw === 'fa_AF' || raw === 'ps' || raw.toLowerCase().startsWith('fa');
                        document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
                    }
                } catch (e) {}

                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <x-inertia::app />
    </body>
</html>
