---
title: Purchase Orders
section: business
---

# Purchase Orders

A purchase order is a request to a supplier or another branch: "send us these products at these
prices". It does not move stock or money. It documents an intention and becomes a purchase only when
the goods are received.

Orders are useful when procurement takes days, when a supplier needs a written order, or when several
people must agree before money is committed.

## What this page is about

- Composing an order with per-line purchase and sell prices.
- Tracking which orders are still pending, shipped or completed.
- Printing an order for the supplier.
- Deleting orders that will not be fulfilled.

## Page layout

| Screen | What it shows |
| --- | --- |
| Orders list | Supplier or branch, status, date, product count, total and actions |
| Create order | Supplier search, currency, cash reserve, product lines and totals |
| View order | Printable document with supplier, lines, payments and totals |

The list is not paginated: it returns the branch's complete order set. If your branch issues many
orders, use the status colour and the date column to navigate.

## Status colours

| Colour | Meaning |
| --- | --- |
| Yellow | Pending — waiting for the supplier or receiving branch |
| Green | Approved, complete or completed |
| Blue | Shipped — on the way |
| Red | Rejected or cancelled |
| Orange | Any other intermediate state |

## How to use it

### Create an order

1. Open **Purchase > Orders** and choose **Create**.
2. Search for the supplier, or pick a business branch as the counterparty.
3. Choose the currency and, optionally, the cash reserve that will pay when the order is received.
4. Add each product with its purchase price, quantity and intended sell price.
5. Review the totals and submit.

| Field | Required | Rules |
| --- | --- | --- |
| Supplier | Yes | Must be an existing business branch or supplier |
| Currency | Yes | Must exist |
| Product | Yes, at least one | Positive identifier |
| Purchase price | Yes per line | At least one unit of currency |
| Sell price | Yes per line | Zero or greater |
| Quantity | Yes per line | At least one |

### Edit an order

Open the order and choose **Edit**. Editing is only possible while the order is still pending. Once it
has been approved, shipped or received, the order is locked and must be corrected with a return or a new
order.

Editing replaces the product lines and recalculates the totals. The counterparty receives an "order
updated" notification, and the linked payment request is refreshed.

### View and print

The view page is a clean printable document with the order number, supplier, receiving branch and
product table. It includes a payment summary when payments exist. Order tracking is shown as a
placeholder and is not yet part of the product.

### Delete orders

Select one or more rows and choose delete. An order can only be deleted while it is not approved and
while its linked purchase is still deletable. Deleting an order removes the linked purchase documents as
well.

## What is restricted

- Reading requires `purchase.orders` read; creating, editing and deleting require write.
- Orders are branch-scoped: a branch sees the orders it issued. Another branch's order is not reachable.
- No stock or ledger movement happens until the order is received or accepted. Creating an order never
  changes an account balance.
- Editing is blocked once the order leaves the pending state.
- Deleting is blocked when the linked document has already been locked.
- Bulk status changes (ship, complete) are not available from this screen. Use the flow that owns the
  status instead.

## Tips and troubleshooting

- **The supplier is not found.** Search by the business or branch name; only business branches and
  registered suppliers can receive orders.
- **Edit is missing.** The order is no longer pending. Create a new order or correct the received
  purchase instead.
- **The order does not appear in the purchases list.** That is expected: an order becomes a purchase only
  when it is accepted or received.
- **Delete fails.** The linked purchase is locked. Unlock it from the purchase view first.

## Related pages

- [Purchase Overview](/docs/business/purchase/overview)
- [Make Purchase](/docs/business/purchase/create)
- [Purchase Requests](/docs/business/purchase/requests)
- [Suppliers](/docs/business/purchase/suppliers)
