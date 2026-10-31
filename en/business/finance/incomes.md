---
title: Incomes
section: business
---

# Incomes

Income records money received that is not a sale: rent, services, commissions, interest or any other
revenue the branch earns outside its product catalogue. Recording it here keeps the account balance and
the reports accurate.

Every income entry credits a branch account immediately. There is no separate collection step, so the
account must be chosen when the entry is created.

## What this page is about

- Recording non-sale revenue with a category.
- Crediting a branch account in the correct currency.
- Reviewing, editing and deleting income entries.
- Maintaining the list of income categories.

## Page layout

| Screen | What it shows |
| --- | --- |
| Income list | Category, amount, currency and date with view, edit and delete actions |
| Create or edit | Category, amount, currency, account and notes |
| Categories | Category name and description, with an add action |

The list is paginated thirty rows at a time and supports a date filter and search.

## How to use it

### Record an income

1. Open **Finance > Incomes** and choose **Add income**.
2. Choose a category. If it does not exist, add it inline and it is selected automatically.
3. Enter the amount and choose the currency.
4. Choose the branch account. Only accounts in the selected currency are offered.
5. Add notes describing the source.
6. Submit. The account is credited and an activity is written.

| Field | Required | Rules |
| --- | --- | --- |
| Category | Yes | Must exist |
| Amount | Yes | At least 0.01 |
| Currency | Yes | Must exist; defaults to your preferred currency |
| Account | Yes | Active branch account in the same currency |
| Notes | No | Up to 1,000 characters |

### Edit or delete

Edit is available while the entry is still editable. Saving reverses the previous payment and applies the
new values, so the account history shows both movements.

Delete is available while the entry is deletable. Deleting reverses the account credit and removes the
linked payment; the income record is soft-deleted.

### Manage categories

Open **Income Categories** to see the list. Choose **Add category**, enter a code, and provide a name and
optional description per language. Categories are shared across the business and cannot be edited or
deleted from this screen once created.

| Field | Required | Rules |
| --- | --- | --- |
| Code | Yes | Up to 25 characters, unique |
| Language | Yes | At least one row |
| Name | Yes | Up to 255 characters per language |
| Description | No | Up to 1,000 characters per language |

## What is restricted

- Reading requires `finance.incomes` read; creating, editing and deleting require write.
- Entries are branch-scoped. Editing an entry from another branch is impossible, even with a direct URL.
- The account must belong to the branch and match the income currency. Cross-currency income is not
  supported through this form.
- Categories are global: a category created by one branch appears for all of them.
- Entries linked to a closed period may be protected; the edit and delete actions disappear when the
  server marks the record as not editable or not deletable.
- Deleting an income never deletes the account; it only reverses the movement.

## Tips and troubleshooting

- **The account list is empty.** No active account exists in the chosen currency.
- **Edit is missing.** The entry has already produced a payment that is protected, or the record is
  locked.
- **The balance did not change after saving.** Open the account activities; the system reverses the old
  payment and applies the new one, so two rows appear.
- **A category is duplicated.** Codes are unique, but names are not. Review the category list before
  adding a new one.

## Related pages

- [Accounts](/docs/business/finance/accounts)
- [Expenses](/docs/business/finance/expenses)
- [Reports](/docs/business/store/reports)
- [Finance Overview](/docs/business/finance/overview)
