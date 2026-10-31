---
title: Taxes
section: business
---

# Taxes

The Taxes page tracks what the branch owes under each tax category, records payments, and produces tax
reports for filing. It supports fixed-rate categories and progressive categories with brackets, and it
keeps history per period so you can prove what was declared and paid.

Tax work is period-based. You create a record for a category and a date range, then pay against it,
partially or in full.

## What this page is about

- Reviewing tax categories and their calculation method.
- Creating a tax record for a period.
- Paying tax from a branch account.
- Generating an Excel report per category or for all categories.

## Page layout

| Area | What it shows |
| --- | --- |
| Category cards | Name, description and method: fixed percentage or progressive brackets |
| Recent tax table | Category, tax amount, paid, due, period range and creation date |
| Pay tax | A two-step form that creates and pays a record |
| Generate report | Category, currency and date range, queued as a background job |

The recent table shows the latest thirty records. Use the date filter to narrow a busy period.

## How to use it

### Pay tax

1. Open **Finance > Taxes** and choose **Pay tax**.
2. Choose the tax category.
3. Choose the from and to dates of the period.
4. Choose the base currency and enter the government invoice amount.
5. Choose the branch account. It must match the base currency.
6. Submit. The system creates or refreshes the tax record for that category, currency and period, then
   immediately records the payment.
7. The account is debited and the activity ledger shows a tax payment.

| Field | Required | Rules |
| --- | --- | --- |
| Category | Yes | Must exist |
| From date | Yes | Date |
| To date | Yes | On or after the from date |
| Base currency | Yes | Must exist |
| Invoice amount | Yes | At least 0.01 |
| Account | Yes | Active, same currency |
| Exchange amount | When currencies differ | At least 0.01 |

Paying the same category, currency and period again updates the existing record instead of creating a
duplicate.

### Generate a report

1. Choose **Generate report**.
2. Select a category, a base currency and the date range.
3. Confirm. The report is queued and a status panel appears.
4. Wait for the status to become completed, then download the Excel file.
5. Use **Download all categories** for a combined report covering the same range.

Report statuses are queued, processing, completed and failed. A failed report shows the error message and
can be deleted and retried.

## What is restricted

- Reading requires `finance.taxes` read; paying and generating or downloading reports require write.
- Records and reports are branch-scoped. Another branch's tax history and files are not reachable.
- The paying account must belong to the branch and match the base currency, or an exchange amount is
  required.
- A payment cannot exceed the remaining due amount, and a fully paid record cannot be paid again.
- Only the latest ten report requests for the branch are listed.
- Tax categories are platform-defined; they cannot be created or edited here.

## Tips and troubleshooting

- **The record already exists.** Paying the same category, currency and period refreshes it; check the
  recent table before creating a new one.
- **Insufficient balance.** Choose another account or top up the current one.
- **The report stays queued.** The queue worker may be stopped. Ask an administrator to check the queue.
- **The report download is missing.** The file may have been deleted; generate it again.
- **The due amount is zero.** The record is already paid in full; the pay action is not offered.

## Related pages

- [Accounts](/docs/business/finance/accounts)
- [Expenses](/docs/business/finance/expenses)
- [Reports](/docs/business/store/reports)
- [Finance Overview](/docs/business/finance/overview)
