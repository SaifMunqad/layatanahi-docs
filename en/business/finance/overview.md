---
title: Finance Overview
section: business
---

# Finance Overview

**Finance** is where money is accounted for. Every sale, purchase, salary, tax payment and operating cost
eventually touches a **branch account**, and this module is how you see, record and reconcile those
movements.

The module is **branch-scoped**: each branch keeps its own accounts, incomes, expenses, taxes and salaries.
Partners and categories are shared by the business, because they describe the company rather than a
single location.

## What this page is about

- Holding money in named accounts and knowing each balance.
- Recording income that is not a sale and expenses that are not a purchase.
- Paying staff, including percentage-based payroll.
- Handling taxes and producing tax reports.
- Reviewing the ownership shares of the business.

## Pages in this module

| Page | Purpose | Permission |
| --- | --- | --- |
| Accounts | Cash, bank, wallet and card balances | `finance.accounts` |
| Payment Requests | Inter-branch money transfers awaiting approval | `finance.accounts` |
| Incomes | Non-sale income with categories | `finance.incomes` |
| Expenses | Operating expenses, optionally with a supplier bill | `finance.expenses` |
| Taxes | Tax categories, payments and reports | `finance.taxes` |
| Salaries | Assignments, slips, bonuses and deductions | `finance.salaries` |
| Partners | Ownership shares of the business | `finance.partners` |

## The account is the centre of the module

Everything financial is ultimately a change to an account balance:

| Event | Effect on the account |
| --- | --- |
| Sale paid now | Credit (balance increases) |
| Sale collected later | Credit |
| Purchase paid | Debit |
| Income recorded | Credit |
| Expense recorded | Debit |
| Salary paid | Debit |
| Tax paid | Debit |
| Transfer request approved | Debit the sender, credit the receiver |
| Capital adjustment | Debit or credit, depending on the sign |

> **Note:** Accounts are **never deleted**. To stop using one, mark it *inactive*; the history stays intact.

## Currency handling

Each account has one currency. A payment in another currency must carry an exchange amount, from which
the system derives the rate and stores the base amount. Reports use the base amount, so totals remain
comparable across currencies.

> **Tip:** If an account dropdown looks empty, it usually means there is **no active account** in the
> document's currency — not that the page is broken.

## What is restricted

- Reading requires the page capability; every financial mutation requires write. Write on a finance page
  is broad: it covers creating, editing, paying and deleting within that page.
- All lists and balances are branch-scoped through the session branch. Another branch's accounts and
  documents are not reachable.
- Financial documents that have already produced a payment are protected: editing refunds the previous
  payment first, and deletion is blocked where the balance would become inconsistent.
- Accounts, income entries and expense entries are never hard-deleted. The system reverses and
  soft-deletes so the audit trail survives.
- Tax and salary pages treat some GET screens as write actions, because opening them starts a payment
  flow.
- Only business-scope roles and the accounting department receive finance capabilities by default.

## Recommended order of setup

1. Create at least one account per currency your branch uses.
2. Create income and expense categories before recording entries.
3. Confirm the tax categories the business must report on.
4. Assign salaries to employees and check the currency of each assignment.
5. Review Accounts daily, and reconcile against cash and bank statements weekly.

## Related pages

- [Accounts](/docs/business/finance/accounts)
- [Payment Requests](/docs/business/finance/payment-requests)
- [Incomes](/docs/business/finance/incomes)
- [Expenses](/docs/business/finance/expenses)
- [Taxes](/docs/business/finance/taxes)
- [Salaries](/docs/business/finance/salaries)
- [Partners](/docs/business/finance/partners)
