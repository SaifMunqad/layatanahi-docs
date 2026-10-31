---
title: View Purchase
section: business
---

# View Purchase

The purchase view is the complete record of one purchase. It combines the invoice header, the supplier,
the product lines, the payments and any returns in a single printable page, and it is where the
editable and deletable flags are controlled.

Think of it as the document of record: when a supplier disputes a payment or a colleague asks what was
received, this is the screen to open.

## What this page is about

- Reading the full detail of a purchase without hunting through several lists.
- Printing a copy for the supplier or for your files.
- Recording an additional payment.
- Locking or unlocking the document for editing and deletion.

## Page layout

| Section | What it shows |
| --- | --- |
| Invoice header | Invoice number, date, status and branch identity |
| Supplier | Supplier name and contact summary |
| Purchase information | Who purchased, the receiving branch and the inventory |
| Product table | Product, SKU, quantity, unit price and line total |
| Payments | Amount, account, exchange rate and status per payment |
| Returns | Returned products with quantity and refund amount |
| Totals | Grand total, paid amount and outstanding due |

The returns and payments tables can be collapsed. Each table has its own lock control, so a payment can
be protected independently of the purchase itself.

## How to use it

### Read the document

1. Open a purchase from the listing or from a link in a notification.
2. Check the status chip and the totals block. The due amount is the difference between the grand total
   and the sum of successful payments.
3. Expand **Payments** to see how the invoice was settled and by whom.
4. Expand **Returns** when goods came back, to confirm the quantities and refunds.

### Record a payment

1. Choose **Pay** when the due amount is greater than zero.
2. Enter the amount, choose a branch account of the same currency, and provide an exchange amount when
   the account currency differs.
3. Submit. The payment is added, the account is debited and the invoice status is recalculated.

### Lock or unlock the purchase

The status menu exposes two independent switches:

| Switch | Effect when cleared | Effect when set |
| --- | --- | --- |
| Editable | Edit disappears from the listing and the edit URL refuses to open | The purchase can be edited |
| Deletable | Delete disappears from the listing | The purchase can be deleted |

Clearing both after the paperwork is final is the recommended way to protect a received purchase. These
switches do not change the trade status of the purchase; they only control what colleagues may do with
it.

### Print

Choose **Print** for a clean document without the application chrome. Draft documents and documents
without stamp or signature are flagged in the printed header so a reader knows they are not final.

## What is restricted

- Reading requires `purchase.purchases` read; paying and toggling the flags require write.
- The purchase must belong to the active branch. Another branch's identifier returns not found rather
  than a document.
- A payment cannot exceed the outstanding due and cannot use an inactive account or a foreign branch
  account.
- Once a document is locked, the edit and delete actions are unavailable to everyone until someone with
  write access unlocks it from this page.
- Returns are read-only here; new returns are started from the listing with the Return action.
- Soft-deleted purchases are not reachable. Their identifier returns not found.

## Tips and troubleshooting

- **Pay is missing.** There is no outstanding due, the invoice is fully paid, or you lack write access.
- **The expected payment is not listed.** It may belong to another invoice, or it was recorded as a
  payment request that is still pending approval.
- **A colleague cannot edit although I unlocked the document.** Check that you unlocked the purchase
  itself, not only a payment, and that the colleague holds `purchase.purchases` write.
- **The printed page is missing the stamp.** The invoice warns about this; upload or apply the business
  stamp in the branch profile before printing official copies.

## Related pages

- [Purchase Listing](/docs/business/purchase/listing)
- [Purchase Status & Locking](/docs/business/purchase/status)
- [Returns](/docs/business/purchase/returns)
- [Records](/docs/business/purchase/records)
- [Accounts](/docs/business/finance/accounts)
