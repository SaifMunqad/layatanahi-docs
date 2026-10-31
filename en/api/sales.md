---
title: Sales
section: api
---

# Sales

`GET /api/v2/sales` returns sale invoices issued by the business, and `GET /api/v2/sales/{id}` returns one
sale with its invoice, customer, items and payments.

## Permission

| Requirement | Value |
| --- | --- |
| Ability | `sales:read` |
| Page permission | `sale.sales.read` |
| Branch behaviour | Business-wide or branch-filtered |

## Query parameters

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `from` | date | — | Inclusive start of the sale period |
| `to` | date | — | Inclusive end; must be on or after `from` |
| `language_code` | string | App locale | Product names in line items |
| `page` | integer ≥ 1 | 1 | Page number |
| `per_page` | integer 1–100 | 25 | Page size |
| `id` | integer ≥ 1 | — | Returns one sale in `data` instead of a list |

## List request

```bash
curl -s "https://app.example.com/api/v2/sales?from=2026-10-01&to=2026-10-31&per_page=50" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

## List response

```json
{
  "data": [
    {
      "id": 9012,
      "business_branch_id": 4,
      "invoice_number": "SAL-2026-9012",
      "grand_total": 9800.0,
      "paid_amount": 9800.0,
      "currency": "AFN",
      "customer_name": "Ahmad Karimi",
      "status": "Completed",
      "status_id": 10,
      "created_at": "2026-10-26 16:41:09"
    }
  ],
  "meta": { "current_page": 1, "last_page": 1, "per_page": 50, "total": 1 }
}
```

## Detail request

```bash
curl -s "https://app.example.com/api/v2/sales/9012" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

## Detail response

```json
{
  "data": {
    "id": 9012,
    "status": "Completed",
    "is_editable": false,
    "is_deletable": false,
    "created_at": "2026-10-26 16:41:09",
    "invoice": {
      "id": 12045,
      "invoice_number": "SAL-2026-9012",
      "total_amount": 9800.0,
      "tax_amount": 0.0,
      "discount_amount": 200.0,
      "miscellaneous_amount": 0.0,
      "grand_total": 9600.0,
      "paid_amount": 9600.0,
      "due_date": null,
      "currency": { "code": "AFN", "symbol": "؋" },
      "notes": null
    },
    "branch": { "id": 4, "username": "kabul-main", "name": "Kabul Main" },
    "customer": {
      "id": 311,
      "first_name": "Ahmad",
      "last_name": "Karimi",
      "organization": null,
      "phone": "+93700000000",
      "email": null
    },
    "items": [
      {
        "id": 42011,
        "product_code": "NET-0042",
        "product_name": "Router AX3000",
        "sku": "AX3000-BLK",
        "quantity": 2.0,
        "unit_price": 4900.0,
        "total_price": 9800.0,
        "comment": null
      }
    ],
    "payments": [
      {
        "id": 8821,
        "amount": 9600.0,
        "payment_date": "2026-10-26",
        "payment_status": "completed",
        "account": "Kabul Cash"
      }
    ]
  }
}
```

## Fields

| Field | Meaning |
| --- | --- |
| `status`, `status_id` | Trade status label and identifier |
| `is_editable`, `is_deletable` | Whether the source system may still change the document |
| `invoice` | Totals, discount, tax, currency and notes |
| `branch` | Issuing branch of the sale |
| `customer` | Receiving customer when the receiver is a customer; `null` for inter-branch sales |
| `items` | Line items with quantity, unit price and total |
| `payments` | Payments recorded against the invoice |

For a sale where the receiver is another branch, `customer` is `null`. Use `business_branch_id` and the
order endpoints to reconcile inter-branch movements.

## Discounts and totals

`total_amount` is the sum of the line items before adjustments. `grand_total` is what the customer owes:
lines, plus tax and miscellaneous amounts, minus the discount. `paid_amount` is what has been collected.
Outstanding is `grand_total - paid_amount`.

## Missing records

A sale outside the visible branch scope, or a deleted sale, returns `404`:

```json
{ "error": { "error": "not_found", "message": "Sale not found." } }
```

## Common use cases

| Use case | Approach |
| --- | --- |
| Daily revenue | Request `from` and `to` for today, sum `grand_total` |
| Receivables | List by period, compute `grand_total - paid_amount` |
| Customer history | Filter the list by `customer_name`, then fetch details |
| Accounting export | Page all sales in a period and store invoice and item lines |

## Limitations

- Read-only: no sale creation, editing, payment, deletion or return.
- Only sales issued by a visible branch are returned.
- Amounts are returned in the invoice currency with no conversion.
- Returns are not exposed as a separate resource; they appear only in the web interface.

## Related pages

- [Purchases](/docs/api/purchases)
- [Orders](/docs/api/orders)
- [Sale Listing](/docs/business/sale/listing)
- [Pagination & Filtering](/docs/api/pagination)
