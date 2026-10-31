---
title: Stock
section: api
---

# Stock

`GET /api/v2/stock` returns stock rows: one record per product variant per branch location. It is the
endpoint to use for availability, replenishment and warehouse reconciliation.

## Permission

| Requirement | Value |
| --- | --- |
| Ability | `stock:read` |
| Page permission | `inventory.branches.read` |
| Branch behaviour | Business-wide or branch-filtered |

## Query parameters

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `language_code` | string | App locale | Product name language |
| `page` | integer ≥ 1 | 1 | Page number |
| `per_page` | integer 1–100 | 25 | Page size |

Stock has no search or date filter. Narrow by branch with `X-Business-Branch`, or filter the returned
rows client-side.

## Request

```bash
curl -s "https://app.example.com/api/v2/stock?per_page=100" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

## Response

```json
{
  "data": [
    {
      "id": 5512,
      "business_branch_id": 4,
      "product_id": 128,
      "product_code": "NET-0042",
      "product_model": "AX3000",
      "product_name": "Router AX3000",
      "sku": "AX3000-BLK",
      "available_quantity": 12.0,
      "received_quantity": 20.0,
      "reserved_quantity": 8.0,
      "is_available": true,
      "expiry_date": null
    }
  ],
  "meta": { "current_page": 1, "last_page": 1, "per_page": 100, "total": 1 }
}
```

## Fields

| Field | Meaning |
| --- | --- |
| `id` | Stock row identifier |
| `business_branch_id` | Branch that physically holds the stock |
| `product_id`, `product_code`, `product_model` | Product identity |
| `product_name` | Translated name, falling back to the code |
| `sku` | Variant SKU |
| `available_quantity` | Quantity that can be sold now |
| `received_quantity` | Quantity received into the location |
| `reserved_quantity` | Quantity committed to open documents |
| `is_available` | Whether the row is published as available |
| `expiry_date` | Expiry date when the product has one |

Quantities are returned as numbers and may include decimals. Do not assume integers.

## Reading the quantities

| Question | Field combination |
| --- | --- |
| Can I promise 10 units? | `available_quantity >= 10` |
| How much did we receive in total? | `received_quantity` |
| Why is available lower than received? | `reserved_quantity` explains the difference |
| Is the row published? | `is_available` must be true |

Available is the number the sales flow trusts. Reserved is not sellable twice, even if it is physically
present.

## Ordering and pagination

Rows are ordered by stock `id` ascending. The default page size is 25 and the maximum is 100, so a full
warehouse requires paging.

## Common use cases

| Use case | Approach |
| --- | --- |
| Low-stock alerting | Page all rows, compare `available_quantity` to a threshold |
| Warehouse reconciliation | Request per branch and compare with a physical count |
| Expiry monitoring | Filter rows with a non-null `expiry_date` near today |
| Marketplace sync | Publish only rows where `is_available` is true |

## Limitations

- Read-only: no adjustments, transfers or merges through the API.
- Deleted stock rows and deleted variants are excluded.
- Stock from branches outside the credential scope is never returned.
- Cost prices are not exposed; only quantities and identity.

## Related pages

- [Products](/docs/api/products)
- [Inventory Overview](/docs/business/inventory/overview)
- [Endpoint Reference](/docs/api/reference)
