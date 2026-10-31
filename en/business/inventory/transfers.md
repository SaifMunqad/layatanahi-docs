---
title: Stock Transfers
section: business
---

# Stock Transfers

A transfer moves quantity of a stock row from one location to another without buying or selling
anything. It is the correct tool when a shop is running low, when a central warehouse supplies a branch,
or when goods were stored in the wrong place.

Layatanahi does not have a separate transfer page. Transfers are performed from the product stock view,
and every transfer is recorded as a configuration entry and visible in stock history.

## What this page is about

- Moving quantity between warehouses and branches.
- Keeping total stock constant while locations change.
- Recording who moved what, where, and why.
- Notifying the receiving location.

## How a transfer works

| Step | What happens |
| --- | --- |
| Choose quantity | You enter how many units to move |
| Choose target | You select an inventory or branch you can access |
| Validate | The quantity cannot exceed what is available |
| Record reason | The reason is mandatory |
| Apply | The source decreases and the target increases, or the row relocates |
| Notify | The receiving location receives a notification |

A **full transfer** relocates the stock row, keeping its identity and price. A **partial transfer**
creates or increases a row in the target location and leaves the rest behind.

## How to use it

1. Open **Inventory > Products** and find the row.
2. Open the product stock view.
3. Choose **Transfer stock**.
4. Select the target inventory or branch. Only locations your branch is granted appear.
5. Enter the quantity to move. The maximum is the available quantity.
6. Write the reason, for example "weekly replenishment" or "wrong shelf".
7. Confirm.

The configuration log records a move entry and the stock history of both locations shows the movement.

## Transfer versus adjustment

| Situation | Use |
| --- | --- |
| Goods physically moved to another warehouse | Transfer |
| Goods damaged, lost or counted incorrectly | Adjustment or reduction |
| Goods sold to a customer | Sale |
| Goods returned by a customer | Sale return |
| Duplicate rows in the same place | Merge |

Using a transfer for a loss, or an adjustment for a relocation, breaks the location history and makes
later audits harder to reconcile.

## What is restricted

- Reading requires `inventory.products` read; performing a transfer requires write.
- The source row must belong to your branch. The target must be an inventory your branch can access;
  arbitrary inventory identifiers are rejected.
- The quantity must be at least one and cannot exceed the available quantity at the moment of transfer.
- The reason is mandatory and is shown to auditors.
- Transfers never change the total quantity across the business; they only change where it sits.
- A transfer cannot move reserved quantity. Check open orders before promising stock from a location.

## Practical scenarios

| Scenario | Recommended approach |
| --- | --- |
| Main warehouse replenishes a shop | Partial transfer of the replenishment quantity |
| A shop closes and its stock moves | Full transfer of each row to the surviving location |
| Goods were received at the wrong warehouse | Transfer to the correct warehouse, with the purchase document as reference |
| Stock needs to be sold from another branch | Transfer first, then sell from the receiving location |

## Tips and troubleshooting

- **The target is missing.** Your branch has no grant for that inventory. Ask an administrator to add it
  from Inventory > Branches.
- **The quantity is rejected.** It exceeds the available quantity; refresh the page to get the current
  figure.
- **The stock decreased in total.** A transfer should not change the total. Check whether an adjustment
  or a merge was performed instead.
- **The receiving branch cannot see the stock.** Access to the target inventory is separate from the
  transfer itself; grant access if the receiving branch must sell from it.

## Related pages

- [Product Stock View](/docs/business/inventory/product-detail)
- [Branches & Warehouses](/docs/business/inventory/branches)
- [Configuration History](/docs/business/inventory/configurations)
- [Stock Changes & History](/docs/business/inventory/changes)
