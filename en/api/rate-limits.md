---
title: Rate Limits & Quotas
section: api
---

# Rate Limits & Quotas

Two independent protections apply to every API v2 and MCP request:

1. A **burst limiter** stops short floods before any database work happens.
2. A **quota** caps how many requests a user may make per day and per month.

Both return `429` with a `Retry-After` header, but they mean different things and should be handled
differently.

## Burst limiter

| Property | Value |
| --- | --- |
| Window | 60 seconds |
| Limit | 60 requests |
| Key | The integration credential |
| Order | Checked before branch validation and quota |

The limiter is checked before quota counters are touched, so a flood cannot lock quota rows or inflate
usage. Exceeding it returns `api_burst_limit_exceeded` and a short retry delay.

## Quota

| Property | Value |
| --- | --- |
| Scope | Per user, shared by all their credentials |
| Daily base | 200 requests |
| Monthly base | 2,000 requests |
| Reset | Start of the day and start of the month in the business timezone |

Quota is charged once per request, after the burst check and after branch validation, and includes the
`/api/v2/context` call. `/api/v2/health` is not charged.

## Plan multipliers

| Plan | Multiplier | Daily | Monthly |
| --- | --- | --- | --- |
| Free | 1× | 200 | 2,000 |
| Growth | 3× | 600 | 6,000 |
| Scale | 10× | 2,000 | 20,000 |
| Enterprise | 50× | 10,000 | 100,000 |

A plan is time-bounded. When it expires, the effective plan falls back to Free automatically, so an
integration that relied on Growth limits will start receiving `429` again.

## Rate limit responses

### Burst

```json
{
  "error": {
    "code": "api_burst_limit_exceeded",
    "message": "Too many API requests in a short period.",
    "retry_after_seconds": 17
  }
}
```

### Quota

```json
{
  "error": {
    "code": "api_quota_exceeded",
    "message": "The API request quota has been reached.",
    "scope": "user",
    "period": "day",
    "limit": 200,
    "used": 200,
    "reset_at": "2026-11-01T00:00:00+04:30",
    "retry_after_seconds": 18234
  }
}
```

Both include `Retry-After` as an integer number of seconds. Use it instead of a fixed delay.

## Monitoring usage

`GET /api/v2/context` returns the effective plan, multiplier, timezone and current usage:

| Field | Meaning |
| --- | --- |
| `quota.plan` | Effective plan after expiry rules |
| `quota.multiplier` | Multiplier applied to the base limits |
| `quota.user.day` | Used, limit, remaining and reset time for today |
| `quota.user.month` | Used, limit, remaining and reset time for this month |

The same numbers appear in the integrations card in Settings.

## Designing within the limits

| Technique | Effect |
| --- | --- |
| Sync nightly with `per_page=100` | Fewer requests per record |
| Use date windows | Smaller, resumable result sets |
| Cache context | One call per hour instead of per request |
| Cache catalog data | Products and stock change less than sales |
| Back off on `429` | Avoids burning the remaining quota |
| One credential per system | Makes usage attributable |

Quota is charged per request, not per row, so a large page is always cheaper than many small pages.

## What is not counted

- `/api/v2/health`.
- Requests rejected by the burst limiter before quota charging.
- Requests rejected for a branch scope error: validation happens before the quota charge and the request is
  recorded as `scope_denied`.
- Web interface usage by employees.

## Operational notes

- Rejected requests are still written to the request event log for auditing, without incrementing quota.
- `last_used_at` is updated on successful authentication, not on every request.
- A plan change applies to the next request; there is no cached entitlement in the token.
- If two integrations share an owner, they share the quota. Split owners if you need isolation.

## Related pages

- [Errors](/docs/api/errors)
- [Authentication](/docs/api/authentication)
- [API Keys & Scopes](/docs/api/api-key)
- [Quick Start](/docs/api/usage)
