---
title: Pagination & Filtering
section: api
---

# Pagination & Filtering

Every list endpoint is paginated with the standard Laravel pagination envelope. Detail endpoints are not
paginated; they return a single `data` object.

Because collections can be large, integrations should page deliberately and store a stable external key
rather than relying on row position.

## Parameters

| Parameter | Type | Default | Maximum | Applies to |
| --- | --- | --- | --- | --- |
| `page` | integer | 1 | — | All lists |
| `per_page` | integer | 25 | 100 | All lists |

Values outside the accepted range produce a `422` validation response. Fractional or non-numeric values
are rejected rather than truncated.

## Envelope

```json
{
  "data": [],
  "links": {
    "first": "https://app.example.com/api/v2/sales?page=1",
    "last": "https://app.example.com/api/v2/sales?page=4",
    "prev": null,
    "next": "https://app.example.com/api/v2/sales?page=2"
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 4,
    "per_page": 25,
    "path": "https://app.example.com/api/v2/sales",
    "to": 25,
    "total": 87
  }
}
```

| Meta field | Meaning |
| --- | --- |
| `current_page` | Page returned in this response |
| `last_page` | Highest page available for the same filters |
| `per_page` | Page size applied |
| `from`, `to` | Row range on this page; `null` when the page is empty |
| `total` | Total rows matching the filters |
| `path` | Base URL, without query parameters |

`links.prev` and `links.next` are `null` at the boundaries. Follow `next` until it is `null`; do not
increment the page number blindly, because the filter set may change underneath you.

## Query strings are preserved

Pagination links keep your filters. A request with `from=2026-10-01&status=pending` produces links that
still contain those parameters, which makes a "follow the next link" loop safe.

## Ordering

| Resource | Order |
| --- | --- |
| Products | `id` ascending |
| Stock | stock `id` ascending |
| Purchases | newest first |
| Sales | newest first |
| Orders | `created_at` descending |

Ordering is stable for a fixed data set. If records are inserted while you page, use a date filter or a
"created after" watermark instead of page numbers for incremental sync.

## Incremental sync pattern

1. Read the first page with `from` set to your last successful watermark.
2. Process rows, storing the resource `id` and `created_at`.
3. Move the watermark to the newest `created_at` you processed.
4. Stop after the first page if the newest row is already known.

This avoids duplicates and keeps the number of requests low.

## Filter summary

| Endpoint | Available filters |
| --- | --- |
| `/api/v2/products` | `search`, `language_code` |
| `/api/v2/stock` | `language_code` (branch via header) |
| `/api/v2/purchases` | `from`, `to`, `language_code`, `id` |
| `/api/v2/orders` | `from`, `to`, `status` |
| `/api/v2/sales` | `from`, `to`, `language_code`, `id` |

## Date filters

- Format: `YYYY-MM-DD`.
- Both bounds are inclusive.
- `to` must be on or after `from`.
- Omitting both bounds returns the full history ordered newest first.
- Dates are interpreted in the application timezone; timestamps in responses are stored values, so compare
  them consistently.

## Choosing a page size

| Purpose | Suggested `per_page` |
| --- | --- |
| Interactive lookup | 10–25 |
| Nightly sync | 100 |
| Reconciliation export | 100 with date windows |

Large pages cost less quota per record, because quota is charged per request rather than per row.

## Related pages

- [Endpoint Reference](/docs/api/reference)
- [Quick Start](/docs/api/usage)
- [Rate Limits & Quotas](/docs/api/rate-limits)
