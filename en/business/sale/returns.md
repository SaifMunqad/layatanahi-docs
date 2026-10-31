---
title: Sale Returns
section: business
---

# Sale Returns

A sale return records goods coming back from a customer. It restores stock, refunds money or reduces the
invoice, and keeps the original sale intact for audit. Returns are the correct way to correct a
completed sale without deleting it.

Returns are always created from a sale your branch issued. The system uses the original lines to know
what can still come back.

## What this page is about

- Accepting goods back from a customer.
- Refunding money into an account or reducing the invoice.
- Restoring stock quantities.
- Producing a return document for the customer.

## Page layout

| Screen | What it shows |
| --- | --- |
| Returns list | Customer or branch, invoice, returned amount, currency, reason and date |
| Return modal | Original lines, returned quantity, available quantity and refund per line |
| Return view | Printable document with invoice, lines, refund and payments |

The list is read-only. Returns start from the sale listing or the sale view with the Return action.

## How to use it

### Create a return

1. Open **Sale > Sales** and find the sale.
2. Choose **Return**. The modal loads the lines.
3. Enter the quantity for each line. Available quantity is the sold quantity minus what was already
   returned.
4. Enter the refund per line. It cannot exceed quantity multiplied by unit price.
5. Optionally choose the branch account that pays the refund.
6. Enter a reason.
7. Submit.

| Field | Required | Rules |
| --- | --- | --- |
| Sale | Yes | Must be issued by your branch and still returnable |
| Lines | Yes, at least one | Quantity at least one, not above available |
| Refund per line | Yes | Zero or greater, not above the line value |
| Reason | Yes | Up to 500 characters |
| Account | No | Pays the refund when supplied |
| Exchange amount | When currencies differ | At least 0.01 |

### Read a return

Open a return to see the original invoice, the returned lines, the refund amount and the reason. The
payments table shows whether money moved or the invoice was reduced. Use print for a customer copy.

### Understand the effect

| Situation | Stock | Money |
| --- | --- | --- |
| Account chosen | Restored to the selling location | Refund paid from the account |
| No account chosen | Restored | Invoice total reduced |
| Every line fully returned | Restored | Sale marked returned and no longer returnable |

## What is restricted

- Reading requires `sale.returns` read; creating a return requires write.
- The sale must have been issued by your branch and must still be returnable.
- Quantities cannot exceed what is still available, and refunds cannot exceed the line value.
- A fully returned sale cannot be returned again.
- The paying account must belong to your branch and be active.
- Returns cannot be edited or deleted after submission. Correct a mistake with a new sale, not by
  deleting a return.
- Restoring stock requires the original location to still be accessible to your branch.

## Tips and troubleshooting

- **The Return action is missing.** The sale is fully returned, locked as not returnable, or you lack
  write access.
- **Available quantity is zero.** Everything sold has already been returned.
- **The refund exceeds the invoice.** Reduce the per-line amounts so their sum stays within the remaining
  invoice value.
- **Stock did not come back.** Confirm the return was submitted; check the stock history for a sale
  return entry in the original location.
- **The customer wants an exchange instead.** Record the return, then record a new sale for the
  replacement items.

## Related pages

- [Sale Listing](/docs/business/sale/listing)
- [View Sale](/docs/business/sale/show)
- [Purchase Returns](/docs/business/purchase/returns)
- [Accounts](/docs/business/finance/accounts)
