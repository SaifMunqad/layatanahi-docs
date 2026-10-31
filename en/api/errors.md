---
title: Errors
section: api
---

# Errors

The API uses conventional HTTP status codes and a small JSON error envelope. Authentication and quota
failures return `{"error":{"code":"...","message":"..."}}`; missing detail records use a nested shape
that also repeats the `error` key inside the object.

Always check the HTTP status first, then read `error.code`.

## Error envelopes

### Standard

```json
{
  "error": {
    "code": "api_ability_denied",
    "message": "This credential is not permitted to perform the requested operation."
  }
}
```

### Missing detail record

```json
{
  "error": {
    "error": "not_found",
    "message": "Sale not found."
  }
}
```

### Validation

Validation failures follow the framework's shape: a `message` plus an `errors` object keyed by field.

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "to": ["The to field must be a date after or equal to from."]
  }
}
```

## Status codes

| Status | Meaning | Typical cause |
| --- | --- | --- |
| 200 | Success | — |
| 401 | Unauthenticated | Missing token, revoked credential, wrong token type |
| 403 | Forbidden | Ability, membership or branch scope denied |
| 404 | Not found | Detail id outside the visible scope |
| 405 | Method not allowed | GET or DELETE sent to the MCP endpoint |
| 422 | Validation failed | Bad date, bad page size, branch required |
| 429 | Too many requests | Burst limit or daily/monthly quota |
| 500 | Server error | Unexpected failure, retry with backoff |

## Code reference

| Code | Status | Meaning | Fix |
| --- | --- | --- | --- |
| `integration_credential_required` | 401 | No integration token on the request | Send `Authorization: Bearer <token>` |
| `integration_credential_invalid` | 401 | Credential revoked, business inactive, user mismatch | Create or rotate a credential |
| `integration_membership_inactive` | 403 | Employee membership removed | Re-employ the user or use another credential |
| `integration_role_revoked` | 403 | Owner is no longer admin or branch manager | Restore the role or reissue the credential |
| `integration_branch_scope_empty` | 403 | Branch-restricted credential has no branch in scope | Grant a managed branch or make it business-wide |
| `api_ability_denied` | 403 | Ability missing or role no longer grants it | Grant the ability and the page permission |
| `branch_scope_denied` | 403 | Branch is outside the credential scope | Use a granted branch |
| `branch_required` | 422 | Several branches granted, none named | Send `X-Business-Branch` |
| `integration_token_not_allowed` | 403 | Token used on a non-integration route | Use `/api/v2` or `/mcp` only |
| `api_burst_limit_exceeded` | 429 | More than 60 requests in a minute | Wait for `Retry-After` |
| `api_quota_exceeded` | 429 | Daily or monthly quota reached | Wait for reset or upgrade the plan |

Tool-level failures inside MCP may return an error message instead of an HTTP error; see
[MCP Troubleshooting](/docs/mcp/troubleshooting).

## Rate limit errors

```json
{
  "error": {
    "code": "api_burst_limit_exceeded",
    "message": "Too many API requests in a short period.",
    "retry_after_seconds": 17
  }
}
```

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

Both include a `Retry-After` response header. Respect the header rather than a fixed sleep.

## Retry strategy

| Status | Retry? | Strategy |
| --- | --- | --- |
| 401, 403 | No | Fix credentials or permissions |
| 404 | No | The record is not in scope |
| 422 | No | Correct the request |
| 429 | Yes | Wait `Retry-After`, then exponential backoff |
| 500 | Yes | Exponential backoff, cap the attempts |

Retrying an authorisation error just consumes quota. Log it and alert instead.

## Logging advice

- Log the endpoint name, status, `error.code` and the request id if your proxy provides one.
- Never log the bearer token or the secret.
- Correlate failures with the credential's usage card in Settings.
- Treat repeated `403` from one credential as a permission regression in the source system.

## Related pages

- [Authentication](/docs/api/authentication)
- [Rate Limits & Quotas](/docs/api/rate-limits)
- [Quick Start](/docs/api/usage)
- [MCP Troubleshooting](/docs/mcp/troubleshooting)
