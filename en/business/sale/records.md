---
title: Sale Records
section: business
---

# Sale Records

Records is the money side of selling. It shows the invoices your branch has issued, the payments that
have arrived, and the totals behind both. This is where you collect outstanding balances and audit the
cash that came in.

The structure mirrors Purchase Records, so a user who works on both sides recognises the same layout.

## What this page is about

- Seeing how much customers owe the branch.
- Collecting a payment against an invoice.
- Auditing incoming payments and reversing a mistake.
- Drilling from a total into the underlying documents.

## Page layout

| Screen | What it shows |
| --- | --- |
| Records dashboard | Invoice and payment counters, latest payments and latest invoices |
| Invoices | Every outgoing sale invoice with total, paid, due and due date |
| Payments | Every incoming sale payment with payer, amount, account and status |

Filters chosen on the dashboard (customer, branch, sale, supplier, date range) are forwarded to the
detail lists, so the drill-down keeps the same context.

## How to use it

### Read the dashboard

1. Open **Sale > Records**.
2. Check the counters for invoices and payments.
3. Review the latest payments to confirm today's cash.
4. Review the latest invoices to see what is due.

### Collect a payment

1. Open **Invoices**, or use the pay action from the dashboard.
2. Choose the invoice. The outstanding amount is pre-filled.
3. Enter the amount. It cannot exceed the due amount.
4. Select an active branch account in the invoice currency, or provide an exchange amount when the
   currencies differ.
5. Submit. The account is credited and the invoice payment status is recalculated.

| Field | Required | Rules |
| --- | --- | --- |
| Invoice | Yes | Must be a sale invoice issued by your branch |
| Amount | Yes | At least 0.01 |
| Account | Yes | Active branch account |
| Exchange amount | When currencies differ | At least 0.01 |

### Delete a payment

1. Open **Payments**.
2. Choose delete on a payment that is marked deletable.
3. Confirm. The invoice paid amount is reduced, the account balance is adjusted and the payment is
   soft-deleted.

Deletion requires the invoice to still be editable and the payment to be flagged deletable. This
protects closed accounting periods.

## Invoices versus payments

| Question | Where to look |
| --- | --- |
| How much does this customer owe? | Customer profile, outstanding balance |
| Which invoices are overdue? | Invoices, sorted by due date |
| What cash arrived today? | Payments, filtered by date |
| Why is an invoice still open? | Open it and compare paid and due |

## What is restricted

- Reading requires `sale.records` read; paying and deleting require write.
- Invoices are limited to sales issued by your branch; payments are limited to accounts owned by your
  branch.
- A payment cannot exceed the outstanding due.
- Deleting a payment is blocked when the invoice is locked or the payment is protected.
- The dashboard shows only the latest ten rows per type; use the detail screens for the full history.
- Reversing a payment never deletes the sale; it only reverses the money movement.

## Tips and troubleshooting

- **Pay is disabled.** The invoice is already paid, the sale was deleted, or you lack write access.
- **The account list is empty.** Create a branch account with the invoice currency in Finance.
- **A payment cannot be deleted.** Unlock the sale first, then clear the payment's deletable flag.
- **Totals do not match the cash drawer.** Check the date filter and remember that payments recorded in
  another branch are not part of this list.

## Related pages

- [Sale Listing](/docs/business/sale/listing)
- [View Sale](/docs/business/sale/show)
- [Customers](/docs/business/sale/customers)
- [Accounts](/docs/business/finance/accounts)
- [Purchase Records](/docs/business/purchase/records)
