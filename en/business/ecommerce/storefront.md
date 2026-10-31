---
title: Storefront Settings
section: business
---

# Storefront Settings

The Storefront is the public face of your business inside Layatanahi. Customers reach it through the
discover catalog and see your banner, contact details and the policy copy you write here. Storefront
Settings is the single place where that public page is configured.

The page is business-wide: one configuration exists per business, not per branch, so every branch
publishes the same storefront.

## What this page is about

- Deciding whether the storefront is visible to customers at all.
- Choosing the banner image that represents the business.
- Publishing a phone number, e-mail address and opening hours.
- Writing the about, return and shipping texts in each supported language.

## Page layout

| Card | What it controls |
| --- | --- |
| Visibility | The publish switch and a short explanation of what publishing does |
| Banner | A single image uploaded to the business image library |
| Contact | Phone number, e-mail address and opening hours |
| Localized copy | One row per language with about, return policy and shipping policy |
| Save | A single action that submits the whole page atomically |

If you only hold read access, a warning banner appears at the top and every field is disabled.

## How to use it

### Publish or unpublish

1. Open **E-commerce > Storefront**.
2. Toggle **Published**. An unpublished storefront is hidden from customers while your internal data
   remains untouched.
3. Save. The change applies immediately to the customer catalog.

### Upload a banner

1. Choose **Browse** in the Banner card.
2. Select a JPEG, PNG or WebP image.
3. Wait for the upload to finish, then save. Only one banner is kept; selecting a new file replaces
   the previous path when you save.

### Fill in the contact block

| Field | Required | Rules |
| --- | --- | --- |
| Phone | No | Up to 30 characters |
| E-mail | No | Must be a valid address, up to 50 characters |
| Opening hours | No | Free text, up to 255 characters |

### Write the localized copy

1. Select a language from the dropdown.
2. Fill in **About**, **Return policy** and **Shipping policy**. Each field accepts up to 2,000
   characters.
3. Switch language and repeat. Adding a language lazily creates an empty row the first time you open
   it.
4. Save once at the end. All language rows are submitted together, so a validation error on one row
   blocks the whole save.

Customers see the copy in their own language when it exists, and fall back to another available
language otherwise. Keep the texts short and factual: they are customer-facing policy statements.

## What is restricted

- Reading requires the `ecommerce.storefront` read capability; saving requires write. The page is held
  by Administration and Management only.
- Publishing requires an active business subscription. With a lapsed subscription the save is refused,
  even for an administrator.
- The configuration is keyed to the business, not the selected branch. A branch manager editing the
  storefront changes it for every branch.
- At least one language row is mandatory and each language may appear only once.
- The banner must be uploaded through the media picker; arbitrary external URLs are rejected by
  validation length limits and are not recommended.
- Unpublishing hides the storefront but does not delete the uploaded banner or the written copy.

## Tips and troubleshooting

- **Save does nothing.** Check for a validation message on a language row, and confirm the
  subscription is active.
- **Customers still see the old text.** The customer catalog caches the storefront briefly. Ask them to
  reload after a minute.
- **The banner does not change.** Make sure the upload finished before saving; an interrupted upload
  leaves the previous image in place.
- **You cannot see the menu entry.** The storefront navigation item is only rendered when you hold
  `ecommerce.storefront` read.

## Related pages

- [Public Catalog Overview](/docs/business/public/overview)
- [Businesses](/docs/business/public/businesses)
- [Branches](/docs/business/store/branches)
- [Business Workspace Overview](/docs/business/overview)
