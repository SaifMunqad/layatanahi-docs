---
title: Purchases
section: api
---

# Purchases

`GET /api/v2/purchases` returns purchase invoices received by the business, and
`GET /api/v2/purchases/{id}` returns one purchase with its invoice, supplier, items and payments.

## Permission

| Requirement | Value |
| --- | --- |
| Ability | `purchases:read` |
| Page permission | `purchase.purchases.read` |
| Branch behaviour | Business-wide or branch-filtered |

## Query parameters

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `from` | date | — | Inclusive start of the purchase period |
| `to` | date | — | Inclusive end; must be on or after `from` |
| `language_code` | string | App locale | Product names in line items |
| `page` | integer ≥ 1 | 1 | Page number |
| `per_page` | integer 1–100 | 25 | Page size |
| `id` | integer ≥ 1 | — | Returns one purchase in `data` instead of a list |

## List request

```bash
curl -s "https://app.example.com/api/v2/purchases?from=2026-10-01&to=2026-10-31" \
  -H "Authorization: Bearer $TOKEN" \
  -H "X-Business-Branch: 4" \
  -H "Accept: application/json"
```

## List response

```json
{
  "data": [
    {
      "id": 451,
      "business_branch_id": 4,
      "invoice_number": "PUR-2026-0451",
      "grand_total": 42000.0,
      "paid_amount": 20000.0,
      "currency": "AFN",
      "supplier_name": "Kabul Electronics",
      "status": "Completed",
      "status_id": 10,
      "purchase_datetime": "2026-10-21 10:14:00",
      "created_at": "2026-10-21 10:14:02"
    }
  ],
  "meta": { "current_page": 1, "last_page": 1, "per_page": 25, "total": 1 }
}
```

## Detail request

```bash
curl -s "https://app.example.com/api/v2/purchases/451" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

## Detail response

```json
{
  "data": {
    "id": 451,
    "status": "Completed",
    "is_editable": false,
    "is_deletable": false,
    "created_at": "2026-10-21 10:14:02",
    "invoice": {
      "id": 8801,
      "invoice_number": "PUR-2026-0451",
      "total_amount": 42000.0,
      "tax_amount": 0.0,
      "discount_amount": 0.0,
      "miscellaneous_amount": 500.0,
      "grand_total": 42500.0,
      "paid_amount": 20000.0,
      "due_date": "2026-11-20",
      "currency": { "code": "AFN", "symbol": "؋" },
      "notes": null
    },
    "branch": { "id": 4, "username": "kabul-main", "name": "Kabul Main" },
    "supplier": { "id": 12, "name": "Kabul Electronics", "phone": "+93700000000", "email": null },
    "items": [
      {
        "id": 9901,
        "product_code": "NET-0042",
        "product_name": "Router AX3000",
        "sku": "AX3000-BLK",
        "quantity": 20.0,
        "unit_price": 2100.0,
        "total_price": 42000.0,
        "comment": null
      }
    ],
    "payments": [
      {
        "id": 771,
        "amount": 20000.0,
        "payment_date": "2026-10-21",
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
| `status`, `status_id` | Trade status label and numeric identifier |
| `is_editable`, `is_deletable` | Document lock flags, useful to know whether the source system may still change |
| `invoice` | Totals, currency, due date and notes |
| `branch` | Receiving branch of the purchase |
| `supplier` | Supplier identity when the counterparty is a supplier |
| `items` | Line items with quantity, unit price and total |
| `payments` | Payments recorded against the invoice |

Amounts are returned as numbers in the invoice currency; `currency.code` identifies it. No conversion is
performed.

## Missing records

A purchase outside the visible branch scope, or a deleted purchase, returns `404`:

```json
{ "error": { "error": "not_found", "message": "Purchase not found." } }
```

Note the nested shape: the outer key is `error` and the inner object also uses `error` as a code field.

## Common use cases

| Use case | Approach |
| --- | --- |
| Payables ageing | List by period, compute `grand_total - paid_amount` |
| Supplier statement | Filter by date, group by `supplier_name` |
| Line-level reconciliation | Fetch details for purchases flagged as not editable |
| ERP sync | Poll by `created_at`, store the purchase `id` |

## Limitations

- Read-only: no purchase creation, editing, payment or return.
- Only invoices received by a visible branch are returned.
- Purchase orders are a separate resource; see [Orders](/docs/api/orders).
- Cost data is available only through purchase documents, not through the stock endpoint.

## Related pages

- [Quick Start](/docs/api/usage)
- [Orders](/docs/api/orders)
- [Sales](/docs/api/sales)
- [Errors](/docs/api/errors)
