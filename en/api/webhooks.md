---
title: Webhooks & Events
section: api
---

# Webhooks & Events

The Business API does not currently offer configurable outbound webhooks. There is no endpoint to
register a callback URL, no signing secret to manage and no delivery retry queue for subscriber
endpoints.

This page explains what event surfaces do exist, so an integration can choose a reliable pattern instead
of waiting for a webhook that will never arrive.

## What exists today

| Surface | Direction | Who can use it |
| --- | --- | --- |
| Payment gateway callbacks | Provider to application | The payment provider only |
| Broadcast channels | Application to browser | Signed-in employees |
| Notification feed | Application to browser | Signed-in employees |
| API v2 polling | Application to client | Integration credentials |

## Payment gateway callbacks

HesabPay integration exposes server-to-server endpoints for creating a payment session and verifying a
payment. These are called by the application or the provider, not by third-party subscribers:

| Endpoint | Purpose |
| --- | --- |
| `POST /api/v1/hesabpay/create-session` | Start a hosted payment session |
| `POST /api/v1/hesabpay/verify-payment` | Verify a completed payment |

The provider redirects the customer back to the application's success or failure URL after checkout.
Those redirects are user-facing, not webhooks, and must not be treated as proof of payment; verification
is the authoritative step.

These endpoints require Sanctum authentication and are not part of the v2 integration surface.

## Broadcast channels

Laravel Reverb broadcasts real-time events to the browser for notifications and chat streaming. Channels
are authorised per user and per business in `routes/channels.php`.

External systems cannot subscribe to these channels with an integration token. They exist to keep the web
interface live, not to feed an ERP.

## Notification feed

The application polls a notification feed for the signed-in employee. The endpoints live under
`/api/v1/business/notifications` and rely on the browser session, so they are not usable by a
server-to-server integration.

If you need to react to business events outside the interface, poll the business resources instead.

## Recommended integration pattern

Until outbound webhooks are available, use **polling with a watermark**:

1. Store the newest `created_at` and `id` you have processed per resource.
2. Request `/api/v2/sales?from=<watermark date>` with `per_page=100`.
3. Discard rows you already have, process the rest.
4. Move the watermark forward.
5. Repeat on a schedule that fits your quota: for example every five minutes for orders and hourly for
   sales.

| Resource | Suggested cadence | Reason |
| --- | --- | --- |
| Orders | 5 minutes | Status changes are time-sensitive |
| Sales | 15–60 minutes | Reporting and reconciliation |
| Purchases | Hourly | Supplier documents change slowly |
| Stock | 15–60 minutes | Availability for other channels |
| Products | Daily | Catalog changes are infrequent |

Respect the quota when choosing a cadence. A five-minute poll is 288 requests per day per endpoint.

## Designing for a future webhook

If outbound webhooks are added later, the safest integration design is already prepared if you:

- keep the resource `id` as your primary external key;
- store `created_at` and use it as a watermark;
- make your processing idempotent;
- tolerate duplicate delivery;
- verify any future signature header before trusting a payload.

Idempotency is the important one: a webhook can be delivered more than once, and so can a polled page.

## What is not provided

- No subscriber registration endpoint.
- No event types or payload catalogue.
- No delivery logs or replay.
- No HMAC signature for outbound events.
- No websocket feed for integrations.

Do not scrape the web interface to compensate. It is session-based, changes without notice and violates
the read-only contract of the API.

## Related pages

- [Pagination & Filtering](/docs/api/pagination)
- [Rate Limits & Quotas](/docs/api/rate-limits)
- [Integration Guidelines](/docs/api/guideline)
- [Notifications](/docs/business/notifications)
