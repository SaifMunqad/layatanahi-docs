---
title: Inventory Listing
section: business
---

# Inventory Listing

The Inventory Products page is the catalogue of everything your branch currently holds. You can browse
it as cards or as a table, search for a variant, check its price and quantity, and open the stock row to
adjust, transfer or sell it.

It is the screen most operational questions start from: "do we have this model?", "what does it cost
today?", "where is it stored?".

## What this page is about

- Browsing the branch stock by product, model or SKU.
- Seeing price, available quantity and location at a glance.
- Opening a stock row for adjustments.
- Switching between a visual card grid and a dense table.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | Title, view-mode toggle, print and search |
| Card grid | Product image, name, model, SKU, price, quantity and currency |
| Table | Product, model, SKU, price, available quantity, currency and location |
| Row actions | Edit configuration and reduce stock |
| Scroll sentinel | Loads the next page automatically |

The chosen view mode is kept in the URL, so a shared link opens the same layout.

## Columns explained

| Column | Meaning |
| --- | --- |
| Product | Name of the variant |
| Model | Manufacturer model reference |
| SKU | Stock keeping unit, unique per variant |
| Price | Selling price, with a suffix when a discount is active |
| Available | Quantity you can sell right now |
| Currency | Currency of the price |
| Location | The inventory or branch holding the row |

## How to use it

### Find a product

1. Open **Inventory > Products**.
2. Type a product name, model or SKU and submit. The search runs on the server and resets to page one.
3. Switch to the table view when you need to compare numbers across rows.
4. Use the print action for a paper stock list.

### Adjust a stock row

1. Choose the edit action on a row.
2. Change the unit price, optional currency, visibility or transfer target.
3. Provide a reason for the change.
4. Save. The configuration history records the previous and new values.

### Reduce stock

1. Choose the reduce action.
2. Enter the quantity to remove. It cannot exceed the available quantity.
3. Enter a reason such as damage, expiry or a count correction.
4. Confirm. The available quantity is reduced and an entry is written to the configuration log.

## Viewing versus changing

The listing is safe to browse: nothing changes until you open an action. Two behaviours are worth
remembering:

- **Price editing is a stock action.** Changing a price here affects the stock row, not the product
  definition, and is recorded with a reason.
- **Location is part of the row.** Two identical products stored in two warehouses appear as two rows;
  moving quantity between them is a transfer, not an edit.

## What is restricted

- Reading requires `inventory.products` read; adjustments, reductions, transfers, price changes and
  selling require write.
- Only stock rows in inventories your branch can access are returned. A branch without a grant sees an
  empty list rather than another warehouse's stock.
- The quantity field is read-only in the listing; it changes only through a purchase, sale, return,
  transfer, adjustment or merge.
- A reduction cannot exceed the available quantity, and a reason is mandatory.
- Soft-deleted stock rows disappear from the list but remain available to audit.
- The listing never shows cost prices; those live in the purchase documents.

## Tips and troubleshooting

- **The list is empty.** Your branch has no inventory grant, or every row is filtered out by the search.
  Ask an administrator to grant access from Inventory > Branches.
- **The price shown is not the one used at checkout.** The sale screen reads the stock row for the
  selling location. Check that you are looking at the right row when duplicates exist.
- **Quantity is lower than the physical count.** Open Configuration and look for recent reductions,
  sales or transfers before adjusting.
- **A product has two rows.** Use Merge Stocks to consolidate them instead of editing quantities
  manually.

## Related pages

- [Product Stock View](/docs/business/inventory/product-detail)
- [Branches & Warehouses](/docs/business/inventory/branches)
- [Configuration History](/docs/business/inventory/configurations)
- [Merge Stocks](/docs/business/inventory/merge-stocks)
- [Inventory Overview](/docs/business/inventory/overview)
