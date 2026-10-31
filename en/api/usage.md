---
title: Quick Start
section: api
---

# Quick Start

This page takes a credential from creation to a working first request in the shortest path. It assumes
you have access to **Settings > API integrations** and at least one active branch.

## 1. Create the credential

1. Open **Settings > API integrations** and choose **Create**.
2. Name it after the system that will use it, for example `Reporting sync`.
3. Select `products:read` and `sales:read` to start.
4. Keep it business-wide for a reporting integration, or select a single branch for a local tool.
5. Save and copy the secret. It will not be shown again.

## 2. Store the secret

```bash
export LAYATANAHI_TOKEN="12|your-secret-value"
export LAYATANAHI_BASE="https://app.example.com"
```

Never commit the token. Use your platform's secret store in production.

## 3. Check the context

The context endpoint confirms who the credential belongs to, which branches it may read and how much
quota remains.

```bash
curl -s "$LAYATANAHI_BASE/api/v2/context" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

```json
{
  "data": {
    "business": { "id": 7, "code": "layatanahi-main" },
    "employee": { "id": 42, "user_id": 19, "role_scope": "admin" },
    "branch_scope": { "allowed_branch_ids": [3, 4], "resolved_branch_id": null },
    "quota": {
      "plan": "free",
      "multiplier": 1,
      "timezone": "Asia/Kabul",
      "user": {
        "day": { "used": 1, "limit": 200, "remaining": 199, "reset_at": "..." },
        "month": { "used": 1, "limit": 2000, "remaining": 1999, "reset_at": "..." }
      }
    }
  }
}
```

Always call this first when debugging: a `manager` scope with several branches means you must send
`X-Business-Branch`.

## 4. Read products

```bash
curl -s "$LAYATANAHI_BASE/api/v2/products?search=iphone&per_page=10&language_code=en" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

```json
{
  "data": [
    {
      "id": 128,
      "code": "APL-IP15",
      "product_model": "iPhone 15",
      "product_name": "iPhone 15"
    }
  ],
  "links": { "first": "...", "last": "...", "prev": null, "next": null },
  "meta": { "current_page": 1, "per_page": 10, "total": 1 }
}
```

Products are returned only when at least one visible branch holds stock for them.

## 5. Read stock for a branch

```bash
curl -s "$LAYATANAHI_BASE/api/v2/stock?per_page=25" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

Each row is one stock record: branch, product, SKU, available, received, reserved, availability and
expiry.

## 6. Read sales for a period

```bash
curl -s "$LAYATANAHI_BASE/api/v2/sales?from=2026-10-01&to=2026-10-31&per_page=50" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

Use the returned `id` to fetch one sale with its line items and payments:

```bash
curl -s "$LAYATANAHI_BASE/api/v2/sales/9012" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

## 7. Read a purchase detail

```bash
curl -s "$LAYATANAHI_BASE/api/v2/purchases/451" \
  -H "Authorization: Bearer $LAYATANAHI_TOKEN" \
  -H "Accept: application/json"
```

Detail responses include the invoice, branch, supplier or customer, items and payments.

## Common parameters

| Parameter | Applies to | Notes |
| --- | --- | --- |
| `page` | All lists | Starts at 1 |
| `per_page` | All lists | 1–100, default 25 |
| `language_code` | Products, stock, purchases, sales | Two-letter code, optionally with a region |
| `search` | Products | Matches code, model or translated name |
| `from`, `to` | Purchases, orders, sales | Inclusive `YYYY-MM-DD` |
| `status` | Orders | One of the supported order statuses |

## Handling failures

```json
{
  "error": {
    "code": "api_ability_denied",
    "message": "This credential is not permitted to perform the requested operation."
  }
}
```

- `401`: fix the token.
- `403`: fix the ability or branch scope.
- `422`: send the branch, or correct a date.
- `429`: wait for `Retry-After`, then retry with backoff.

## Next steps

- [Endpoint Reference](/docs/api/reference)
- [Pagination & Filtering](/docs/api/pagination)
- [Errors](/docs/api/errors)
- [MCP Overview](/docs/mcp/overview)
