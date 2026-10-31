---
title: Products
section: api
---

# Products

`GET /api/v2/products` returns the product catalog of the business. A product appears only when at least
one branch visible to the credential holds an active stock row for one of its variants, which keeps the
catalog aligned with what the business can actually sell.

## Permission

| Requirement | Value |
| --- | --- |
| Ability | `products:read` |
| Page permission | `inventory.products.read` |
| Branch behaviour | Business-wide or branch-filtered |

## Query parameters

| Parameter | Type | Default | Notes |
| --- | --- | --- | --- |
| `search` | string ≤ 100 | — | Matches product code, model or translated name |
| `language_code` | string | App locale | Two-letter code, optionally with a region |
| `page` | integer ≥ 1 | 1 | Page number |
| `per_page` | integer 1–100 | 25 | Page size |

There is no date filter for products. Search is a `LIKE` match, so short terms return broad results.

## Request

```bash
curl -s "https://app.example.com/api/v2/products?search=router&language_code=fa_AF" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/json"
```

## Response

```json
{
  "data": [
    {
      "id": 128,
      "code": "NET-0042",
      "product_model": "AX3000",
      "product_name": "روتر ای‌ایکس ۳۰۰۰"
    }
  ],
  "links": { "first": "...", "last": "...", "prev": null, "next": null },
  "meta": { "current_page": 1, "last_page": 1, "per_page": 25, "total": 1 }
}
```

## Fields

| Field | Meaning |
| --- | --- |
| `id` | Product identifier, stable across languages |
| `code` | Internal product code |
| `product_model` | Manufacturer model |
| `product_name` | Translated name, falling back to the product code |

The product name is resolved for the requested language. If no translation exists, the API returns the
product code rather than an empty string.

## Language handling

1. If `language_code` is supplied, it is normalized (for example `fa-AF` becomes `fa_AF`).
2. If it is omitted, the application locale is used.
3. If the language is unknown, the first language in the database is used.
4. Within a language, one translation is selected deterministically.

Pin the language in the integration so names do not change when a user changes their interface language.

## Scope behaviour

- Business-wide credential: products stocked in any active branch.
- Branch-scoped credential: only products stocked in the granted branches.
- `X-Business-Branch` narrows the result to that branch.

A product with stock only in a branch you cannot see does not appear, even if you know its code.

## Pagination and ordering

Products are ordered by `id` ascending, which is stable across pages. Use `per_page` up to 100 and follow
the `next` link. See [Pagination & Filtering](/docs/api/pagination).

## Common use cases

| Use case | Approach |
| --- | --- |
| Catalog sync | Page through all products, store `id` as the external key |
| Barcode lookup | Search by `code` or model |
| Localized catalog | Request with a fixed `language_code` |
| Availability check | Combine with `/api/v2/stock` for quantities |

## Limitations

- Read-only: products cannot be created or edited.
- Cost prices and supplier data are not exposed.
- Only products with active stock in a visible branch appear.
- `search` does not accept wildcards; it is a substring match.

## Related pages

- [Stock](/docs/api/stocks)
- [Endpoint Reference](/docs/api/reference)
- [Errors](/docs/api/errors)
