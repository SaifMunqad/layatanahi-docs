---
title: Purchase Returns
section: business
---

# Purchase Returns

A purchase return sends goods back to a supplier or to the branch you bought them from. It reduces
stock, reduces what you owe, and records either a refund into a branch account or a smaller invoice.
Returns are how you correct a delivery without deleting the original purchase.

Returns are always created from a received purchase: the system needs the original lines to know what
can still be returned.

## What this page is about

- Returning damaged, expired or incorrectly supplied goods.
- Getting money back into an account, or reducing the invoice total.
- Keeping stock quantities accurate after a return.
- Producing a printable return document for the supplier.

## Page layout

| Screen | What it shows |
| --- | --- |
| Returns list | Supplier, returned quantity, refund amount and currency, invoice total, reason and date |
| Return modal | Original lines, available quantity, quantity to return, refund per line |
| Return view | Printable document with invoice, lines, refunds and reason |

The list is read-only. New returns are started from the purchase listing or the purchase view with the
Return action.

## How to use it

### Create a return

1. Open **Purchase > Purchases** and find the received purchase.
2. Choose **Return**. The modal loads the original lines.
3. For each line, enter the quantity to return. The available quantity is the ordered quantity minus
   what was already returned.
4. Enter the refund amount per line. It cannot exceed the quantity multiplied by the unit price.
5. Optionally choose the branch account that receives the refund and provide an exchange amount when the
   currencies differ.
6. Give a reason. This appears on the return document and in the audit trail.
7. Submit.

| Field | Required | Rules |
| --- | --- | --- |
| Purchase | Yes | Must be received by your branch and still returnable |
| Lines | Yes, at least one | Quantity at least one and not above the available quantity |
| Refund per line | Yes | Zero or greater, not above the line value |
| Reason | Yes | Up to 500 characters |
| Account | No | Receives the refund when supplied |
| Exchange amount | When currencies differ | At least 0.01 |

### Read a return

Open a return from the list to see the original invoice, the returned lines, the refund amounts, the
reason and the payments involved. Use **Print** to produce a supplier copy.

### Understand the effect

| Situation | Effect on stock | Effect on money |
| --- | --- | --- |
| Account chosen | Stock is reduced | Refund credited to the account and recorded as a refund payment |
| No account chosen | Stock is reduced | Invoice total is reduced instead of a cash refund |
| Every line fully returned | Stock is reduced | Purchase is marked returned and no longer returnable |

## What is restricted

- Reading requires `purchase.returns` read; creating a return requires write.
- You can only return goods from a purchase your branch received, and only while the purchase is marked
  returnable.
- The returned quantity can never exceed what is still available. The same check exists in the modal and
  on the server.
- The refund per line can never exceed the original line value.
- A fully returned purchase cannot be returned again; the action disappears.
- The account must belong to your branch and be active.
- Returns cannot be edited or deleted after submission. To correct a mistake, record a new purchase for
  the goods that were returned in error.

## Tips and troubleshooting

- **The Return action is missing.** The purchase is not marked returnable, or every line has already been
  returned.
- **The available quantity is lower than expected.** Earlier returns consumed part of the quantity.
- **The refund is larger than the invoice.** Reduce the per-line refunds so their sum does not exceed the
  remaining invoice value.
- **Stock did not change.** Confirm the return was submitted, not only opened; check the stock history in
  Inventory for a purchase return entry.
- **You need to undo a return.** Record a new purchase from the supplier for the same goods.

## Related pages

- [Purchase Listing](/docs/business/purchase/listing)
- [View Purchase](/docs/business/purchase/show)
- [Inventory Listing](/docs/business/inventory/listing)
- [Accounts](/docs/business/finance/accounts)
- [Sale Returns](/docs/business/sale/returns)
