---
id: support.dev_routes.authentication_headers_csrf_verification
title: "Authentication Headers & CSRF Verification"
section: support
directory: dev_routes
link: "/api/system/support/test/debug-auth"
path: ["System Support","Dev Routes","Auth & CSRF Debug"]
---

# Authentication Headers & CSRF Verification

The '/api/system/support/test/debug-auth' and '/api/system/support/test/csrf' endpoints deliver comprehensive insight into incoming request headers, cookies, and tokens. They return the active session ID, X-XSRF-TOKEN, X-CSRF-TOKEN, Authorization headers, and raw session data.

These diagnostics are indispensable when debugging cross-site request forgery protection, cookie domain mismatches, or stateless API requests from mobile or third-party integrations.
