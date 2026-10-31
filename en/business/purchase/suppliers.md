---
title: Suppliers
section: business
---

# Suppliers

Suppliers are the businesses and branches you buy from. The supplier directory is shared by the whole
business: a supplier created in one branch is available in every branch, because a company usually
negotiates with the same partners everywhere.

The module has three screens — the landing page with pinned suppliers, the pinned list and the full
directory — plus a supplier profile with its payable balance, payments and trades.

## What this page is about

- Maintaining a clean, searchable list of suppliers.
- Pinning the partners you use most so they appear first.
- Seeing how much you owe each supplier.
- Reviewing the history of purchases and sales with a supplier.

## Page layout

| Screen | What it shows |
| --- | --- |
| Suppliers landing | Pinned supplier cards and a table of recently added suppliers |
| Pinned | Only the suppliers you pinned, paginated and searchable |
| All suppliers | The full directory with name, phone and added date |
| Supplier profile | Identity, payable balance, latest payments and both trade directions |

Pinning is managed from the business catalog: the pinned cards link to the businesses module where the
pin action lives.

## How to use it

### Add a supplier

1. Open **Purchase > Suppliers**.
2. Choose **Add supplier**.
3. Complete the name, type, city, district, address and phone. Phone is required and is validated as an
   Afghan number; e-mail and website are optional.
4. Save. The supplier is available immediately in the purchase form and in other branches.

| Field | Required | Rules |
| --- | --- | --- |
| Name | Yes | Up to 50 characters |
| Type | Yes | Must be an existing supplier type |
| City | Yes | Must exist |
| District | Yes | At least one district |
| Address | No | Up to 255 characters |
| Phone | Yes on create | Afghan international format; stored in international form |
| E-mail | No | Valid address, up to 50 characters |
| Website | No | Valid URL, up to 255 characters |

### Find a supplier

Use the search box on the pinned list to match a name, username or business name, and on the full
directory to match a name, phone or type. Both lists paginate thirty-six rows at a time.

### Read a supplier profile

The profile opens on **Intro**, which shows identity details and the payable balance. The payable
balance is the sum of the outstanding amounts of that supplier's purchase invoices: it is what you owe
them today.

- **Payments** lists the latest payments with type, reference, category, amount, status and date.
- **Trades** shows two tables: purchases and sales with this supplier, each with the invoice number,
  total, status and date.

### Edit or delete a supplier

1. Open the supplier profile.
2. Choose **Edit** to change the contact details, or **Delete** to remove the supplier.
3. Deletion requires an acknowledgement checkbox and performs a soft delete. Invoices and payments are
   kept; the supplier simply disappears from new selections.

## What is restricted

- Reading requires `purchase.suppliers` read; adding, editing and deleting require write.
- Suppliers are business-wide. A branch-scope user can read the directory but acts on the same records
  as every other branch.
- Deleting a supplier never deletes its invoices or payments. Outstanding balances survive the deletion
  and must still be settled.
- The phone number must be a valid Afghan number and is normalized before storage, so `+93` and `93`
  forms are treated as the same supplier contact.
- Pinning is not a supplier action; it is a business catalog action and requires the corresponding
  capability there.
- You cannot edit a supplier from another business.

## Tips and troubleshooting

- **A supplier is missing from the purchase form.** Check that you are searching in the same business
  and that the supplier was not deleted.
- **The payable balance looks too high.** Open Trades and check for invoices that are partially paid or
  still pending.
- **The phone is rejected.** Enter an Afghan number in international format, for example
  `+93700000000`.
- **Two records exist for the same supplier.** Merge them manually by moving outstanding invoices, then
  delete the duplicate. The product does not merge suppliers automatically.

## Related pages

- [Purchase Overview](/docs/business/purchase/overview)
- [Make Purchase](/docs/business/purchase/create)
- [Purchase Orders](/docs/business/purchase/orders)
- [Records](/docs/business/purchase/records)
- [Public Catalog](/docs/business/public/overview)
