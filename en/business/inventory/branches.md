---
title: Branches & Warehouses
section: business
---

# Branches & Warehouses

Inventory locations are where goods physically sit. A location can be a warehouse, a shop or a branch
store, and each one is treated as an independent stock hub. This page lists the locations your branch
can reach, shows their stock and history, and controls who else may use them.

A branch does not automatically see every warehouse. Access is granted per location, which lets a
company keep regional stock private while sharing a central warehouse.

## What this page is about

- Listing the warehouses and shops available to your branch.
- Viewing the stock, categories and movement history of one location.
- Registering a new warehouse with its address and code.
- Granting or revoking another branch's access to a warehouse.

## Page layout

| Screen | What it shows |
| --- | --- |
| Branch list | Your own branch highlighted, then the locations you can reach |
| Branch view | Identity, image, products, categories and stock history |
| Add or edit | Name, address, code, city, image and access grants |

Only administrators see the add, edit and access actions. Other users get a read-only list.

## How to use it

### Browse locations

1. Open **Inventory > Branches**.
2. Your own branch appears first as a highlighted card.
3. Search by name, address or code.
4. Open a card to inspect its stock.

The list paginates twenty rows at a time and continues as you scroll.

### Inspect a location

The location view has three tabs:

| Tab | What it contains |
| --- | --- |
| Products | Stock rows in that location with a card or table view, search and print |
| Categories | Category counts to understand the profile of the stock |
| History | Every stock movement with quantity change, employee, reason and date |

History rows link to the configuration list and, when applicable, to the source purchase or sale.

### Add a warehouse

1. Choose **Add inventory**.
2. Enter the name, code, address and city.
3. Upload an image. JPEG, PNG and WebP are accepted up to about two megabytes.
4. Save. The location becomes available to your branch immediately.

### Grant or revoke access

1. Open the location and choose **Access list**.
2. Choose **Add access** and pick a branch.
3. To revoke, select the branch in the granted table and confirm.

Access changes take effect immediately: the branch either starts seeing the stock or stops seeing it.

## What is restricted

- Reading requires `inventory.branches` read. Creating, editing and managing access require write, which
  is effectively an administrator capability.
- A branch only sees locations granted to it through the branch-to-inventory pivot. A direct URL to an
  ungranted location is refused.
- Editing is limited to locations inside your business. Another business's warehouse is never reachable.
- Access granting is available only to administrators and cannot be delegated through a branch-scoped
  role.
- Revoking access does not delete stock; it only hides the location from that branch's lists and sale
  screen.
- Images are validated by type and size; other formats are rejected.

## Tips and troubleshooting

- **A warehouse is missing.** It has not been granted to your branch. Ask an administrator to add it from
  the access list.
- **The stock is visible but the sale screen is empty.** Check that the sale is using an inventory your
  branch can access and that the row has available quantity.
- **History shows a movement I cannot explain.** Open the linked purchase, sale or transfer from the
  history row; the reference identifies the source document.
- **Access revocation did not take effect.** Ask the user to reload the page; the navigation and stock
  lists are rebuilt on the next request.

## Related pages

- [Inventory Overview](/docs/business/inventory/overview)
- [Inventory Listing](/docs/business/inventory/listing)
- [Stock Transfers](/docs/business/inventory/transfers)
- [Branch Profile](/docs/business/store/branches)
