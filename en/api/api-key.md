---
title: API Keys & Scopes
section: api
---

# API Keys & Scopes

API credentials are created from the business settings screen, not from a separate developer portal.
That keeps ownership clear: a credential belongs to an employee, inherits that employee's authority, and
disappears from service when the employee leaves.

Open **Settings > API integrations** to manage them.

## Who can create a credential

| Role | Can view | Can create | Can manage |
| --- | --- | --- | --- |
| Business administrator | All credentials of the business | Yes | Any credential of the business |
| Branch manager | Only their own credentials, limited to managed branches | Yes | Only their own |
| Other employees | No | No | No |

Managing means renaming, rotating and revoking. Creating and managing require the `settings` write
capability.

## Creating a credential

1. Open **Settings > API integrations**.
2. Choose **Create**.
3. Enter a name that identifies the consuming system, for example `ERP sync` or `Claude Desktop`.
4. Select at least one ability.
5. Choose whether the credential is business-wide or limited to branches.
6. Save, then copy the secret immediately.

| Field | Required | Rules |
| --- | --- | --- |
| Name | Yes | Up to 120 characters |
| Abilities | Yes | At least one of the five supported abilities |
| Business-wide | Yes | Boolean |
| Branch IDs | When not business-wide | At least one, integers, distinct |

The secret is displayed once. Only a hash is stored, so it cannot be recovered later; if it is lost,
rotate the credential.

## Abilities

| Ability | Unlocks | Also requires |
| --- | --- | --- |
| `products:read` | Product catalog and search | `inventory.products.read` |
| `stock:read` | Stock rows per branch | `inventory.branches.read` |
| `purchases:read` | Purchase list and detail | `purchase.purchases.read` |
| `orders:read` | Order list | `sale.orders.read` |
| `sales:read` | Sale list and detail | `sale.sales.read` |

There are no write abilities. Granting an ability never expands what the employee can do in the
interface, and removing a page permission from the role silently disables the corresponding ability.

## Business-wide versus branch-scoped

| Mode | Behaviour | Typical use |
| --- | --- | --- |
| Business-wide | Reads every active branch unless a branch is named | Central reporting, ERP sync |
| Selected branches | Reads only the granted branches; one branch is resolved automatically | Regional warehouse tool |

A branch manager cannot create a business-wide credential that reaches branches they do not manage. The
server checks the granted branches against the manager's live scope and rejects an over-broad request.

## Rotating and revoking

| Action | Effect |
| --- | --- |
| Rename | Changes the label only; the token keeps working |
| Rotate | Issues a new secret and a new token; the previous token stops working immediately |
| Revoke | Marks the credential revoked; every request fails with `401`, permanently |

Revoked credentials cannot be rotated, renamed or reactivated. Create a new credential instead.

Rotation is the correct response to a suspected leak because it invalidates the old secret without
losing the credential's history.

## Reading the usage card

The integrations tab shows the plan, the multiplier, the daily and monthly allowance, current usage and
the reset time, plus recent request outcomes per credential.

| Field | Meaning |
| --- | --- |
| Plan | Effective plan: free, growth, scale or enterprise |
| Multiplier | Applied to the base allowance |
| Used / limit | Requests consumed in the current period |
| Reset at | When the period boundary is reached |
| Last used | Last successful authentication of the credential |

Quota is per user, not per credential: several credentials owned by the same employee share one bucket.

## Security checklist

- One credential per consumer system, named explicitly.
- Minimum abilities and minimum branches.
- Secret stored in a secret manager, never in source control.
- Rotation after staff changes or a leak.
- Revoke rather than leave an unused credential active.
- Review `last_used_at`; an idle credential is usually an abandoned integration.

## Related pages

- [Authentication](/docs/api/authentication)
- [Rate Limits & Quotas](/docs/api/rate-limits)
- [Quick Start](/docs/api/usage)
- [Profile & Settings](/docs/business/settings)
