---
title: Integration Guidelines
section: api
---

# Integration Guidelines

These are the practices that keep an integration correct, cheap and safe over time. They are advisory,
not enforced by the API, but most support questions trace back to one of them being ignored.

## Identity and security

| Practice | Why |
| --- | --- |
| One credential per consuming system | Usage is attributable and revocation is surgical |
| Least abilities | A reporting job does not need `stock:read` or `orders:read` |
| Least branches | A regional tool should not read every branch |
| Secret in a secret manager | Prevents leakage through logs and repositories |
| Rotation on staff change | The credential inherits the employee's authority |
| Revoke abandoned credentials | An idle token is an unmonitored door |

Never log the bearer token. Never embed it in a browser, mobile app or public repository.

## Data handling

| Practice | Why |
| --- | --- |
| Store the resource `id` as the external key | IDs are stable; invoice numbers may be edited |
| Store `created_at` for watermarks | Enables incremental sync without duplicates |
| Treat amounts as decimals | Quantities and amounts can be fractional |
| Keep the invoice currency code | No conversion is performed by the API |
| Pin `language_code` | Names otherwise change with the user's interface language |
| Do not infer status from labels | Use `status_id` for logic and `status` for display |

Personal data (customer names, phones, e-mails) appears in sale and purchase detail. Handle it according
to your company's privacy policy and the platform terms.

## Synchronisation

1. Choose a watermark per resource, not a global one.
2. Request the smallest page that keeps the request count reasonable; `per_page=100` is usually right for
   scheduled jobs.
3. Make processing idempotent by upserting on the resource `id`.
4. Stop when the newest row is already known.
5. Keep a per-resource failure cursor so one bad record does not block everything.

Avoid ordering assumptions beyond what the API documents. Products and stock are ordered by `id`; trade
documents are newest first.

## Error handling

| Situation | Correct response |
| --- | --- |
| `401` | Alert, rotate the credential, do not retry in a loop |
| `403 api_ability_denied` | Alert; a role changed in the source system |
| `403 branch_scope_denied` | Fix configuration; do not try other branch ids |
| `422 branch_required` | Send `X-Business-Branch` explicitly |
| `429` | Honour `Retry-After`, then exponential backoff |
| `500` | Retry with backoff and a cap; alert after repeated failures |

Log the status, the `error.code` and the endpoint. Do not log request bodies that contain personal data.

## Performance

- Cache the context response for the duration of a job rather than calling it per record.
- Cache the product catalog; it changes far less often than sales.
- Prefer one page of 100 over four pages of 25.
- Run heavy syncs outside business peak hours to stay clear of interactive traffic.
- Reuse HTTP connections and enable compression if your client supports it.

## Versioning and change management

- Build against `/api/v2`; v1 is an internal surface.
- Tolerate additive fields: new keys may appear in responses.
- Do not depend on field order in JSON objects.
- Subscribe to the [Changelog](/docs/api/changelog) and re-test after changes.
- Pin the integration's expectations in automated contract tests.

## Review checklist

- [ ] Credential named after the consuming system.
- [ ] Only required abilities granted.
- [ ] Branch scope matches the business need.
- [ ] Secret stored outside the repository.
- [ ] Watermark stored per resource.
- [ ] `429` handled with `Retry-After`.
- [ ] Token never logged.
- [ ] Rotation owner and date documented.
- [ ] Integration tested against a staging business.

## Related pages

- [Authentication](/docs/api/authentication)
- [API Keys & Scopes](/docs/api/api-key)
- [Rate Limits & Quotas](/docs/api/rate-limits)
- [Webhooks & Events](/docs/api/webhooks)
