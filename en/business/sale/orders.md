---
title: Sale Orders
section: business
---

# Sale Orders

Sale Orders are orders placed **on** your branch by another branch. They arrive as documents awaiting
your acceptance, and accepting one turns the order into a sale, moves the stock and settles the money.

This is the receiving side of inter-branch trade. The sending side sees the same transaction in
Purchase Requests.

## What this page is about

- Reviewing orders another branch placed on you.
- Accepting an order to create the sale.
- Inspecting products and payments before deciding.
- Deleting orders that should not be fulfilled.

## Page layout

| Area | What it shows |
| --- | --- |
| Order table | Branch name, product count, total amount, status, date and actions |
| Product modal | Products, payments and summary for the selected order |
| Bulk actions | Accept and delete selected orders |

Orders are paginated ten at a time. The table supports selecting several rows for a bulk decision.

## Status meanings

| Status | Colour | Meaning |
| --- | --- | --- |
| Pending | Yellow | Waiting for your decision |
| Approved | Green | Accepted by your branch |
| Complete, completed | Green | Fulfilled and closed |
| Shipped | Blue | Goods dispatched |
| Rejected, cancelled | Red | Not fulfilled |

## How to use it

### Review an order

1. Open **Sale > Orders**.
2. Choose the product action on a row to see the lines, quantities, prices, payments and totals.
3. Confirm that the products and prices match what the other branch expects.

### Accept an order

1. Select one or more pending orders.
2. Choose accept.
3. The system rewrites the invoice to your branch, regenerates the invoice number and creates the sale.
4. The sale becomes Completed when fully paid, or Payment pending when money is still owed.
5. The accepted sale is locked for editing and deletion but remains returnable.

Stock is reduced from your selling location at acceptance, so confirm availability before accepting.

### Delete an order

1. Select one or more rows and choose delete.
2. Only orders that are not approved are removed; approved orders are silently skipped.
3. Deleting an order also removes the linked purchase document on the sending side.

Deletion is for orders that will never be fulfilled. If goods already moved, use a return instead.

## What is restricted

- Reading requires `sale.orders` read; accepting and deleting require write.
- You only see orders addressed to your branch. Orders you placed on others appear in Purchase Orders.
- Accepting requires available stock in a location your branch can access.
- Approved orders cannot be deleted or re-accepted.
- Bulk status actions such as "mark as shipped" are not implemented on this screen; the order lifecycle
  is driven by acceptance and the linked documents.
- The order creator screen is not part of this module: orders are created by the purchasing branch.

## Tips and troubleshooting

- **The order is missing.** It may have been accepted or deleted by a colleague, or it belongs to another
  branch.
- **Accept fails.** Stock is unavailable, the invoice is already approved, or the linked document is
  locked.
- **Products do not match the request.** Open the product modal and compare quantities; reject the order
  and ask the other branch to resend it.
- **The order shows as approved but no sale exists.** Check the Sale listing for the regenerated invoice
  number; acceptance rewrites the document reference.

## Related pages

- [Purchase Requests](/docs/business/purchase/requests)
- [Sale Requests](/docs/business/sale/requests)
- [Sale Listing](/docs/business/sale/listing)
- [Notifications](/docs/business/notifications)
