---
id: support.dev_routes.application_locale_session_inspector
title: "Application Locale & Session Inspector"
section: support
directory: dev_routes
link: "/system/support/test-locale"
path: ["System Support","Dev Routes","Locale Inspector"]
---

# Application Locale & Session Inspector

The '/system/support/test-locale' route returns the current application runtime locale resolved by Laravel ('App::getLocale()') alongside the persisted session locale string ('Session::get("locale")').

This allows developers to verify that multi-lingual requests (English, Dari fa_AF, and Pashto ps) are accurately detected, that the SetLocale middleware updates session state correctly, and that long-lived Octane workers do not leak locale state between requests.
