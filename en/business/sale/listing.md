---
title: Sale Listing
section: business
---

# Sale Listing

The Sales page is the register of every invoice your branch has issued. It is where you find a sale,
check what is still owed, collect a payment, print a copy, start a return or correct an editable
document.

The list loads thirty rows at a time with infinite scroll, keeps filters in the URL, and shows only the
actions the current user is allowed to perform on each row.

## What this page is about

- Finding a sale by customer, invoice number, amount or date.
- Seeing paid and outstanding amounts at a glance.
- Collecting payments without opening the invoice.
- Starting a return for a delivered sale.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | Title, dynamic actions, print, filter and search |
| Table | Customer, invoice number, amount, paid, due, status and date |
| Row actions | View, return, edit, receive payment and delete |
| Scroll sentinel | Loads the next page automatically |

## Columns explained

| Column | Meaning |
| --- | --- |
| Customer | Customer name, or the receiving branch for inter-branch sales |
| Invoice number | Document reference |
| Amount | Grand total of the invoice |
| Paid | Amount received so far |
| Due | Outstanding balance |
| Status | Current trade status |
| Date | Creation date in your calendar format |

## How to use it

### Find a sale

1. Open **Sale > Sales**.
2. Search by customer name, invoice number, product or branch.
3. Narrow with the filter panel: date range, statuses, amount range and sorting.
4. Turn on **Outstanding only** to work through unpaid invoices.

### Act on a row

- **View** opens the printable invoice with payments, returns and status controls.
- **Return** appears while the sale is returnable; it opens the return flow for the goods still covered.
- **Edit** appears while the sale is editable; it reopens the normal sale form.
- **Receive payment** appears when there is an outstanding due; it records a payment into a branch
  account.
- **Delete** appears while the sale is deletable. It restores stock, reverses payments and soft-deletes
  the sale.

### Print

The print action produces a clean invoice. Documents that are still drafts, or that lack a stamp and
signature, are flagged so the recipient knows they are not final.

## What is restricted

- Reading requires `sale.sales` read. Every action on a row requires write.
- The list is branch-scoped to sales issued by your branch. Sales where you are the receiver belong to
  the other branch and are not listed here.
- Edit and delete are hidden when the corresponding flag is cleared, even for users with write access.
- Receiving a payment requires an active branch account in the invoice currency; cross-currency payments
  need an exchange amount.
- A return can never exceed the quantity still returnable.
- Locked documents remain visible for reporting but cannot be changed.

## Tips and troubleshooting

- **A sale is missing.** Check the branch selector; inter-branch sales issued by another branch appear in
  that branch, not here.
- **Receive payment is disabled.** The invoice is fully paid, or the account list for that currency is
  empty.
- **Edit disappeared.** The sale was locked by a colleague after the paperwork was completed.
- **The customer disputes the amount.** Open the invoice and compare the product lines, discount,
  miscellaneous amount and payments before issuing a return.

## Related pages

- [View Sale](/docs/business/sale/show)
- [Make Sale](/docs/business/sale/sell)
- [Sale Filters & Search](/docs/business/sale/filters)
- [Records](/docs/business/sale/records)
- [Returns](/docs/business/sale/returns)
