---
title: Inventory Overview
section: business
---

# Inventory Overview

Inventory answers a single, deceptively hard question: how much of each product do we have, where is
it, and how did it get there? The module keeps one stock row per product variant per location, records
every movement, and lets you correct quantities without losing the audit trail.

Stock is not a number typed once. It changes when you purchase, sell, transfer between locations,
return goods, merge duplicates or correct a count. Every one of those actions writes a configuration
entry you can review later.

## What this page is about

- The current quantity of each variant in each location your branch can reach.
- Pricing and discount information attached to a stock row.
- The complete history of changes, with a reason and the employee responsible.
- Access control over which branches may see and sell from a warehouse.

## Pages in this module

| Page | Purpose | Permission |
| --- | --- | --- |
| Products | Stock rows with price, quantity and quick actions | `inventory.products` |
| Product Stock View | One stock row with attributes, reviews and mutations | `inventory.products` |
| Branches | Warehouses and shops this branch can reach | `inventory.branches` |
| Configuration | Audit trail of every stock change | `inventory.configuration` |
| Merge Stocks | Consolidate duplicate rows of the same variant | `inventory.configuration` |

## What a stock row contains

| Field group | What it tells you |
| --- | --- |
| Identity | Product name, model, SKU, brand and country |
| Quantity | Available, received and reserved quantities |
| Pricing | Unit price, currency and optional quantity-based tiers |
| Location | The inventory or branch that physically holds the goods |
| Visibility | Whether the row is published to the global catalog |

The distinction between available and reserved matters. Available is what you can sell now; reserved is
committed to an open order and must not be promised twice.

## How stock changes

| Action | Where it happens | Effect |
| --- | --- | --- |
| Purchase | Purchase module | Quantity increases in the receiving inventory |
| Sale | Sale module | Quantity decreases from the selling location |
| Return to supplier | Purchase returns | Quantity decreases |
| Customer return | Sale returns | Quantity is restored |
| Transfer | Product stock view | Quantity moves between locations |
| Adjust or reduce | Product stock view | Quantity is corrected with a reason |
| Merge | Merge Stocks | Duplicate rows are combined into one |

Each action writes a configuration entry with the previous and new quantity, the employee and the
reason. That entry is what makes an inventory trustworthy.

## What is restricted

- Stock rows are branch-scoped. You only see the inventories your branch has been granted access to, and
  every list, search and total respects that grant.
- Reading requires the page capability; every mutation requires write. A read-only user can browse stock
  but cannot adjust, transfer, reprice or merge.
- Quantities can never become negative. The server rejects a reduction larger than the available
  quantity even if the client validation is bypassed.
- A reason is mandatory for adjustments, transfers, price changes and merges. Without it the action is
  rejected, which keeps the audit trail meaningful.
- Grants between branches and warehouses are managed with `inventory.branches` write and are restricted
  to branch administrators.
- Stock rows that are fully consumed are soft-deleted, not destroyed, so their history remains visible
  to audit.

## Recommended routine

1. Confirm that every warehouse your branch uses is listed under Branches and granted.
2. Record purchases with the correct receiving inventory; never correct stock by editing a number
   directly when a purchase could explain the change.
3. Review Configuration weekly to catch unexplained reductions.
4. Use Merge Stocks whenever duplicate rows appear for the same variant.
5. Keep prices current from the product stock view so sales do not use stale tiers.

## Related pages

- [Inventory Listing](/docs/business/inventory/listing)
- [Product Stock View](/docs/business/inventory/product-detail)
- [Branches & Warehouses](/docs/business/inventory/branches)
- [Configuration History](/docs/business/inventory/configurations)
- [Stock Transfers](/docs/business/inventory/transfers)
- [Merge Stocks](/docs/business/inventory/merge-stocks)
