---
title: Merge Stocks
section: business
---

# Merge Stocks

Duplicate stock rows are common: the same variant arrives from two purchases, gets moved between
warehouses, or is created twice during a correction. Merge Stocks consolidates those rows into one
without losing the total quantity or the audit history.

Merging is safer than editing quantities by hand. The system sums the quantities, keeps one row and
retires the others with a recorded merge entry.

## What this page is about

- Finding variants that have more than one stock row.
- Selecting the rows to combine.
- Choosing where the merged stock lives and at what price.
- Recording a reason for the consolidation.

## Page layout

| Area | What it shows |
| --- | --- |
| Search | Variant model, SKU or product identifiers |
| Variant groups | Only variants with more than one stock row |
| Stock panel | The rows of the selected variant with checkboxes and locations |
| Merge form | Target location, merge price and reason |
| Merge action | Enabled only when at least two rows are selected |

## How to use it

1. Open **Inventory > Configuration > Merge Stocks**.
2. Search for the variant, or pick it from the group list.
3. Select at least two rows. Use select-all when the whole variant should be consolidated.
4. Choose the target location. Leave it empty to keep the merged row in the branch itself.
5. Enter the merge price. This becomes the price of the resulting row.
6. Give a reason.
7. Confirm the merge.

### What happens on merge

| Aspect | Result |
| --- | --- |
| Quantities | Available, received and reserved are summed |
| Location | The merged row lives in the selected target |
| Price | The price you entered is applied |
| Currency | The most common currency among the rows is kept |
| Expiry | The nearest expiry date is kept |
| Source rows | Zeroed and soft-deleted |
| Audit | A merge configuration entry links the sources to the new row |

## Choosing the right target

- Merge into the warehouse where the goods physically are. If they are in two places, move one batch
  first and merge afterwards.
- Do not merge across branches with different prices unless you intend to reprice the whole batch.
- If the rows use different currencies, confirm which currency is most common before merging; the
  result keeps that one.

## What is restricted

- Reading requires `inventory.configuration` read; merging requires write.
- At least two rows must be selected, and all of them must belong to the same product variant.
- Every selected row must be inside your branch's scope; a foreign row is rejected.
- The target inventory must be one your branch can access.
- A reason is optional in validation but strongly recommended, because the merge entry is what future
  auditors will read.
- Merging is irreversible. The source rows are soft-deleted and cannot be split back from this screen.

## Tips and troubleshooting

- **A variant does not appear in the group list.** It has only one row, so there is nothing to merge.
- **Merge is disabled.** Fewer than two rows are selected, or the selection contains different variants.
- **The quantity after merging looks wrong.** One of the rows had reserved quantity. Reserved units are
  included in the sum; check open orders before merging.
- **You merged the wrong rows.** There is no undo. Record a purchase or an adjustment with a clear reason
  to restore the intended quantities, then lock the affected documents.

## Related pages

- [Configuration History](/docs/business/inventory/configurations)
- [Inventory Listing](/docs/business/inventory/listing)
- [Branches & Warehouses](/docs/business/inventory/branches)
