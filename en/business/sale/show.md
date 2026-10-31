---
title: View Sale
section: business
---

# View Sale

The sale view is the complete record of one invoice. It shows the issuing branch, the receiving party,
the product lines, the payment summary, the payments themselves and any returns, together with the
controls that lock or unlock the document.

It is the screen you open when a customer questions an amount, when a colleague needs proof of delivery,
or when you need to collect the outstanding balance.

## What this page is about

- Reading the full detail of a sale.
- Printing an invoice for the customer.
- Receiving an additional payment.
- Locking or unlocking the document.
- Reviewing returns and their effect.

## Page layout

| Section | What it shows |
| --- | --- |
| Invoice header | Invoice number, date, status and branch identity |
| Parties | Receiving customer or branch, alongside the issuing branch |
| Product table | Product, SKU, quantity, unit price and line total |
| Totals | Subtotal, discount, tax, miscellaneous, grand total, paid and due |
| Payments | Amount, account, exchange rate and status per payment |
| Returns | Returned lines with quantity and refund |
| Actions | Pay, status menu, print |

When a sale has been deleted, a banner explains that the document is retained for audit and shows the
deletion date.

## How to use it

### Read the invoice

1. Open a sale from the listing or from a link.
2. Check the status chip and the totals block. The due amount is the difference between the grand total
   and successful payments.
3. Expand payments to see who paid, into which account and at what exchange rate.
4. Expand returns when goods came back.

### Receive a payment

1. Choose **Pay** when the due amount is positive.
2. Enter the amount, choose a branch account in the invoice currency, and add an exchange amount when the
   currencies differ.
3. Submit. The account is credited, the invoice paid amount increases and the status is recalculated.

### Lock or unlock

The status menu toggles two independent flags:

| Flag | When cleared | When set |
| --- | --- | --- |
| Editable | Edit disappears and the edit screen refuses to open | The sale may be edited |
| Deletable | Delete disappears from the listing | The sale may be deleted |

A payment can also be protected individually by clearing its deletable flag, which prevents the payment
from being reversed later.

### Print

Choose **Print** for a clean invoice. The printed page warns when the document is a draft or lacks a
stamp and signature.

## What is restricted

- Reading requires `sale.sales` read; paying and toggling flags require write.
- The sale must belong to the active branch; a foreign identifier returns not found.
- A payment cannot exceed the due amount, cannot use an inactive account and cannot use another branch's
  account.
- Toggling a payment's deletable flag requires finance account write access in addition to sale access.
- Returns are read-only here; new returns start from the listing.
- The trade status is not editable from this screen. It changes through order acceptance, returns and
  payment flows.

## Tips and troubleshooting

- **Pay is missing.** The invoice is settled, the sale is deleted, or you lack write access.
- **The printed copy is refused by the customer.** Check the stamp warning and print again after the
  branch profile has a valid stamp and signature.
- **A payment cannot be removed.** Its deletable flag was cleared. Unlock it first, then delete it from
  Records > Payments.
- **Quantities differ from the delivery note.** Compare the product table with the return table; a
  partially returned sale shows both.

## Related pages

- [Sale Listing](/docs/business/sale/listing)
- [Sale Status & Locking](/docs/business/sale/status)
- [Records](/docs/business/sale/records)
- [Returns](/docs/business/sale/returns)
- [Accounts](/docs/business/finance/accounts)
