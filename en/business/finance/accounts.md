---
title: Accounts
section: business
---

# Accounts

An account is a bucket of money with a name: a cash drawer, a bank account, a mobile wallet or a card.
Every payment in the system credits or debits one of these accounts, which makes the accounts page the
most important financial screen in the branch.

Accounts are never deleted. Balances change through documented movements, and every movement is visible
in the account ledger.

## What this page is about

- Creating and naming the places where the branch keeps money.
- Seeing live balances per account and currency.
- Reviewing incoming and outgoing transactions.
- Adjusting capital with a recorded reason.
- Reviewing the full activity ledger of one account.

## Page layout

| Screen | What it shows |
| --- | --- |
| Accounts list | Cards with name, balance, currency, type and account number |
| Add or edit | Name, type, number, bank or wallet details, currency and opening balance |
| Account view | Balance, master data, latest incoming, outgoing and activities |
| Activities | Full paginated balance ledger |
| Incoming / Outgoing | All credited or debited payments for the account |

## Account types

| Type | Typical use | Extra field |
| --- | --- | --- |
| Cash | Drawer or safe | None |
| Bank | Corporate bank account | Bank name and account number |
| Digital wallet | Mobile money | Wallet number |
| Card | Payment card | Card number |

## How to use it

### Create an account

1. Open **Finance > Accounts** and choose **Add**.
2. Enter a name and choose the type.
3. Select the currency. The opening balance is expressed in that currency.
4. Complete the type-specific fields: bank name, account or card number.
5. Optionally enter an opening balance. It is recorded as an activity, not as an invisible number.
6. Save.

| Field | Required | Rules |
| --- | --- | --- |
| Name | Yes | Up to 50 characters |
| Type | Yes | Cash, bank, digital wallet or card |
| Currency | Yes | Must exist |
| Account number | No | Up to 50 characters |
| Bank name | No | Up to 100 characters, shown for bank accounts |
| Opening balance | No | Numeric, defaults to zero |
| Active | No | Inactive accounts are hidden from payment forms |

### Read an account

The account view shows the balance, the branch account code, the type and the relevant number. Three
sections list the latest incoming transactions, outgoing transactions and activities, each with a link
to the full list.

### Adjust capital

1. Open the account and choose **Add capital**.
2. Enter an amount. A negative value withdraws money.
3. Describe the reason. The description is mandatory because it explains the balance change.
4. Submit. An activity row records the new balance for the employee who performed it.

### Review the ledger

Open **Activities** for the complete, scroll-paginated ledger: amount, balance before, balance after,
date and description. Use **Incoming** and **Outgoing** for payment-level detail with reference,
category, employee, amount, base amount, exchange rate and notes.

## What is restricted

- Reading requires `finance.accounts` read; creating, editing, adjusting and paying require write.
- Accounts are branch-scoped. The branch is taken from your session and cannot be chosen in the form.
- There is no delete action. Deactivate an account instead so historical movements stay readable.
- The account currency cannot be changed after creation, because it would invalidate every stored base
  amount.
- Opening balances and capital adjustments must be explained; the description is stored on the ledger.
- Inactive accounts disappear from payment dropdowns but remain visible in reports.

## Tips and troubleshooting

- **The balance looks wrong.** Open Activities and read the last rows; every change carries a
  description and the responsible employee.
- **An account is missing from a payment form.** It is inactive, or its currency does not match the
  document.
- **A payment cannot be deleted.** The linked invoice is locked. Unlock the document first.
- **Two accounts have the same name.** Names are not unique. Rename one and use the branch account code
  to distinguish them in reports.

## Related pages

- [Payment Requests](/docs/business/finance/payment-requests)
- [Incomes](/docs/business/finance/incomes)
- [Expenses](/docs/business/finance/expenses)
- [Salaries](/docs/business/finance/salaries)
- [Taxes](/docs/business/finance/taxes)
