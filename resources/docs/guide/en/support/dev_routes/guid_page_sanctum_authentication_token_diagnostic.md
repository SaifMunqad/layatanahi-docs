---
id: support.dev_routes.sanctum_authentication_token_diagnostic
title: "Sanctum Authentication & Token Diagnostic"
section: support
directory: dev_routes
link: "/system/support/test-sanctum-chat"
path: ["System Support","Dev Routes","Sanctum Auth"]
---

# Sanctum Authentication & Token Diagnostic

The '/test-sanctum-chat' and '/api/system/support/test-sanctum' endpoints inspect and validate active Laravel Sanctum session and token states. They verify whether the current request is recognized as authenticated, display the resolved user details (ID, email, name), and inspect Bearer token prefixes.

Developers utilize these endpoints to diagnose token issuance issues, verify header propagation across frontend requests, and confirm authentication persistence across long-lived Octane worker threads.
