---
title: Public Catalog Overview
section: business
---

# Public Catalog Overview

The public catalog is the part of Layatanahi that faces the market. It lists businesses, their branches
and their products, and it is how a company is discovered by buyers, partners and other businesses on the
platform.

Inside the Business workspace you use the same catalog to research suppliers, compare branches and inspect
what other businesses sell. The screens are read-oriented, with a small editing surface for your own
business profile and images.

## What this page is about

- Browsing the businesses registered on the platform.
- Opening a business profile and its product catalog.
- Browsing branches and their public information.
- Pinning branches you work with frequently.
- Maintaining your own business profile and logo.

## Pages in this section

| Page | Purpose | Capability |
| --- | --- | --- |
| Businesses | Directory of businesses on the platform | `home` read |
| Business profile | Identity, contact and catalog of one business | `home` read |
| Global products | Product catalog belonging to a business | `home` read |
| Branches | Directory of branches across businesses | `home` read |
| Branch profile | Public information, products and history of a branch | `home` read |
| Edit business | Update your business profile and images | `settings` write |

## What you can and cannot edit

| Object | Read | Edit |
| --- | --- | --- |
| Other businesses | Yes | No |
| Your own business | Yes | Yes, with settings write |
| Other branches | Yes | No |
| Your own branch | Yes | Through Store > Branches |
| Products | Yes | Through Inventory, not through the catalog |

The catalog is a window, not a management console. Changes to products, branches and stock are made in the
modules that own them.

## How the catalog is used

- **Supplier research.** Open a business profile to see what it sells before creating a purchase order.
- **Branch discovery.** Browse branches to find a partner location, then pin it so it appears in purchase
  and sale pickers.
- **Public storefront.** The storefront settings you configure in E-commerce control the banner, contact
  details and policy copy customers see on your own profile.

## What is restricted

- The catalog requires an authenticated employee session. It is not a public website for anonymous users
  in this workspace; customers use the customer-facing discover pages instead.
- Browsing requires only the `home` read capability, which every department holds.
- Editing a business profile requires `settings` write. You can only edit your own business; another
  business's edit route is refused.
- Pinning and unpinning a branch is a personal preference action and does not change the branch.
- The catalog never exposes private financial data, employee records or stock quantities of other
  businesses.
- Product information here is a public view; cost prices and internal stock are not shown.

## Tips and troubleshooting

- **A business is missing.** It may not be published, or its name differs from what you searched for.
- **The edit action is missing.** You are viewing another business, or you lack settings write.
- **A pin did not appear.** Pins affect the current user's pickers; reload the purchase or sale screen.
- **Product details look incomplete.** The public view shows published data only; use Inventory for your own
  stock rows.

## Related pages

- [Businesses](/docs/business/public/businesses)
- [Branches](/docs/business/public/branches)
- [Global Products](/docs/business/public/products)
- [Storefront Settings](/docs/business/ecommerce/storefront)
