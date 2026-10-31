---
title: Purchase Overview
section: business
---

# Purchase Overview

The Purchase module records everything the business brings **in**: goods bought from suppliers, stock
received from another branch, supplier orders, bills you owe, and returns you send back. It is the
counterpart of the Sale module and the main source of stock entering your branch.

Purchases are financial documents, not just stock movements. Every purchase creates an invoice, a
payment against a branch account, stock rows for the receiving inventory, and an activity trail. That
is why the module is protected by several pages, each with its own read and write level.

## The purchase lifecycle

A purchase usually passes through these stages:

1. **Order** — you compose a purchase order for a supplier or another branch. Nothing moves yet.
2. **Receive** — the order becomes a purchase; stock is added to the receiving inventory.
3. **Bill** — the invoice records what you owe and how much has been paid.
4. **Payment** — money leaves a branch account, partially or in full.
5. **Return** — damaged or incorrect goods go back, with a refund or a reduced invoice.

Not every purchase needs an order. Many branches record the purchase directly when the goods arrive,
and settle the bill later from the Records page.

## Pages in this module

| Page | Purpose | Permission |
| --- | --- | --- |
| Purchases | Register of branch purchase invoices | `purchase.purchases` |
| Make Purchase | Record a purchase and pay it | `purchase.purchases` write |
| View Purchase | Printable invoice with payments and returns | `purchase.purchases` |
| Suppliers | Directory of business suppliers | `purchase.suppliers` |
| Purchase Orders | Orders sent to suppliers or branches | `purchase.orders` |
| Purchase Requests | Requests from other branches awaiting your decision | `purchase.requests` |
| Records | Bills, payments and totals | `purchase.records` |
| Returns | Goods returned to suppliers | `purchase.returns` |

## Statuses you will see

Purchases share a common trade status set with sales:

| Value | Meaning |
| --- | --- |
| Draft | Created but not yet confirmed |
| Pending approval | Waiting for the receiving side to accept |
| Approved | Accepted, stock may not be received yet |
| Ordered | Sent to the supplier |
| Received | Fully received |
| Partially received | Some lines arrived |
| Cancelled | Abandoned before completion |
| Returned | Fully returned |
| Payment pending | Goods received, money still owed |
| Completed | Received and paid |
| In stock | Stocked and available |

Invoices carry their own payment status: unpaid, partially paid or paid. A purchase can be *Received*
while its invoice is still *unpaid*; both facts matter and both appear on the screen.

## What is restricted

- All purchase lists are branch-scoped. You only see invoices, orders, payments and returns issued by
  or addressed to the branch selected in your session.
- Editing and deleting are controlled per record with two flags, **editable** and **deletable**. Once a
  colleague clears a flag from the purchase view, the corresponding action disappears from the list and
  the edit URL refuses to open.
- Paying requires the invoice to belong to your branch and the account to be an active branch account
  in the matching currency.
- Returns cannot exceed what was purchased, and cannot exceed the quantity still on hand.
- Suppliers are business-wide, so a supplier created in one branch is visible in all of them. Purchase
  documents are not.
- Amounts, account balances and stock are updated inside a database transaction. A failed payment or
  stock update rolls the whole operation back.

## Recommended workflow

1. Create or import suppliers from **Purchase > Suppliers**.
2. Record a purchase from **Make Purchase**, choosing the receiving inventory and the account that pays.
3. Open the invoice from **Records > Bills** when the supplier is paid later.
4. Use **Returns** when goods come back, and let the system adjust stock and the invoice.
5. Lock the document by clearing its editable flag once the paperwork is final.

## Related pages

- [Purchase Listing](/docs/business/purchase/listing)
- [Make Purchase](/docs/business/purchase/create)
- [Filters & Search](/docs/business/purchase/filters)
- [Suppliers](/docs/business/purchase/suppliers)
- [Purchase Orders](/docs/business/purchase/orders)
- [Records](/docs/business/purchase/records)
- [Returns](/docs/business/purchase/returns)
