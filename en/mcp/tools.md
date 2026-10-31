---
title: MCP Tools
section: mcp
---

# MCP Tools

The server exposes five tools. Each one maps to a read operation and shares a common parameter set, so a
client that can call one can call them all.

Tool names and schemas are returned by `tools/list`; this page documents what those schemas contain.

## Shared parameters

| Parameter | Type | Rules | Purpose |
| --- | --- | --- | --- |
| `id` | integer | ≥ 1 | Fetch one record with full detail |
| `branch_id` | integer | ≥ 1 | Target branch |
| `per_page` | integer | 1–100 | Page size |
| `page` | integer | ≥ 1 | Page number |
| `language_code` | string | `xx` or `xx-YY` | Product name language |

Invalid arguments are rejected before the query runs. The server validates with the same rules as the HTTP
API, so an out-of-range `per_page` fails rather than being clamped.

## Products

**Description:** search the authenticated employee's business product catalog.

| Extra parameter | Type | Rules |
| --- | --- | --- |
| `search` | string | Up to 100 characters; matches code, model or translated name |

```json
{
  "name": "products",
  "arguments": {
    "search": "router",
    "language_code": "en",
    "per_page": 10
  }
}
```

Returns a paginated product list with `id`, `code`, `product_model` and `product_name`.

## Stock

**Description:** read stock levels for the authenticated employee's business.

| Extra parameter | Type | Rules |
| --- | --- | --- |
| — | — | Only the shared parameters apply |

```json
{
  "name": "stock",
  "arguments": {
    "branch_id": 4,
    "per_page": 50
  }
}
```

Returns stock rows with branch, product identity, SKU, available, received, reserved, availability and
expiry. Use `branch_id` or the header; a multi-branch credential without either fails with
`branch_required`.

## Purchases

**Description:** read recent purchases scoped to the authenticated employee's business and branch.

| Extra parameter | Type | Rules |
| --- | --- | --- |
| `from` | string | `YYYY-MM-DD`, inclusive |
| `to` | string | `YYYY-MM-DD`, on or after `from` |

```json
{
  "name": "purchases",
  "arguments": {
    "from": "2026-10-01",
    "to": "2026-10-31",
    "per_page": 25
  }
}
```

With `id`, the tool returns one purchase with invoice, branch, supplier, items and payments. Without `id`,
it returns the paginated list.

## Orders

**Description:** read recent orders scoped to the authenticated employee's business and branch.

| Extra parameter | Type | Rules |
| --- | --- | --- |
| `from`, `to` | string | `YYYY-MM-DD` |
| `status` | string | `pending`, `deleted`, `shipped`, `completed`, `approved`, `denied` |

```json
{
  "name": "orders",
  "arguments": {
    "status": "pending",
    "branch_id": 4
  }
}
```

Returns orders with order number, tracking number, status, invoice number and totals. Line items are not
included.

## Sales

**Description:** read recent sales scoped to the authenticated employee's business and branch.

| Extra parameter | Type | Rules |
| --- | --- | --- |
| `from` | string | `YYYY-MM-DD` |
| `to` | string | `YYYY-MM-DD`, on or after `from` |

```json
{
  "name": "sales",
  "arguments": {
    "from": "2026-10-01",
    "to": "2026-10-31",
    "branch_id": 4,
    "per_page": 25
  }
}
```

With `id`, returns one sale with invoice, customer, items and payments.

## Result shape

| Call | Result |
| --- | --- |
| List | Pagination object with `data`, `links` and `meta` |
| Detail via `id` | Document object with nested `invoice`, counterparty, `items` and `payments` |
| Not found | Tool error text, for example `Purchase not found.` |
| Ability denied | Tool error text explaining the employee is not permitted |

The tool result is JSON encoded as text content in the MCP response. A client should parse it as JSON when
the tool succeeds.

## Choosing parameters well

- Always pass `branch_id` when the credential has more than one branch.
- Use `per_page=100` for summarisation tasks to reduce round trips.
- Use `from` and `to` for period questions; otherwise the assistant may summarise the full history.
- Pass `language_code` when the assistant must quote product names in a specific language.
- Fetch a detail with `id` only after a list call; detail calls are more expensive per record.

## What tools cannot do

- There is no tool to create, update or delete records.
- There is no tool for accounts, salaries, employees or roles.
- There is no free-text query language; arguments are typed and validated.
- There is no cross-business lookup.

## Related pages

- [MCP Server](/docs/mcp/server)
- [MCP Authentication](/docs/mcp/authentication)
- [Client Setup](/docs/mcp/client-setup)
- [Errors](/docs/api/errors)
