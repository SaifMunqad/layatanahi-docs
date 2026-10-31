---
title: Dashboard
section: business
---

# Dashboard

The Dashboard is the first screen an employee sees after signing in to the Business workspace. It
summarises the health of the branch you are managing: how much stock you hold, how many customers and
suppliers you work with, which orders are waiting, and how sales have moved over the last days.

Use it as a starting point rather than a report. Every card links to the module that owns the number,
and every figure respects your permissions and the branch you have selected.

## What this page is about

The dashboard answers four everyday questions:

- **How big is the operation right now?** Branches, products, customers, suppliers.
- **What needs attention?** Pending orders and low-stock products.
- **Who is doing what?** A breakdown of employees by role and a list of recent purchase activity.
- **How are sales trending?** A daily sales table and chart for the recent period.

## Page layout

| Section | What it shows |
| --- | --- |
| Managing branch selector | Shown only to business administrators; lets you switch the branch the dashboard reports on |
| KPI cards | Branch count, product count, customer count with change, supplier count, pending orders, low-stock items |
| User role table | Number of employees grouped by role, capped at eight groups |
| User activity | The eight most recent purchase activities with their status |
| Monthly activity and views | Activity volume chart and a daily breakdown |
| Daily sales | Sales total per day with a chart and a table |

KPI cards are clickable and take you to the module that owns the number: branches, products,
customers, suppliers and sale orders respectively.

## How to use it

### Read the KPIs

1. Sign in and open **Home** from the sidebar.
2. Check the six cards at the top. A green or red percentage next to customers compares the current
   period with the previous one; a dash means there is no comparable value yet.
3. Click a card to open its module when a number looks wrong.

Metrics are permission-aware. If you do not hold the page that produces a metric, that card shows a
zero or an empty state instead of an error. This is expected: it means the number is outside your
responsibility, not that the business has no data.

### Switch the managing branch

1. The branch selector appears only when you hold a business-scope role.
2. Choose a branch. The choice is stored in your session and every branch-filtered page follows it.
3. Branch-scope employees do not see the selector and always work inside their home branch.

### Work from the activity tables

- The **user activity** table lists the latest purchase activities, including their status. Use it to
  spot a purchase that is still pending or that was created by a colleague.
- The **user role** table shows how the team is distributed. It is a quick sanity check before you
  open the employee directory.

## What is restricted

- The page requires the `home` page capability. It is granted to every department template, so every
  employee can open the dashboard.
- Each metric is individually gated. Salaries, reports and other sensitive numbers never appear here.
- Branch switching requires a business-scope role **and** the `access.roles.write` capability is used
  to decide whether the administrator switch controls are rendered.
- Customers, suppliers and role counts are business-wide; stock, orders and sales are branch-specific.
  Two employees on different branches therefore see different cards on the same dashboard.
- If your employee membership has been revoked, the workspace refuses access and redirects you rather
  than showing a partial dashboard.

## Tips and troubleshooting

- **A card is empty although the module has data.** Check the selected branch and your page
  permissions. A metric you cannot read is deliberately blank.
- **The customer percentage shows a dash.** There were no customers in the comparison period.
- **Numbers look stale.** Dashboard data is cached briefly for performance. Refreshing the page after
  a minute is normally enough.
- **You cannot see the branch selector.** Your role is branch-scoped. Ask an administrator for a
  business-scope role if you genuinely need to switch branches.

## Related pages

- [Sales](/docs/business/sale/overview)
- [Inventory](/docs/business/inventory/overview)
- [Purchase](/docs/business/purchase/overview)
- [Employees](/docs/business/store/employees)
- [Reports](/docs/business/store/reports)
