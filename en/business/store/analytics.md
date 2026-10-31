---
title: Analytics
section: business
---

# Analytics

Analytics is the performance dashboard of the branch. It combines money and volume into a small set of
KPIs, charts and tables so a manager can see the direction of the business at a glance: sales, cash flow,
purchases, new customers and the balance of every branch account.

Unlike Reports, which is document-oriented, Analytics is trend-oriented. Use it to notice a change, then
open Reports or Activities to explain it.

## What this page is about

- Reading the main KPIs for the selected period.
- Comparing sales and purchases over time.
- Understanding net cash flow.
- Seeing outgoing payments by category.
- Reviewing the balance of every branch money account.

## Page layout

| Section | What it shows |
| --- | --- |
| KPI cards | Sales, incomings, purchases, net cash flow for the period |
| Secondary cards | Incoming payments, outgoing payments, new customers, assets total and active assets |
| Sales chart | Bar chart with a daily sales table |
| Incomes chart | Bar chart of recorded income |
| Cash flow chart | Line chart of net cash flow |
| Outgoing by category | Breakdown of where money went |
| Money accounts | Account name, balance and currency |

Each figure is expressed in the selected currency, with its code shown next to the number.

## KPIs explained

| KPI | Meaning |
| --- | --- |
| Sales total | Sum of invoices issued in the period |
| Incomings total | Money received against sales |
| Purchases total | Sum of purchase invoices in the period |
| Incomes total | Non-sale income recorded |
| Outgoing total | Money paid out in the period |
| Net cash flow | Incomes minus outgoing payments |
| New customers | Customers created in the period, business-wide |
| Assets total and active | Value and count of registered assets |

## How to use it

1. Open **Store > Analytics**.
2. Choose the currency.
3. Read the KPI cards. The period defaults to the last seven days; the date range can be supplied through
   the URL for a specific review.
4. Look for a KPI that moved unexpectedly.
5. Use the charts to confirm whether the change is a spike, a trend or a one-off.
6. Open Reports for the documents behind the number, or Activities for the individual movements.

## Reading the charts

- **Sales** shows issued invoice value; it is not the same as cash received. Compare it with incomings.
- **Incomes** shows non-sale income only, for example rent or services.
- **Net cash flow** is income minus outgoing payments. A positive line means the branch collected more
  than it paid in that bucket.
- **Outgoing by category** reveals whether a single cost category is driving the outflow.
- **Money accounts** is a live balance snapshot, not a period figure.

## What is restricted

- Reading requires `store.analytics` read. The page has no write actions.
- All figures are branch-scoped through the invoice issuing and receiving branch and the payment accounts.
  New customer counts are the exception: they are business-wide.
- The period defaults to seven days; there is no on-page date picker, so a specific range must be supplied
  in the URL.
- Data is loaded in deferred groups, so cards can appear before charts finish loading.
- Analytics never replaces statutory reports; it is a management view.
- Another branch's numbers are never included, even when the business has several locations.

## Tips and troubleshooting

- **A KPI is zero while documents exist.** Check the currency: figures are converted to the selected
  currency, and a currency with no activity shows zero.
- **Sales are high but cash is low.** Sales include unpaid invoices; compare with incomings and the
  receivables report.
- **The account balances look stale.** They are a snapshot loaded with the page; reload after a payment.
- **New customers is unexpectedly high.** That KPI is business-wide, not limited to the selected branch.

## Related pages

- [Reports](/docs/business/store/reports)
- [Activities](/docs/business/store/activities)
- [Accounts](/docs/business/finance/accounts)
- [Dashboard](/docs/business/home)
