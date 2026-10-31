---
title: Configuration History
section: business
---

# Configuration History

Configuration is the audit trail of stock. Every time a quantity changes, a price is updated or two rows
are merged, the system writes an entry: who did it, what changed, the previous and new values, and why.
This page is where you read that trail.

When a physical count disagrees with the system, this is the first screen to open. It usually explains
the difference without any guesswork.

## What this page is about

- Reviewing every stock movement of the branch in chronological order.
- Identifying the employee and reason behind a change.
- Jumping from an entry to the affected product or source document.
- Filtering down to one product, SKU or action type.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | Title, print, search and the add-configuration action |
| Table | Product, configured by, action count, status and date |
| Reason | A translated explanation, for example "damaged in transit" |
| Scroll sentinel | Loads older entries automatically |

Rows are grouped by product and action so a batch update appears once with a count instead of dozens of
near-identical lines.

## Action types

| Action | Meaning |
| --- | --- |
| Added | Quantity was increased |
| Reduced | Quantity was decreased |
| Moved | Quantity was transferred to another location |
| Merged | Two or more rows were consolidated |
| Edited | Price, currency, visibility or another attribute changed |
| Deleted | A row was removed from active stock |

## How to use it

### Investigate a difference

1. Open **Inventory > Configuration**.
2. Search by product name, model, SKU or reason.
3. Sort or scroll back to the period you are checking.
4. Open the entry to see the employee, date, previous quantity and new quantity.
5. Follow the link to the product row or to the purchase, sale or transfer that caused the change.

### Deep links from stock history

The History tab of a branch or warehouse links here with a product filter already applied. The matching
row is highlighted so you can confirm the movement without searching again.

### Add a manual entry

The add action is available to users with write access. It creates a configuration entry for a
correction that has no other document behind it, for example an initial count. Use it sparingly: a
purchase, sale or transfer is always a better explanation than a manual note.

## Reading an entry correctly

| Field | How to read it |
| --- | --- |
| Configured by | The employee whose session made the change |
| Action count | How many units or rows the action affected |
| Status | The action type, shown with a colour and label |
| Date | When the change was applied, in your calendar format |
| Reason | The mandatory explanation entered by the employee |

An entry explains *what the system recorded*, not necessarily why the physical stock differs. For
example, a sale reduction is a legitimate movement; a theft is a manual reduction with a reason.

## What is restricted

- Reading requires `inventory.configuration` read; adding a manual entry requires write.
- Entries are branch-scoped. Configuration written by another branch's inventory is not visible.
- A manual entry cannot change a quantity by itself; it records the explanation of an adjustment made
  elsewhere.
- Entries cannot be edited or deleted. The audit trail is append-only, which is what makes it reliable.
- The page never exposes cost prices or supplier financial data.

## Tips and troubleshooting

- **The entry I need is missing.** Check the branch selector and widen the date range; entries are
  paginated and older rows load as you scroll.
- **The reason is untranslated.** Custom reasons are shown as entered; only standard reasons have
  translations.
- **The action count looks too high.** A batch operation (merge or bulk adjustment) records one entry
  with the total count.
- **A colleague denies a change.** The entry records the employee session that performed it; the Store
  Activities page shows the broader context.

## Related pages

- [Inventory Overview](/docs/business/inventory/overview)
- [Stock Changes & History](/docs/business/inventory/changes)
- [Stock Transfers](/docs/business/inventory/transfers)
- [Merge Stocks](/docs/business/inventory/merge-stocks)
- [Activities](/docs/business/store/activities)
