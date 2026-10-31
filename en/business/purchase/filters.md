---
title: Purchase Filters & Search
section: business
---

# Purchase Filters & Search

Purchase lists grow quickly. The filter panel and the search box are how you turn a long register into
the short list you actually need — for example "unpaid purchases from this supplier in the last
month".

Filters are applied on the server and stored in the URL. That means the browser back button works,
bookmarks keep the view, and you can share an exact filtered list with a colleague.

## What this page is about

- Combining date, status, amount and balance filters.
- Searching by supplier, document number or amount.
- Sorting by a column.
- Keeping filters while you open and return from a document.

## The filter panel

| Filter | What it does | Options |
| --- | --- | --- |
| Date | Limits by creation date | Today, this week, this month, custom start and end |
| Status | Multi-select of trade statuses | Any combination of the twelve statuses |
| Amount | Limits by grand total | Minimum and maximum |
| Sort | Orders the result | Column and direction |
| Payables only | Hides fully paid documents | On or off |

Filters combine with AND. Selecting two statuses returns documents in either status, but the date and
amount ranges still apply. Clearing a filter returns it to "all".

## How to use it

### Apply a filter

1. Open **Purchase > Purchases**.
2. Choose **Filter**.
3. Enable the sections you need and set their values.
4. Apply. The list reloads without leaving the page and the URL is updated.
5. Copy the URL if you want to share the view or bookmark it.

### Search

Type into the search box and submit. The server matches:

- the supplier or branch name,
- the bill or document number,
- the totals and currency,
- the status label,
- the date.

Search and filters combine: a search term is applied inside the filtered set, not across the whole
branch.

### Reset the view

Clear the search box and disable the filter sections you enabled. The page returns to the default:
newest purchases of the active branch, thirty per page.

## Practical filter recipes

| Goal | Recipe |
| --- | --- |
| Work through supplier debt | Payables only, sort by date ascending |
| Month-end reconciliation | Custom date range covering the month, all statuses |
| Large purchases only | Amount minimum set to a threshold |
| Everything awaiting approval | Status filter limited to Pending approval and Ordered |
| A single supplier's history | Search the supplier name, then add a date range |

## What is restricted

- Filters require `purchase.purchases` read. They never broaden access: a filter is always intersected
  with your branch scope, so no combination can reveal another branch's purchases.
- Amount filters use the document grand total in its own currency. Mixed-currency lists therefore
  compare numbers across currencies; use the date and supplier filters for exact reconciliation.
- Search is a server round-trip; very short terms return broad results.
- Filter values are not remembered between sessions. Save the URL if you need the same view tomorrow.
- Exporting the filtered list is not available from this page; use the print action or the reports
  module.

## Tips and troubleshooting

- **The filter looks applied but the list is unchanged.** Check that you pressed Apply, not only toggled
  the section.
- **A known purchase is missing.** Clear the status filter; the document may still be Draft or Payment
  pending.
- **Results are slower than usual.** Very broad date ranges with no status filter scan more rows. Add a
  status or shorten the range.
- **The link shows a different list for a colleague.** Their branch is different. Filters cannot cross
  branches by design.

## Related pages

- [Purchase Listing](/docs/business/purchase/listing)
- [Records](/docs/business/purchase/records)
- [Purchase Overview](/docs/business/purchase/overview)
