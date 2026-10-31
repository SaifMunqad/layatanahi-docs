---
title: Sale Filters & Search
section: business
---

# Sale Filters & Search

The sales register grows with every transaction. The filter panel and search box reduce it to the list
you need, and because the state lives in the URL you can bookmark or share an exact view.

Filters are applied on the server inside your branch scope. They can narrow results but never reveal
another branch's sales.

## What this page is about

- Filtering by date, status, amount and outstanding balance.
- Searching by customer, invoice, product or branch.
- Sorting the result set.
- Reusing a filtered view through its URL.

## The filter panel

| Filter | Options | Notes |
| --- | --- | --- |
| Date | Today, this week, this month, custom range | Based on the sale creation date |
| Status | Any combination of trade statuses | Multi-select |
| Amount | Minimum and maximum | Uses the invoice grand total |
| Sort | Column and direction | Useful for due dates and totals |
| Outstanding only | On or off | Hides fully paid invoices |

Filters combine with AND. Two statuses mean "either status", while the date and amount ranges still
apply to both.

## How to use it

1. Open **Sale > Sales**.
2. Choose **Filter** and enable the sections you need.
3. Apply. The table reloads in place and the URL updates.
4. Add a search term if you know the customer, invoice number or product.
5. Copy the URL to keep or share the view.

### Search behaviour

The server matches the customer or branch name, invoice number, product names, totals, status label and
date. Search applies within the filtered set, so a customer search inside a date range returns only that
customer's sales in that period.

### Reset

Clear the search and disable the enabled filter sections. The list returns to the branch default:
newest sales, thirty per page.

## Useful recipes

| Goal | Recipe |
| --- | --- |
| Chase customer debt | Outstanding only, sort by date ascending |
| Daily reconciliation | Date today, all statuses |
| Large invoices only | Amount minimum threshold |
| Inter-branch sales awaiting acceptance | Status Pending approval |
| One customer's history | Search the customer name, add a date range |
| Month-end audit | Custom range covering the month, sort by invoice number |

## What is restricted

- Filters require `sale.sales` read and are always intersected with the branch scope.
- Amount filters compare grand totals in each invoice's own currency, so mixed-currency lists are not
  directly comparable; use date and customer filters for reconciliation.
- Search is a server request; very short terms return broad results.
- Filter state is not stored between sessions. Keep the URL if the view matters.
- There is no export from this page; use print or the Store reports.

## Tips and troubleshooting

- **The list did not change.** Confirm you pressed Apply, not only toggled a section.
- **A known sale is missing.** Clear the status filter; it may still be Pending approval or Draft.
- **Results are slow.** A wide date range with no status filter scans more rows; add a status.
- **A colleague sees different rows.** Their branch differs. Filters never cross branches.

## Related pages

- [Sale Listing](/docs/business/sale/listing)
- [Records](/docs/business/sale/records)
- [Sale Overview](/docs/business/sale/overview)
