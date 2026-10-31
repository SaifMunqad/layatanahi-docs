---
title: Sale Overview
section: business
---

# Sale Overview

The Sale module records everything that leaves the business: counter sales, sales to other branches,
customer orders, invoices, receipts and returns. It is the counterpart of Purchase and the main source
of revenue, stock reduction and customer balances.

A sale is a financial event. Saving one creates an invoice, a payment (when paid), stock movements in
the selling location, a customer balance change and an activity trail. That is why the module spans
several pages, each with its own capability.

## The sale lifecycle

1. **Sell** — you record the items, the receiver, the price and the account.
2. **Invoice** — the document records the total, the paid amount and the outstanding due.
3. **Payment** — money arrives in a branch account, immediately or later.
4. **Delivery** — goods leave the stock location.
5. **Return** — a customer brings goods back and the invoice is adjusted.

Sales to another branch follow a different path: the receiving branch must accept the sale before it
becomes a purchase and stock moves there. Until then the sale sits in **Pending approval**.

## Pages in this module

| Page | Purpose | Permission |
| --- | --- | --- |
| Sell | Normal sale form with cart and payment | `sale.sell` |
| Quick Sell | Fast counter entry with profit preview | `sale.sell` |
| Sales | Register of branch sale invoices | `sale.sales` |
| View Sale | Printable invoice with payments and returns | `sale.sales` |
| Customers | Business-wide customer directory | `sale.customers` |
| Sale Orders | Orders received from other branches | `sale.orders` |
| Sale Requests | Requests your branch sent to other branches | `sale.requests` |
| Records | Invoices, payments and totals | `sale.records` |
| Returns | Refunds against branch sales | `sale.returns` |

## Statuses you will see

| Value | Meaning |
| --- | --- |
| Draft | Saved but not confirmed |
| Pending approval | Waiting for the receiving branch to accept |
| Approved | Accepted by the receiver |
| Ordered | Order placed |
| Received | Goods received by the receiver |
| Partially received | Part of the order arrived |
| Cancelled | Abandoned |
| Returned | Fully returned |
| Payment pending | Goods delivered, money still owed |
| Completed | Delivered and paid |
| In stock | Available in the receiving stock |

Separately, every invoice has a payment status: unpaid, partially paid or paid. A sale can be Completed
while its invoice is partially paid; both facts appear on the document.

## What is restricted

- Every list is branch-scoped to the branch that issued the sale. Another branch's sales are never
  visible, even with a direct link.
- Selling requires `sale.sell` write. The normal and quick sell screens are treated as write pages even
  though they open with a GET request, because opening them is the start of a financial action.
- The receiver must belong to the business and cannot be your own branch. Selling to yourself is
  rejected.
- The sale currency must match the currency of every product's stock row. Mixed-currency carts are
  rejected.
- Over-quantity selling is only allowed when the branch explicitly enables it in its settings.
- Stock, account balances, invoices and payment requests are written in one transaction; a failure rolls
  everything back.
- Deleting and editing are controlled per record with the editable and deletable flags, exactly like
  purchases.

## Recommended workflow

1. Confirm the branch account that receives money exists for each currency you sell in.
2. Add or import customers, or sell to a branch as the receiver.
3. Record the sale from **Sell**, choosing the reserve account when the customer pays now.
4. Use **Records** to collect outstanding invoices later.
5. Use **Returns** when goods come back, and lock the document once it is final.

## Related pages

- [Make Sale](/docs/business/sale/sell)
- [Quick Sell](/docs/business/sale/quick-sell)
- [Sale Listing](/docs/business/sale/listing)
- [View Sale](/docs/business/sale/show)
- [Customers](/docs/business/sale/customers)
- [Records](/docs/business/sale/records)
- [Returns](/docs/business/sale/returns)
