---
title: Endpoint Reference
section: api
---

# Endpoint Reference

This page lists every supported v2 endpoint, the ability it needs and the parameters it accepts. All
paths are relative to your application URL and require a bearer token.

## Endpoints

| Method | Path | Ability | Result |
| --- | --- | --- | --- |
| GET | `/api/v2/context` | Any valid credential | Credential, role scope, branches and quota |
| GET | `/api/v2/products` | `products:read` | Paginated product catalog |
| GET | `/api/v2/stock` | `stock:read` | Paginated stock rows |
| GET | `/api/v2/purchases` | `purchases:read` | Paginated purchases |
| GET | `/api/v2/purchases/{id}` | `purchases:read` | One purchase with items and payments |
| GET | `/api/v2/orders` | `orders:read` | Paginated orders |
| GET | `/api/v2/sales` | `sales:read` | Paginated sales |
| GET | `/api/v2/sales/{id}` | `sales:read` | One sale with items and payments |
| GET | `/api/v2/health` | None | Service health (no credential) |

`/api/v2/health` is outside the credential pipeline and returns `{"data":{"status":"ok"}}`. Use it for
uptime checks, not for authentication tests.

## Common query parameters

| Name | Type | Default | Applies to |
| --- | --- | --- | --- |
| `page` | integer ≥ 1 | 1 | All list endpoints |
| `per_page` | integer 1–100 | 25 | All list endpoints |
| `language_code` | string | App locale | Products, stock, purchases, sales |
| `from` | date `YYYY-MM-DD` | — | Purchases, orders, sales |
| `to` | date `YYYY-MM-DD`, optional | — | Purchases, orders, sales |
| `status` | enum | — | Orders |
| `search` | string ≤ 100 | — | Products |

`from` and `to` are inclusive. `to` must be on or after `from`. Invalid values produce `422` with a
validation payload.

## Response envelopes

### List

```json
{
  "data": [ { "id": 1 } ],
  "links": { "first": "...", "last": "...", "prev": null, "next": "..." },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 4,
    "per_page": 25,
    "path": "...",
    "to": 25,
    "total": 87
  }
}
```

### Detail

```json
{ "data": { "id": 451, "invoice": { }, "items": [], "payments": [] } }
```

### Context

```json
{
  "data": {
    "business": { "id": 7, "code": "..." },
    "employee": { "id": 42, "user_id": 19, "role_scope": "admin" },
    "branch_scope": { "allowed_branch_ids": [], "resolved_branch_id": null },
    "quota": { }
  }
}
```

### Error

```json
{ "error": { "code": "branch_scope_denied", "message": "..." } }
```

A missing detail record returns `404` with the shape `{"error":{"error":"not_found","message":"..."}}`.

## Status codes

| Code | When |
| --- | --- |
| 200 | Successful read |
| 401 | Missing, invalid or revoked credential |
| 403 | Ability, membership or branch scope denied |
| 404 | Detail record not found in the visible scope |
| 422 | Invalid filter, or a branch must be specified |
| 429 | Burst or quota limit reached |
| 500 | Unexpected server error |

## Field summary

| Resource | Fields |
| --- | --- |
| Product | `id`, `code`, `product_model`, `product_name` |
| Stock | `id`, `business_branch_id`, `product_id`, `product_code`, `product_model`, `product_name`, `sku`, `available_quantity`, `received_quantity`, `reserved_quantity`, `is_available`, `expiry_date` |
| Purchase list | `id`, `business_branch_id`, `invoice_number`, `grand_total`, `paid_amount`, `currency`, `supplier_name`, `status`, `status_id`, `purchase_datetime`, `created_at` |
| Sale list | `id`, `business_branch_id`, `invoice_number`, `grand_total`, `paid_amount`, `currency`, `customer_name`, `status`, `status_id`, `created_at` |
| Order list | `id`, `business_branch_id`, `order_number`, `tracking_number`, `status`, `invoice_number`, `grand_total`, `paid_amount`, `created_at` |
| Detail | `id`, `status`, `is_editable`, `is_deletable`, `created_at`, `invoice`, `branch`, `supplier` or `customer`, `items`, `payments` |

## Headers

| Header | Required | Purpose |
| --- | --- | --- |
| `Authorization` | Yes | `Bearer <token>` |
| `Accept` | Recommended | Use `application/json` |
| `X-Business-Branch` | Conditional | Target branch when several are granted |
| `MCP-Session-Id` | MCP only | Session continuity for the MCP transport |

## Unsupported operations

The API is read-only. The following are intentionally unavailable: creating or editing purchases, sales,
orders, products or stock; payments; returns; employee or role administration; settings changes.

## Related pages

- [Products](/docs/api/products)
- [Stock](/docs/api/stocks)
- [Purchases](/docs/api/purchases)
- [Orders](/docs/api/orders)
- [Sales](/docs/api/sales)
