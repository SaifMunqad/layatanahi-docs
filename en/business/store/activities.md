---
title: Activities
section: business
---

# Activities

Activities is the unified timeline of the branch. Instead of opening each module to find out what
happened, you see the latest purchases, orders, payments, account movements, inventory changes, sales and
sale-order events side by side, each linking to its source document.

The page is read-only and is the fastest way to answer "who did that, and when?".

## What this page is about

- Reviewing recent activity across every module.
- Finding the document behind a change.
- Auditing who performed an action.
- Drilling into one activity type when the summary is not enough.

## Page layout

| Section | What it shows |
| --- | --- |
| Purchase activities | Employee, invoice, status, date and action |
| Order activities | Employee, invoice, status, date and action |
| Payment activities | Employee, branch, direction, source, reference, amount, date |
| Account activities | Employee, account, amount, balance before, balance after, date, description |
| Inventory activities | Product, configured by, action count, status, date, reason |
| Sale activities | Employee, invoice, status, date and action |
| Sale order activities | Employee, invoice, status, date and action |

Each table shows the latest ten rows and offers a "view all" link.

## How to use it

### Scan the timeline

1. Open **Store > Activities**.
2. Look at the most relevant section for your question: payments for cash, inventory for stock, sales and
   purchases for trade.
3. Use the action link on a row to open the source document.
4. Check the employee column before drawing conclusions; several people may share a branch.

### Drill into one type

1. Choose **View all** on a section.
2. The detail page shows the full list for that type, thirty rows at a time, with infinite scroll.
3. Accepted types are purchases, orders, sales, sale-orders, payments and account activities.

Any other type returns not found; the list is fixed by the system.

## Reading the columns

| Column group | Interpretation |
| --- | --- |
| Employee | The session that performed the action |
| Direction | Whether money came in or went out |
| Amount and balance | Signed amount, with the balance before and after for accounts |
| Status | The action type, for example moved, reduced or edited |
| Reason | The explanation required by the inventory workflow |
| Date | When the action was recorded |

Account rows are the most precise: they show the exact balance change, which makes them useful for
reconciling a cash drawer.

## What is restricted

- Reading requires `store.activities` read. There are no write actions on this page.
- Every list is branch-scoped: invoices issued by the branch, payments on its accounts and stock in its
  locations. Another branch's events are excluded.
- The page shows the latest ten rows per section; use the detail pages for history.
- The activity timeline is cached briefly; a very recent action may take a moment to appear.
- Deleting a document does not erase its activity. Audit entries remain visible.
- The inventory section is derived from configuration entries; it does not duplicate the reasons.

## Tips and troubleshooting

- **An action is missing.** Check the branch selector and wait for the cache window before assuming it
  was not recorded.
- **The employee is wrong.** Activities record the session that performed the action, which may be a
  shared account at a busy counter.
- **The amounts do not match a report.** Reports group by document; activities show individual movements,
  including reversals from edits.
- **A "view all" returns not found.** The type is not one of the supported sections.

## Related pages

- [Analytics](/docs/business/store/analytics)
- [Reports](/docs/business/store/reports)
- [Configuration History](/docs/business/inventory/configurations)
- [Audit Log](/docs/business/access/audit)
