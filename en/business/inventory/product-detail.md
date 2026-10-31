---
title: Product Stock View
section: business
---

# Product Stock View

The product stock view is the detail page for one stock row. It combines the product identity, its
images or 3D model, the price, the quantity breakdown, the attributes and the customer reviews, and it
is the entry point for every stock mutation.

Use it when you need to understand a single product deeply, or when you need to change something about
the exact batch sitting in a specific location.

## What this page is about

- Confirming what a stock row actually represents.
- Checking available, received and reserved quantities.
- Adjusting, transferring, repricing or selling this row.
- Reviewing attributes and customer feedback before promoting the product.

## Page layout

| Section | What it shows |
| --- | --- |
| Header actions | Customize stock, transfer stock, configure price tags and sell |
| Gallery | Product images and, when available, an interactive 3D model |
| Product info | Name, model, SKU, brand, country, price, compare-at price and description |
| Inventory stats | Available, received and reserved quantities with a visibility toggle |
| Attributes | Structured attributes such as size, colour or material |
| Reviews | Rating summary and customer reviews |

If the identifier is unknown, the page shows an empty state with a link back to the products list
rather than an error.

## How to use it

### Adjust stock

1. Open the row from the listing.
2. Choose **Customize stock**.
3. Enter a positive or negative quantity. Negative values reduce, positive values add.
4. Provide a reason.
5. Confirm. The available quantity changes and the configuration log records the movement.

The result can never fall below zero. Adding quantity also increases the received quantity so the two
figures stay consistent.

### Transfer stock

1. Choose **Transfer stock**.
2. Select the target inventory or branch.
3. Enter the quantity. It cannot exceed the available quantity.
4. Provide a reason and confirm.

A full transfer relocates the row. A partial transfer creates or increases the target row and reduces
the source row. The receiving location is notified when the transfer completes.

### Configure price tags

1. Choose **Configure price tags**.
2. Set the unit price and currency.
3. Optionally add quantity tiers: a starting quantity and a unit price per tier. Up to twenty tiers are
   allowed and starting quantities must be unique.
4. Tick the discount option only when the new price is genuinely lower than the previous one; the system
   verifies the drop before marking it as a discount.
5. Provide a reason and save. Tiers replace the previous ones entirely.

### Sell from stock

Choose **Sell** to open the normal sale screen with this stock row pre-selected. The stock itself is
not changed until the sale is submitted; the actual selling rules live in the Sale module.

### Toggle visibility

When the row can be published, the inventory stats section exposes a global visibility switch. Turning
it off hides the product from the public catalog without deleting the stock.

## What is restricted

- Reading requires `inventory.products` read; every action on this page requires write.
- The row must resolve inside a location your branch can reach. A foreign identifier returns not found
  instead of a product.
- A transfer target must be an inventory your branch can access; transfers to arbitrary branches are
  rejected.
- Quantity changes require a reason, and reductions cannot exceed availability.
- Price tiers are limited to twenty, must have distinct starting quantities and cannot be edited without
  a reason.
- Cost prices are not shown here. They belong to the purchase documents that created the stock.

## Tips and troubleshooting

- **The page is empty.** The identifier does not belong to your branch or the row was soft-deleted.
- **Transfer fails.** The target inventory is not granted to your branch, or the requested quantity is
  greater than the available quantity.
- **The discount badge does not appear.** The new price is not lower than the recorded previous price,
  so the system does not treat it as a discount.
- **Sell opens an empty cart.** The stock row has no available quantity, or the linked variant is no
  longer sellable.

## Related pages

- [Inventory Listing](/docs/business/inventory/listing)
- [Stock Transfers](/docs/business/inventory/transfers)
- [Configuration History](/docs/business/inventory/configurations)
- [Make Sale](/docs/business/sale/sell)
