---
title: Authentication
section: api
---

# Authentication

Every API v2 and MCP request is authenticated with a Sanctum bearer token that belongs to a **business
integration credential**. The token identifies the credential; the credential identifies the business and
the employee; the employee's live roles decide what the request may read.

Authentication is therefore two checks in one: a valid token, and a still-valid authorisation context.

## Sending the token

```http
GET /api/v2/context HTTP/1.1
Host: app.example.com
Authorization: Bearer 12|secret-token-value
Accept: application/json
```

Rules:

- Send the token in the `Authorization` header, with the `Bearer` scheme.
- Always send `Accept: application/json`; without it, framework errors render as HTML.
- The token is shown **once** when the credential is created or rotated. Store it in a secret manager.
- Tokens do not expire on a timer, but they fail immediately when the credential is revoked or the owning
  employee loses the required authority.

## What the server verifies

For every request, in order:

| Step | Check | Failure code |
| --- | --- | --- |
| 1 | A Sanctum token carrying an integration id exists | `integration_credential_required` (401) |
| 2 | The credential is `active` and owned by the token's user | `integration_credential_invalid` (401) |
| 3 | The business exists, is not deleted and is `active` | `integration_credential_invalid` (401) |
| 4 | The user still has an active employee membership in the business | `integration_membership_inactive` (403) |
| 5 | The employee is a business admin or manages at least one branch | `integration_role_revoked` (403) |
| 6 | A non-business-wide credential still has a branch in scope | `integration_branch_scope_empty` (403) |
| 7 | The ability is granted, and the live role grants the mapped permission | `api_ability_denied` (403) |
| 8 | The requested branch is inside the credential's scope | `branch_scope_denied` (403) or `branch_required` (422) |

Steps 4 to 6 run before any data access. If the employee was fired, transferred out of management, or had
the relevant role removed, the credential fails even though the token string is still valid.

## Live authority

Authority is derived from the employee's roles on every request:

| Authority | Recognised by |
| --- | --- |
| Business administrator | A business-scope role that includes `settings.write` |
| Branch manager | A branch where the employee is the manager, or a home branch while holding a branch-scope `Management` role |
| No authority | Neither of the above, so `integration_role_revoked` is returned |

A business administrator's scope is every active branch of the business. A branch manager's scope is the
set of branches they manage. A credential restricted to selected branches is narrowed to the intersection
of the employee's managed branches and the credential's chosen branches.

## Ability and permission mapping

An ability is granted on the credential, but it only works when the employee's live role also grants the
matching page permission:

| Ability | Required page permission |
| --- | --- |
| `products:read` | `inventory.products.read` |
| `stock:read` | `inventory.branches.read` |
| `purchases:read` | `purchase.purchases.read` |
| `orders:read` | `sale.orders.read` |
| `sales:read` | `sale.sales.read` |

Privilege-escalation surfaces are excluded by design: no ability maps to `access.*`, employee management,
password changes or two-factor settings.

## Branch resolution

The target branch is resolved, in order, from:

1. The `X-Business-Branch` header.
2. The `branch_id` argument of an MCP tool call.
3. The `branch_id` request parameter.

Then:

- If a branch is supplied, it must belong to the business and be inside the credential's scope; otherwise
  `branch_scope_denied`.
- If no branch is supplied and the credential is business-wide, the request reads across the business.
- If no branch is supplied and exactly one branch is in scope, that branch is used.
- If no branch is supplied and several branches are in scope, the API answers `branch_required`.

## Token isolation

Integration tokens are accepted only on `/api/v2/*` and `/mcp/*`. Using one on another Sanctum-protected
route, such as the support back office, returns:

```json
{
  "error": {
    "code": "integration_token_not_allowed",
    "message": "Business integration credentials are restricted to API v2 and MCP endpoints."
  }
}
```

## Failure responses

| Status | Code | Meaning |
| --- | --- | --- |
| 401 | `integration_credential_required` | No token, or the token is not an integration token |
| 401 | `integration_credential_invalid` | Credential revoked, business inactive, or user mismatch |
| 403 | `integration_membership_inactive` | The employee membership was removed |
| 403 | `integration_role_revoked` | The employee no longer has admin or manager authority |
| 403 | `integration_branch_scope_empty` | A branch-restricted credential has no branch left in scope |
| 403 | `api_ability_denied` | Ability missing, or the role no longer grants the permission |
| 403 | `branch_scope_denied` | The branch is outside the credential scope |
| 422 | `branch_required` | Several branches are in scope and none was named |
| 403 | `integration_token_not_allowed` | Token used on a non-integration route |

## Operational guidance

- Rotate on a schedule and immediately after any suspicion of leakage.
- Keep one credential per integration, named after the system that uses it.
- Grant the smallest ability set and the smallest branch set.
- Monitor `last_used_at` and the request events in the usage card.
- Do not embed tokens in client-side code; integrations are server-to-server.

## Related pages

- [API Keys & Scopes](/docs/api/api-key)
- [Rate Limits & Quotas](/docs/api/rate-limits)
- [Errors](/docs/api/errors)
- [MCP Authentication](/docs/mcp/authentication)
