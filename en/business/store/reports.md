---
title: Reports
section: business
---

# Reports

Reports turn the transactions of the branch into financial statements. The dashboard gives a period
overview across sales, purchases, payments, expenses, receivables and payables, and each figure links to
a detailed list you can print or reconcile.

Reports are read-only. They never change a document, so they are safe to open during an audit.

## What this page is about

- Comparing sales, purchases and expenses over a period.
- Seeing receivables and payables at a glance.
- Calculating net profit for a day, week, month, year or the whole history.
- Drilling into the invoices or payments behind any total.

## Page layout

| Section | What it shows |
| --- | --- |
| Filters | Timeline and currency selectors |
| Totals | Sales, incomings, purchases, income payments, outgoing payments, expenses, receivables, payables, net profit |
| Averages | Average values and order counts for the period |
| Timeline | One row per period with every figure |
| Recent lists | Latest invoices, payments, receivables and payables |

Every total is a link to its detail page, carrying the current timeline, currency and period.

## Timelines

| Timeline | Periods |
| --- | --- |
| Day | Twenty-four hourly buckets |
| Week | Seven daily buckets (default) |
| Month | Four weekly buckets |
| Year | Twelve monthly buckets |
| Whole time | One bucket per calendar year |

The period chip shows which bucket you are viewing, for example "Today", "Yesterday" or "3 days ago".

## Detail pages

| Report | Columns |
| --- | --- |
| Sales | Invoice, customer, organization, total, paid, outstanding, date |
| Incomings | Invoice, total, paid, outstanding, date |
| Purchases | Invoice, supplier, total, paid, outstanding, date |
| Income payments | Category, debit account, credit account, amount, date |
| Outgoing payments | Category, debit account, credit account, amount, date |
| Expenses | Category, notes, recorded by, amount, date |
| Net profit | Entry type, reference, detail, amount, date |
| Receivables | Invoice, customer, organization, total, paid, outstanding, date |
| Payables | Invoice, supplier, total, paid, outstanding, date |

Each detail page paginates fifteen rows and loads further rows as you scroll. Changing the currency
keeps the timeline and period.

## How to use it

1. Open **Store > Reports**.
2. Choose the timeline and the currency.
3. Read the totals table first; it gives the shape of the period.
4. Click a total to open its detail list.
5. Use the currency selector on the detail page to compare the same period in another currency.
6. Print the detail page when a paper copy is needed.

## What is restricted

- Reading requires `store.reports` read. Uploading or exporting spreadsheets requires write.
- All figures are branch-scoped: invoices issued or received by the branch, and payments on the branch's
  accounts. Another branch's activity is excluded.
- New customer counts, where shown, are business-wide rather than branch-specific.
- Results are cached for performance. A document created seconds ago may take a short while to appear.
- Receivables and payables have no timeline selector; they show the current outstanding position.
- Reports never expose cost or margin per line beyond what the net profit view derives from documents.

## Tips and troubleshooting

- **A total looks old.** Results are cached briefly. Wait a minute and reload.
- **The period chip is unexpected.** The timeline determines the buckets; a week timeline starts from the
  current week, not from an arbitrary date.
- **Currency totals differ from the account.** Reports convert to the selected currency using stored
  exchange rates; the account ledger shows the original amounts.
- **Net profit is negative.** Purchases and expenses exceeded sales and income in that bucket. Open the
  detail list before concluding that data is wrong.

## Related pages

- [Analytics](/docs/business/store/analytics)
- [Activities](/docs/business/store/activities)
- [Accounts](/docs/business/finance/accounts)
- [Expenses](/docs/business/finance/expenses)
