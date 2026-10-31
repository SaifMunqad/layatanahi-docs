---
title: Orders
section: api
---

# Orders

`GET /api/v2/orders` returns inter-branch orders visible to the business. An order is the document that
precedes a purchase or a sale between branches; it carries a status, a tracking number and invoice
totals.

## Permission

| Requirement | Value |
| --- | --- |
| Ability | `orders:read` |
| Page permission | `sale.orders.read` |
| Branch behaviour | Business-wide or branch-filtered |

## Query parameters

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `from` | date | — | Inclusive start, based on order creation |
| `to` | date | — | Inclusive end; must be on or after `from` |
| `status` | enum | — | One of the supported statuses |
| `page` | integer ≥ 1 | 1 | Page number |
| `per_page` | integer 1–100 | 25 | Page size |

Supported status values: `pending`, `deleted`, `shipped`, `completed`, `approved`, `denied`. Any other
value is rejected with `422`.

## Request

```bash
curl -s "https://app.example.com/api/v2/orders?status=pending&from=2026-10-01" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

## Response

```json
{
  "data": [
    {
      "id": 88,
      "business_branch_id": 4,
      "order_number": "ORD-2026-0088",
      "tracking_number": "TRK-99120",
      "status": "pending",
      "invoice_number": "INV-2026-7781",
      "grand_total": 18500.0,
      "paid_amount": 0.0,
      "created_at": "2026-10-24 09:02:11"
    }
  ],
  "meta": { "current_page": 1, "last_page": 1, "per_page": 25, "total": 1 }
}
```

## Fields

| Field | Meaning |
| --- | --- |
| `id` | Order identifier |
| `business_branch_id` | The branch on your side of the order |
| `order_number` | Human-readable order reference |
| `tracking_number` | Carrier or internal tracking reference, when present |
| `status` | Current order status |
| `invoice_number` | Invoice linked to the order |
| `grand_total`, `paid_amount` | Invoice totals in the invoice currency |
| `created_at` | Order creation timestamp |

The response does not include the order's line items. Use the web interface or the purchase and sale
endpoints for line-level detail.

## Status meanings

| Status | Meaning |
| --- | --- |
| `pending` | Created and awaiting a decision |
| `approved` | Accepted by the receiving branch |
| `shipped` | Goods dispatched |
| `completed` | Fulfilled and closed |
| `denied` | Refused by the receiving branch |
| `deleted` | Soft-deleted but still reported by the filter |

`deleted` only appears when explicitly requested. It represents an order that was removed from active
use; do not treat it as a fulfilment state.

## Branch matching

An order is returned when either side belongs to a visible branch:

- the invoice was issued by a visible branch, or
- the invoice is addressed to a visible branch.

`business_branch_id` reports the branch on your side. When a credential is limited to one branch, only
orders involving that branch appear.

## Ordering

Orders are returned newest first by creation time, which makes incremental sync simple: request the first
page and stop when you reach an order you already store.

## Common use cases

| Use case | Approach |
| --- | --- |
| Incoming order queue | Filter `status=pending` for the branch |
| Shipment tracking | Read `tracking_number` for `shipped` orders |
| Cross-branch reconciliation | Compare order totals with the linked purchase or sale |
| Daily digest | Request `from` today, group by status |

## Limitations

- Read-only: orders cannot be created, accepted or deleted through the API.
- Line items are not included.
- Amounts are in the invoice currency with no conversion.
- Orders outside the visible branch scope are excluded entirely.

## Related pages

- [Purchases](/docs/api/purchases)
- [Sales](/docs/api/sales)
- [Sale Orders](/docs/business/sale/orders)
- [Endpoint Reference](/docs/api/reference)
