---
title: Customers
section: business
---

# Customers

Customers are the people and organizations you sell to. Unlike suppliers, the customer directory is
shared across the business: a customer registered at one branch can be selected at any other, so a
company does not create the same buyer twice.

The module gives you a card directory, an add form, and a profile with balances, payments and purchase
history.

## What this page is about

- Maintaining a clean customer directory.
- Adding a customer quickly from a sale screen.
- Seeing how much a customer owes.
- Reviewing their payments and purchases.

## Page layout

| Screen | What it shows |
| --- | --- |
| Customer list | Responsive avatar cards with name and contact details |
| Add customer | First name, last name, phone, e-mail and organization |
| Customer profile | Identity, outstanding balance, payments, purchases and shipment addresses |

The list searches on the server and loads thirty-six cards at a time as you scroll.

## How to use it

### Add a customer

1. Open **Sale > Customers** and choose **Add customer**, or use the inline add action inside a sale.
2. Enter the first and last name, the phone number and, optionally, the e-mail and organization name.
3. Save. The new customer is selected automatically when you added them from a sale.

| Field | Required | Rules |
| --- | --- | --- |
| First name | Yes | Up to 50 characters |
| Last name | Yes | Up to 50 characters |
| Phone | Yes | Afghan international format; unique within the business |
| E-mail | No | Valid address, up to 50 characters |
| Organization | No | Up to 100 characters |

The phone number is normalized before it is stored, so `+93` and `93` forms identify the same customer.

### Find a customer

Type a name, phone or organization in the search box. The server returns matching customers for the
whole business, not only those added by your branch.

### Read a customer profile

The profile opens on **Intro**, showing contact details and the outstanding balance. The balance is the
sum of unpaid amounts across that customer's sale invoices.

| Tab | Contents |
| --- | --- |
| Intro | Identity details and outstanding balance |
| Payments | The latest payments with reference, category, employee, amount and date |
| Purchases | The latest invoices with invoice number, total, paid, due and date |
| Shipment info | Saved delivery addresses |

### Edit or delete

Editing uses the same fields as creation. Deleting is only allowed for guest customers, requires
confirmation, and performs a soft delete. Invoices and payments are kept.

## What is restricted

- Reading requires `sale.customers` read; adding, editing and deleting require write.
- Customers are business-wide. A branch-scope user sees the same directory as everyone else.
- Only guest customers can be deleted. Registered accounts and customers linked to a user account are
  protected.
- The phone number must be unique per business after normalization; duplicates are rejected.
- You cannot delete a customer with outstanding invoices from the interface; settle or write off the
  balance first.
- Payment and purchase tabs are read-only; corrections happen in Records or Returns.

## Tips and troubleshooting

- **The customer already exists.** Search by phone before adding; the normalized number is the reliable
  identifier.
- **The customer cannot be deleted.** They are not a guest, or the record is referenced by protected
  documents.
- **The balance looks wrong.** Open Purchases and compare paid and due per invoice; a payment request
  still pending does not reduce the balance.
- **A sale was made to the wrong customer.** Correct it from the sale if it is still editable; otherwise
  record a return and a new sale.

## Related pages

- [Make Sale](/docs/business/sale/sell)
- [Sale Listing](/docs/business/sale/listing)
- [Records](/docs/business/sale/records)
- [Returns](/docs/business/sale/returns)
