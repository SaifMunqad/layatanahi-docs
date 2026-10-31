---
title: Global Products
section: business
---
# Global Products

The global product catalog shows what a business publishes to the market. It is the same catalog that
customers browse, presented inside the workspace so that your team can research a supplier's range,
compare models and confirm prices before creating a purchase order.

This is a read-only view. Your own products are managed in Inventory, and your public prices come from
your stock rows.

## What this page is about

- Inspecting the published catalog of a business.
- Searching by product name, model or SKU.
- Reading public prices and descriptions.
- Opening a product to see its details and variants.

## Page layout

| Area | What it shows |
| --- | --- |
| Search | Product name, model or SKU |
| Product list | Image, name, model, price and availability |
| Product detail | Description, attributes, images or 3D model, variants and reviews |
| Business context | The business or branch the catalog belongs to |

The catalog is paginated and loads further products as you scroll.

## How to use it

1. Open a business profile from **Public > Businesses**.
2. Choose the products action.
3. Search for the model you need.
4. Open a product to read the description, attributes and available variants.
5. Use the public price as a reference when negotiating or when creating a purchase order.
6. Compare with your own stock rows to decide whether to buy or transfer.

## What the public view shows and hides

| Field | Shown publicly | Notes |
| --- | --- | --- |
| Product name and model | Yes | Identity of the item |
| Description and attributes | Yes | Marketing and specification text |
| Public price | Yes | The published selling price |
| Variants | Yes | Published variants only |
| Reviews and ratings | Yes | Customer feedback |
| Stock quantity | No | Internal to the owner |
| Cost price | No | Internal to the owner |
| Supplier details | No | Internal to the owner |

## What is restricted

- Viewing requires `home` read. There is no write action on the catalog.
- The catalog belongs to another business; you cannot edit its products, prices or images from here.
- Only published products appear. Unpublished or out-of-stock items may be hidden by the owner.
- Prices are shown in the owner's currency; the catalog does not perform currency conversion.
- Reviews are visible but cannot be moderated from this screen.
- Product identifiers in URLs are scoped to the catalog; changing them does not reveal private stock.

## Tips and troubleshooting

- **A product is missing.** It may be unpublished, out of stock, or not shared by that business.
- **The price differs from a quotation.** The catalog price is the published price, not a negotiated one.
  Confirm with the supplier before ordering.
- **The 3D model does not load.** The owner may not have uploaded one; use the images instead.
- **You want to edit this product.** You cannot, unless it belongs to your business; use Inventory.

## Related pages

- [Businesses](/docs/business/public/businesses)
- [Inventory Listing](/docs/business/inventory/listing)
- [Purchase Orders](/docs/business/purchase/orders)
- [Public Catalog Overview](/docs/business/public/overview)
