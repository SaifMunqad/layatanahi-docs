---
title: Stock Changes & History
section: business
---

# Stock Changes & History

Every stock row has a history. The History tab of a branch or warehouse shows the movements of the
products stored there: purchases, sales, returns, transfers, adjustments and merges, each with the
quantity change, the resulting quantity, the employee and the reason.

This is the operational view. Configuration History is the audit view of the same events; Stock Changes
focuses on what happened to the goods in a location.

## What this page is about

- Understanding how a product's quantity evolved over time.
- Finding the document behind a movement.
- Comparing a physical count with recorded activity.
- Spotting unusual patterns such as repeated reductions.

## Page layout

| Column | Meaning |
| --- | --- |
| Product | Variant name |
| SKU | Stock keeping unit |
| Location | The warehouse or branch, shown in branch-wide history |
| Change type | Purchase, sale, return, move, divide, merge or adjustment |
| Quantity change | Signed value; green for increases, red for reductions |
| New quantity | The quantity after the movement |
| Employee | Who performed the action |
| Notes | The reason or reference recorded at the time |
| Date | When the movement happened |

Each row links to the configuration entry and, when a source document exists, to the purchase or sale
that produced it.

## How to use it

1. Open **Inventory > Branches** and choose a location.
2. Switch to the **History** tab.
3. Filter by product or scroll to the period you need.
4. Read the change type before the number: a reduction after a sale is expected, a reduction without a
   document is a manual correction.
5. Open the linked entry when you need the employee or the reason.

## Change types

| Type | Caused by |
| --- | --- |
| Purchase | Goods received from a supplier or branch |
| Sale | Goods sold to a customer or branch |
| Purchase return | Goods sent back to a supplier |
| Sale return | Goods returned by a customer |
| Move | A transfer between locations |
| Divide | A row split into multiple rows |
| Merge | Rows consolidated |
| Adjustment | Manual increase or reduction |

## Reading a movement

The signed quantity is the most useful field. A row showing `+12` and a new quantity of `40` means the
location held 28 units and received 12. A row showing `-3` with a new quantity of 37 means three units
left.

When the new quantity does not match the arithmetic of the previous row, the history is showing a
different row or location. Confirm the location filter first.

## What is restricted

- Reading requires `inventory.branches` read for the branch history and `inventory.configuration` for the
  linked configuration details.
- History is limited to locations your branch can access. Movements in another branch's warehouse are
  not shown.
- History cannot be edited or deleted. Corrections appear as new movements, not as changes to old rows.
- Cost prices and supplier financial data are not shown in this view.
- The tab shows the rows that exist today. A fully consumed row still appears through its configuration
  entries, but not necessarily in the branch product list.

## Tips and troubleshooting

- **A movement has no note.** Older records or automated flows may not include a reason. Open the
  configuration entry for the employee and context.
- **The product is missing from History.** Check that you are in the correct location and that the row
  was ever stored there.
- **Numbers do not add up.** Sales and purchases change quantity; transfers change location only. Compare
  the same location over time rather than across locations.
- **You suspect theft or error.** Export or print the history and compare it with the configuration log
  and cash records before confronting anyone.

## Related pages

- [Branches & Warehouses](/docs/business/inventory/branches)
- [Configuration History](/docs/business/inventory/configurations)
- [Stock Transfers](/docs/business/inventory/transfers)
- [Inventory Overview](/docs/business/inventory/overview)
