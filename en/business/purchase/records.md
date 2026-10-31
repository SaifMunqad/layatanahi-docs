---
title: Purchase Records
section: business
---

# Purchase Records

Records is the money side of purchasing. Instead of opening each purchase, you work from three
connected views: a dashboard of totals, the list of bills you owe, and the list of payments you have
made. This is where a branch settles supplier debt day to day.

The module is the purchase counterpart of Sale > Records. Both share the same idea: an invoice records
what is owed, a payment records what has moved.

## What this page is about

- Seeing how much the branch owes and how much it has paid.
- Settling a supplier bill partially or in full.
- Auditing payments and removing a mistaken one.
- Jumping from a total to the underlying invoices or payments.

## Page layout

| Screen | What it shows |
| --- | --- |
| Records dashboard | Invoice and payment counts, the latest ten payments and the latest ten bills |
| Bills | Every incoming purchase invoice with total, paid, due and due date |
| Payments | Every outgoing purchase payment with payer, amount, account and status |

Filters on the dashboard (supplier, branch, purchase, date range) are forwarded to both detail lists, so
you can drill down without re-entering them.

## How to use it

### Read the dashboard

1. Open **Purchase > Records**.
2. Check the two counters: invoices and payments for the branch.
3. Use the recent bills table to see what is due soonest.
4. Use the recent payments table to confirm what was paid today.

### Pay a bill

1. Open **Bills** or use the pay action from the dashboard.
2. Choose the invoice. The outstanding amount is pre-filled.
3. Enter the amount to pay. It cannot exceed the due amount.
4. Select a branch account of the same currency, or provide an exchange amount when the account
   currency differs.
5. Submit. The account is debited, the invoice paid amount increases and the status is recalculated.

| Field | Required | Rules |
| --- | --- | --- |
| Invoice | Yes | Must be an invoice received by your branch |
| Amount | Yes | At least 0.01 |
| Account | Yes | Active branch account |
| Exchange amount | When currencies differ | At least 0.01 |

### Delete a payment

1. Open **Payments**.
2. Choose delete on the payment.
3. Confirm. The invoice paid amount is reduced, the account balance is restored and the payment is
   soft-deleted.

A payment can only be deleted while the invoice is still editable and the payment is marked deletable.
This protects closed periods from silent changes.

## What is restricted

- Reading requires `purchase.records` read; paying and deleting require write.
- Bills are limited to invoices where your branch is the receiving party. Payments are limited to
  accounts owned by your branch.
- A payment can never exceed the outstanding due. Overpayment must be recorded as a supplier credit or
  a new invoice.
- Deleting a payment is blocked when the invoice is locked or the payment is flagged as protected.
- The dashboard shows only the latest ten rows per type; use the Bills and Payments screens for the full
  history.
- The payment deletion does not delete the purchase; it only reverses the money movement.

## Comparing bills and payments

| Question | Where to look |
| --- | --- |
| How much do we owe this supplier? | Supplier profile, payable balance |
| Which invoices are overdue? | Bills, sorted by due date |
| What did we pay this week? | Payments, filtered by date |
| Why is an invoice still unpaid? | Open the invoice, compare paid and due |

## Tips and troubleshooting

- **Pay is disabled.** The invoice is already settled, belongs to another branch, or you lack write
  access.
- **The account list is empty.** Create an account with the matching currency in Finance.
- **A payment cannot be deleted.** The invoice has been locked. Ask a colleague with write access to
  unlock it from the purchase view first.
- **Totals do not match the bank statement.** Check the payment date filters and remember that payments
  recorded in another branch are not shown here.

## Related pages

- [Purchase Listing](/docs/business/purchase/listing)
- [View Purchase](/docs/business/purchase/show)
- [Suppliers](/docs/business/purchase/suppliers)
- [Accounts](/docs/business/finance/accounts)
- [Expenses](/docs/business/finance/expenses)
