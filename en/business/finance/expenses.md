---
title: Expenses
section: business
---

# Expenses

Expenses record money the branch spends that is not a stock purchase: rent, electricity, transport,
maintenance, small supplies and similar operating costs. Each expense debits a branch account and is
classified with a category so reports can show where the money goes.

An expense can optionally carry a supplier bill. In that case the system also creates a purchase invoice
so the cost is linked to the supplier and appears in payables reporting.

## What this page is about

- Recording operating costs against a branch account.
- Classifying costs with business-defined categories.
- Attaching a supplier bill when a formal invoice exists.
- Reviewing and editing recorded expenses.

## Page layout

| Screen | What it shows |
| --- | --- |
| Expense list | Category, invoice number, amount, currency and date |
| Create or edit | Category, amount, currency, account, bill section and notes |
| Categories | Government category, business category name and description |

The list is paginated thirty rows at a time and supports date filtering and search.

## How to use it

### Record a simple expense

1. Open **Finance > Expenses** and choose **Add expense**.
2. Choose a category, or add one inline.
3. Enter the amount and choose the currency.
4. Choose a branch account in the same currency.
5. Add notes describing the cost.
6. Submit. The account is debited and an activity is written.

### Record an expense with a supplier bill

1. In the form, enable **Add bill**.
2. Choose the supplier and enter the bill number.
3. Add one line per product with quantity and price.
4. Confirm that the computed total matches the bill. The system compares the sum of lines with the
   declared total and rejects a mismatch beyond one cent.
5. Choose the paying account and submit.

The system creates the expense, a supplier invoice marked as paid, the invoice lines and the payment. The
amount field mirrors the bill total and cannot be edited while a bill is attached.

### Edit an expense

Open the expense and choose edit. Saving refunds the previous payment to the original account and applies
the new values. Editing is only available while the entry is marked editable.

## Fields and rules

| Field | Required | Rules |
| --- | --- | --- |
| Category | Yes | Must exist |
| Amount | Yes | At least 0.01; disabled when a bill is attached |
| Currency | Yes | Must exist |
| Account | Yes | Active branch account in the same currency |
| Notes | No | Up to 1,000 characters |
| Has bill | Yes | Boolean |
| Supplier | With bill | Must exist in the business |
| Bill number | With bill | Up to 255 characters |
| Lines | With bill | At least one product, quantity and price |
| Total | With bill | Must equal the sum of the lines |

## Categories

Expense categories map a government tax category to a business-defined name and description. The code is
unique and the translations are shared across the business.

| Field | Required | Rules |
| --- | --- | --- |
| Government category | Yes | Must exist |
| Code | Yes | Up to 25 characters, unique |
| Language | Yes | At least one row |
| Name | Yes | Up to 255 characters |
| Description | No | Up to 1,000 characters |

Categories cannot be edited or deleted from the interface once created. Choose names carefully.

## What is restricted

- Reading requires `finance.expenses` read; creating and editing require write.
- Expenses are branch-scoped. A branch only sees its own costs and its own accounts.
- The account must belong to the branch and match the currency. Cross-currency expenses are not supported
  through this form.
- A bill whose line total differs from the declared total is rejected; there is no partial save.
- There is no delete action on the list. Correct a wrong expense by editing it while it is editable.
- Suppliers attached to a bill must be existing business suppliers.

## Tips and troubleshooting

- **The amount field is read-only.** A bill is attached; the total comes from the lines.
- **The bill total is rejected.** Recalculate the lines or correct the declared total; the tolerance is
  one cent.
- **Edit is missing.** The expense is in a closed period or the linked payment is protected.
- **The category I need does not exist.** Add it from Expense Categories first, then return to the form.
- **The account list is short.** Only accounts in the selected currency are offered.

## Related pages

- [Accounts](/docs/business/finance/accounts)
- [Incomes](/docs/business/finance/incomes)
- [Purchase Records](/docs/business/purchase/records)
- [Reports](/docs/business/store/reports)
