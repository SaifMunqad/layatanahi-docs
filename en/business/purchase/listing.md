---
title: Purchase Listing
section: business
---

# Purchase Listing

The Purchases page is the register of every purchase invoice issued by your branch. It is the screen
you open to find a document, check how much is still owed, pay a bill, print a copy or start a return.

The list is designed for volume: it loads thirty rows at a time, continues automatically as you
scroll, and keeps filters and search in the URL so a view can be shared with a colleague.

## What this page is about

- Finding a purchase by supplier, document number, amount or date.
- Seeing at a glance which invoices are unpaid.
- Triggering the common actions without opening the document first.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | Title, dynamic actions, print, filter and search |
| Table | Supplier or branch, document number, grand total, due amount, status and date |
| Row actions | View, edit, delete, return and pay, each shown only when allowed |
| Scroll sentinel | Loads the next page automatically |

Rows are ordered newest first. The due amount is the part of the invoice that has not been paid yet;
zero means the invoice is settled.

## Columns explained

| Column | Meaning |
| --- | --- |
| Supplier / branch | Who the purchase was made from |
| Document number | The bill or invoice number recorded for the purchase |
| Grand total | Total including miscellaneous amounts |
| Due | Outstanding balance after payments |
| Status | Current trade status of the purchase |
| Date | Creation date in your calendar format |

## How to use it

### Find a purchase

1. Type a supplier name, document number or amount in the search box and submit.
2. Narrow the list with the filter panel: date range, one or more statuses, amount range and sorting.
3. Turn on **Payables only** to hide settled invoices and work through outstanding balances.

Search and filters are stored in the query string, so refreshing or sharing the link keeps the same
view.

### Act on a row

- **View** opens the printable invoice with its payments and returns.
- **Edit** appears only while the purchase is editable; it opens the same form used to create it.
- **Delete** appears only while the purchase is deletable. It restores account balances, removes linked
  stock and soft-deletes the invoice.
- **Return** starts a return for the goods you still hold.
- **Pay** records a payment against the outstanding balance.

Deleting and returning are irreversible from the interface. If you only need to correct a price,
prefer editing while the document is still editable.

### Print

Choose **Print** to open the browser print dialog with a clean layout. The printed page includes the
invoice header, supplier, lines, payments and totals. The invoice warns when it is a draft or has not
been stamped and signed.

## What is restricted

- Reading requires `purchase.purchases` read. Edit, delete, pay and status changes require write.
- The list is branch-scoped: invoices where your branch is the receiving party. Another branch's
  purchase cannot be reached by changing the URL.
- Edit and delete are hidden when the corresponding flag has been cleared on the document, even if you
  hold write.
- Payment cannot exceed the outstanding due, and the account must be active and in the same currency,
  or an exchange amount must be provided.
- Returns are only offered for purchases that are marked returnable and were received by your branch.
- The list never shows soft-deleted purchases. They remain in the database for audit but are not
  reachable from this screen.

## Tips and troubleshooting

- **A purchase I just created is missing.** Check the branch selector and clear the status filter; new
  documents may be Draft or Payment pending rather than Completed.
- **Pay is disabled.** The invoice belongs to another branch, has no due amount, or you lack write
  access.
- **Edit disappeared.** A colleague locked the document by clearing its editable flag. Ask them to
  unlock it from the purchase view.
- **Totals differ from the supplier's paper.** Use Edit before locking, or record a return for the
  difference; do not delete a received purchase that already moved stock.

## Related pages

- [Purchase Overview](/docs/business/purchase/overview)
- [View Purchase](/docs/business/purchase/show)
- [Filters & Search](/docs/business/purchase/filters)
- [Records](/docs/business/purchase/records)
- [Returns](/docs/business/purchase/returns)
