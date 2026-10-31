---
title: API Overview
section: api
---

# API Overview

The Business API exposes your business data to external systems: an ERP, a reporting tool, a warehouse
scanner or an AI assistant. It is deliberately **read-only**. Nothing in the API can create, edit, pay or
delete a record, so an integration can synchronise data without being able to change your books.

There are two HTTP surfaces plus the MCP server, and only v2 is intended for third-party clients:

| Surface | Path | Audience | Status |
| --- | --- | --- | --- |
| Business API v2 | `/api/v2` | External integrations using a credential | Supported |
| Model Context Protocol | `/mcp/business` | AI clients using the same credential | Supported |
| Application API v1 | `/api/v1` | The Layatanahi web application itself | Internal |

The v1 routes are the application's own endpoints for the browser: the AI assistant, the chatbot, the
notification feed, currency rates and product helpers. They run inside the web session context, are shaped
for the user interface, and change without notice. Do not build an integration on v1; use v2 or MCP.

## What the API can read

The v2 surface exposes exactly the resources external systems ask for. There is no other data.

| Endpoint | What it returns | Ability |
| --- | --- | --- |
| `/api/v2/context` | The credential's business, role scope, branches and quota | Any valid credential |
| `/api/v2/products` | Product catalog, searchable by code, model or name | `products:read` |
| `/api/v2/stock` | Stock rows with available, received and reserved quantities | `stock:read` |
| `/api/v2/purchases` and `/api/v2/purchases/{id}` | Purchase invoices and full purchase detail | `purchases:read` |
| `/api/v2/orders` | Inter-branch orders with status and totals | `orders:read` |
| `/api/v2/sales` and `/api/v2/sales/{id}` | Sale invoices and full sale detail | `sales:read` |
| `/api/v2/health` | Service health, no credential required | None |

Everything is scoped to one business. Records from another business are never visible, even if an
identifier is guessed. There are no endpoints for accounts, salaries, employees, roles or settings.

## How authentication works

An integration is not a separate account. It is a credential issued by an employee, bound to that
employee, and limited by the employee's live permissions:

1. An authorised employee opens **Settings > API integrations** and creates a named credential.
2. The credential receives a Sanctum token and a set of read abilities.
3. Every request re-checks that the business is active, the user still has an active employee membership,
   and that the employee still holds manager or administrator authority and the page permission behind the
   ability.
4. If the employee is fired, demoted or loses the relevant permission, the credential fails closed on the
   next request.

See [Authentication](/docs/api/authentication) and [API Keys & Scopes](/docs/api/api-key).

## Business administrator versus branch manager

Authority is derived from the employee's live roles, not from the credential alone:

| Authority | How it is recognised | Branch reach |
| --- | --- | --- |
| Business administrator | A business-scope role that includes `settings.write` | Every active branch of the business |
| Branch manager | Branches they manage, or a branch-scope `Management` role | Their managed branches only |
| Neither | No manager and no administrative authority | The credential is refused |

A credential that belongs to an employee who no longer has either form of authority is rejected. This is
why API access tracks the roles you manage in the interface.

## Branch scope

A business can have several branches. A credential is either business-wide or limited to selected
branches, and a request can target one branch:

```http
GET /api/v2/sales?from=2026-10-01&to=2026-10-31
Authorization: Bearer <token>
X-Business-Branch: 4
```

- A **business-wide** credential with no branch header reads across every active branch.
- A credential whose scope resolves to exactly one branch uses it automatically.
- A credential whose scope covers several branches must name the target, otherwise the API answers `422`.

## Requirements before a request succeeds

| Requirement | Enforcement |
| --- | --- |
| Active credential | Status `active` and owned by the token's user |
| Active business | Business not deleted and `business_status = active` |
| Active membership | User still an employee in the business |
| Live authority | Employee is a business admin or branch manager |
| Branch scope | Non-business-wide credentials must keep at least one branch |
| Ability + permission | The token ability and the mapped page permission |

If any of these fail, the request returns an authentication or authorisation error rather than partial
data.

## Design principles

- **Read-only by contract.** There is no write endpoint, and abilities are named `:read` for that reason.
- **Least privilege.** Grant only the abilities the integration needs, and only the branches it serves.
- **Live authorisation.** Permissions are evaluated per request, not captured at token creation.
- **Quota-aware.** Each request counts against a per-user daily and monthly allowance plus a short burst
  limit; see [Rate Limits & Quotas](/docs/api/rate-limits).
- **Stable versioning.** Breaking changes go to a new version; additive fields may appear in v2.
- **Predictable shapes.** Lists return pagination envelopes; detail resources return a `data` object.

## Where to go next

| Goal | Page |
| --- | --- |
| Create a credential | [API Keys & Scopes](/docs/api/api-key) |
| Send the first request | [Quick Start](/docs/api/usage) |
| Look up an endpoint | [Endpoint Reference](/docs/api/reference) |
| Connect an AI client | [MCP Overview](/docs/mcp/overview) |
| Handle failures | [Errors](/docs/api/errors) |

## Related pages

- [Authentication](/docs/api/authentication)
- [API Keys & Scopes](/docs/api/api-key)
- [Quick Start](/docs/api/usage)
- [Endpoint Reference](/docs/api/reference)
- [MCP Overview](/docs/mcp/overview)
