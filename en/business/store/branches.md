---
title: Branches
section: business
---

# Branches

A branch is a physical location of the business: a shop, an office or a warehouse with its own staff,
stock and financial records. The Branches page is the directory of those locations, and the place where
each branch profile is created and maintained.

Customers discover branches through the public catalog, so the profile is not only internal: the name,
address, map location and visibility all affect how the business appears to buyers.

## What this page is about

- Browsing the branches of the business.
- Creating a branch with translations, location and settings.
- Viewing a branch profile with its KPIs and staff.
- Switching the managing branch or pinning a branch for quick access.

## Page layout

| Screen | What it shows |
| --- | --- |
| Branch list | Your own branch highlighted, then the other branches with name, image and address |
| Create or edit | Identity, translations, map location, inventory access and sales settings |
| Branch view | Statistics, identity card, map, employees and subscriptions |

The list paginates thirty branches at a time and supports search by name or address.

## How to use it

### Create a branch

1. Open **Store > Branches** and choose **Add branch**.
2. Complete the identity fields: username, phone, e-mail, website, tax number, city and calendar type.
3. Add at least one translation: language, branch name and address.
4. Place the branch on the map to capture latitude and longitude.
5. Grant inventory locations if this branch must sell from existing warehouses.
6. Set visibility and sales options: public, over-quantity sales allowed, main branch.
7. Save. You are taken to the new branch profile.

| Field | Required | Rules |
| --- | --- | --- |
| Username | Yes | Up to 50 characters, unique |
| Calendar type | Yes | Shamsi, Gregorian or Islamic |
| Translation | Yes, at least one | Language unique per branch, name up to 255, address up to 500 |
| Inventory | No | Must belong to the business |
| Public | No | Defaults to visible |
| Main branch | No | Marks the primary location |

### View a branch

The profile shows the statistics for that branch and three tabs:

| Tab | Contents |
| --- | --- |
| Overview | Identity, creation date, description and map |
| Employees | Staff avatars with the manager flagged, linking to employee profiles |
| Subscriptions | Plan and renewal information, visible to administrators |

From here you can pin the branch, set it as the managing branch, or open the edit form.

### Edit a branch

Editing exposes the same sections as creation. A user must be an employee of that branch to edit it, and
inventory grants are only applied for administrators.

## What is restricted

- Reading requires `store.branches` read; creating and editing require `store.branch` write.
- Branches are limited to the signed-in business. Another business's branch is not reachable.
- An editor must belong to the branch being edited, or hold an administrator role that manages it.
- Inventory grants and subscription information require administrator rights.
- The public visibility flag hides the branch from the customer catalog but does not delete it.
- Making a branch the main branch automatically clears the flag on the previous one.

## Tips and troubleshooting

- **The public page does not show the branch.** Check the public flag and the translations; a branch
  without a translated name or address cannot present itself properly.
- **The branch is missing from the list.** It may belong to another business, or your role is scoped to a
  branch that has no access to it.
- **The map is empty.** Latitude and longitude were not captured; open edit and place the marker again.
- **Inventory access could not be saved.** Only administrators can change grants; ask one to apply them.

## Related pages

- [Employee Access](/docs/business/store/employee-access)
- [Inventory Branches](/docs/business/inventory/branches)
- [Public Catalog](/docs/business/public/overview)
- [Store Overview](/docs/business/store/overview)
