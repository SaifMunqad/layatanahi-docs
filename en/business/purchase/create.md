---
title: Make Purchase
section: business
---

# Make Purchase

The Make Purchase form records goods arriving from a supplier or another branch. It creates the
purchase document, the invoice, the stock rows and the payment in one transaction, so a single save
keeps the ledger and the warehouse consistent.

Use it when the goods are physically received. If you only want to request goods and receive them
later, use Purchase Orders instead.

## What this page is about

- Capturing the supplier, the products, the prices and the quantity received.
- Choosing which inventory receives the stock and which account pays.
- Producing an invoice you can print and settle later if you do not pay in full now.

## Page layout

| Section | What it contains |
| --- | --- |
| Product lines | One row per variant with purchase price, sell price, quantity and comment |
| Supplier | A dropdown with an inline "add supplier" action |
| Document details | Bill number, miscellaneous amount and notes |
| Currency and account | The purchase currency and the branch account that pays |
| Inventory | The warehouse that receives the goods |
| Footer | Running totals and the submit action |

The form supports several product lines in one purchase. Each line is priced individually, which lets
you mix items bought at different costs in a single bill.

## Fields and rules

| Field | Required | Rules |
| --- | --- | --- |
| Supplier | Yes | Must exist in the business supplier directory |
| Product | Yes, at least one line | Must be a product variant |
| Purchase price | Yes per line | Zero or greater |
| Sell price | Yes per line | Zero or greater; used as the default retail price |
| Quantity | Yes per line | At least one |
| Comment | No | Up to 200 characters per line |
| Bill number | No | Up to 25 characters |
| Miscellaneous amount | No | Zero or greater; added to the invoice total |
| Currency | Yes | Determines which accounts can pay |
| Payment account | No | Must be active, belong to the branch and use the purchase currency |
| Inventory | No | Must be an inventory the branch can access |
| Notes | No | Up to 1,000 characters |

The payment account is optional: leave it empty to record the purchase as unpaid and settle it later
from Records > Bills. When it is set, the account must have enough balance and the same currency as
the purchase.

## How to use it

1. Open **Purchase** and choose **Make Purchase**.
2. Add each product line. Enter the purchase cost, the intended sell price and the quantity received;
   add a comment when a line needs clarification.
3. Pick the supplier. If the supplier is new, choose the inline add action and complete the supplier
   form first.
4. Enter the bill number from the supplier's paper and any miscellaneous charge such as transport.
5. Select the currency. Choose the account that pays if the purchase is settled now.
6. Select the receiving inventory.
7. Review the totals in the footer, then submit.
8. The system creates the invoice, debits the account, adds stock and records the activity. You are
   redirected to the purchase view where the document can be printed.

## Effects of saving

- A purchase and an invoice are created with their product lines.
- Stock rows are created or increased in the selected inventory.
- If an account was chosen, a payment is written, the account balance is reduced and the invoice is
  marked as paid up to that amount.
- Purchase activity and stock history entries are recorded for the audit trail.
- The branch that receives the goods is the branch in your session; you cannot choose another branch as
  the receiver.

## What is restricted

- The form requires `purchase.purchases` write. Read-only users can open the page but cannot submit.
- The payment account must belong to the active branch, be active and match the purchase currency.
  Cross-currency purchases need an exchange amount and are normally handled from the bill screen.
- The receiving inventory must be linked to your branch.
- Suppliers are shared across the business, but purchase documents remain branch-specific.
- Negative prices, zero quantities and lines without a variant are rejected by validation.
- A failure in any step (account balance, inventory access, stock write) cancels the entire save; the
  purchase is never half created.

## Tips and troubleshooting

- **The account dropdown is empty.** Create a branch account in Finance first, and check that its
  currency matches the purchase currency.
- **The inventory dropdown is empty.** Ask an administrator to grant your branch access to an inventory
  from Inventory > Branches.
- **The total does not match the paper bill.** Remember that the miscellaneous amount is added to the
  line totals; adjust it rather than editing a line price.
- **You need to change a saved purchase.** Open it and use Edit while the document is still editable;
  otherwise create a return for the difference.

## Related pages

- [Purchase Listing](/docs/business/purchase/listing)
- [View Purchase](/docs/business/purchase/show)
- [Suppliers](/docs/business/purchase/suppliers)
- [Records](/docs/business/purchase/records)
- [Inventory Listing](/docs/business/inventory/listing)
