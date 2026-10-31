---
title: Changelog
section: api
---

# Changelog

This page records changes to the Business API and the MCP server. Dates are approximate release windows;
the behaviour described in this documentation reflects the current release.

## Versioning policy

- The supported integration surface is `/api/v2` and `/mcp/business`.
- Additive changes (new fields, new optional filters) may ship within v2.
- Breaking changes require a new version prefix.
- `/api/v1` is the application's internal surface and is not covered by this policy.

## Current release

### Business API v2

- Read-only endpoints: `context`, `products`, `stock`, `purchases`, `purchases/{id}`, `orders`, `sales`,
  `sales/{id}` and `health`.
- Five read abilities: `products:read`, `stock:read`, `purchases:read`, `orders:read`, `sales:read`.
- Employee-bound credentials with live role and membership re-verification on every request.
- Branch resolution through `X-Business-Branch`, with automatic resolution for a single granted branch and
  `422 branch_required` when several branches are granted and none is named.
- Pagination with `page` and `per_page` (1–100, default 25) and filter-preserving links.
- Language-aware product names through `language_code` with fallback to the product code.
- Purchase and sale detail resources with invoice, counterparty, line items and payments.
- Order listing with date and status filters.

### Quotas and limits

- Burst limiter: 60 requests per minute per credential.
- Quota: 200 requests per day and 2,000 per month per user.
- Plans: Free (1×), Growth (3×), Scale (10×), Enterprise (50×), time-bounded with expiry fallback.
- `429` responses include `Retry-After` and, for quota, the scope, period, limit, used count and reset
  time.

### Credential management

- Creation, rename, rotation and revocation from **Settings > API integrations**.
- One-time secret display; only a hash is stored.
- Business-wide or selected-branch scoping.
- Administrator visibility across the business; managers limited to their own credentials.
- Usage card with plan, multiplier, usage, reset times and recent outcomes.

### MCP server

- `BusinessApiServer` exposed at `POST /mcp/business` over Streamable HTTP.
- Five tools: `products`, `stock`, `purchases`, `orders`, `sales`.
- Shared tool parameters: `id`, `branch_id`, `per_page`, `page`, `language_code`.
- Local-only sandbox at `/mcp/test` and `/mcp/business/test` in local and testing environments.
- Same credential, ability, branch and quota pipeline as the HTTP API.

## Planned and under consideration

These items are not available today and should not be assumed by an integration:

| Item | Status |
| --- | --- |
| Outbound webhooks with signatures | Not available |
| Write endpoints (sales, purchases, payments) | Not available; read-only by design |
| Additional resources (accounts, activities, returns) | Not available |
| Per-credential quota buckets | Quota is per user |
| API version v3 | Not announced |

## Deprecations

No v2 endpoint is deprecated. If a field or endpoint is retired, this page will name it, state the
replacement and give a migration window before removal.

## How to stay current

1. Re-read the [Endpoint Reference](/docs/api/reference) after upgrading.
2. Run your integration's contract tests against a staging business.
3. Watch for additive fields; they do not require changes but may be useful.
4. Report discrepancies through your support channel rather than working around them.

## Related pages

- [API Overview](/docs/api/overview)
- [Endpoint Reference](/docs/api/reference)
- [MCP Overview](/docs/mcp/overview)
- [Integration Guidelines](/docs/api/guideline)
