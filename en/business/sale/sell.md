---
title: Make Sale
section: business
---

# Make Sale

The Sell screen is where a branch records a customer sale. It combines a receiver picker, a product
cart, pricing, discount, an optional payment account and a summary bar, and it writes the invoice, the
stock movement and the payment in one step.

Use the normal sale screen for day-to-day selling. Use Quick Sell when you only need a fast counter
entry with a profit preview.

## What this page is about

- Recording a sale to a customer or another branch.
- Choosing whether the customer pays now (reserve) or owes money later (lend).
- Applying a discount or a miscellaneous charge.
- Decrementing stock in the correct location.

## Page layout

| Section | What it contains |
| --- | --- |
| Receiver | Search customers or pinned branches, with an inline add-customer action |
| Sale details | Currency, payment account, discount, miscellaneous amount and notes |
| Product picker | Search stock rows, scan a barcode, or deep-link from a stock row |
| Cart lines | Price, quantity, comment and remove per line |
| Summary bar | Subtotal, discount, miscellaneous, tax and final total |
| Submit | Creates the sale or updates an editable one |

If you arrived from a stock row with the Sell action, that product is already selected.

## Fields and rules

| Field | Required | Rules |
| --- | --- | --- |
| Receiver type | Yes | Customer or branch |
| Receiver | Yes | Must belong to the business; cannot be your own branch |
| Currency | Yes | Must match the stock currency of every product |
| Payment account | No | Active branch account in the same currency; leave empty to sell on credit |
| Discount | No | From zero up to the subtotal |
| Miscellaneous amount | No | Added to the total |
| Product | Yes, at least one | Must be a stock row in an inventory your branch can access |
| Sell price | Yes per line | Zero or greater |
| Quantity | Yes per line | At least one; may be limited by availability |
| Comment | No | Up to 200 characters per line |

## How to use it

1. Open **Sale > Sell**.
2. Search for the customer, or choose a branch as the receiver. If the customer is new, add them inline
   and continue.
3. Choose the currency. The product picker only offers stock in that currency.
4. Add products by searching, scanning a barcode, or clicking a product card. Adjust price and quantity
   per line.
5. Apply a discount or a miscellaneous amount if needed.
6. Choose the reserve account when the customer pays now; leave it empty to record a debt.
7. Review the summary bar and submit.
8. The invoice is created, stock is reduced and you are taken to the sale view for printing.

### Editing a sale

If the sale is still editable, open it from the listing and choose edit. The same form opens prefilled.
Saving reverts the previous stock and payment effects and applies the new values. Editing is blocked
once the sale is locked, once more than one payment exists, or when the currency of the attached account
would have to change.

## What saving does

- Creates the sale, the invoice and the invoice lines.
- Reduces available stock in the selling inventory and writes a stock history entry.
- When an account is chosen, writes a payment, credits the account and marks the invoice as paid up to
  that amount.
- When the receiver is a branch, creates a payment request so the receiving branch can accept the sale.
- Writes sale activity for the audit trail.

## What is restricted

- The screen requires `sale.sell` write. Read-only users cannot open it at all, by design.
- The receiver must belong to the business, and selling to your own branch is rejected.
- Every product must exist in an inventory your branch can access and must match the sale currency.
- Selling more than the available quantity is rejected unless the branch enables over-quantity sales in
  its settings.
- A discount larger than the subtotal is rejected.
- An unsaved cart triggers a confirmation before you navigate away, to avoid losing the entry.

## Tips and troubleshooting

- **The product picker is empty.** Check the currency, the inventory grant and whether the stock row has
  available quantity.
- **The account dropdown has no options.** Create a branch account with the sale currency in Finance.
- **The sale stays Pending approval.** The receiver is another branch; it must accept the request first.
- **You cannot edit.** The document is locked or already has multiple payments. Record a return or a
  correcting sale instead.
- **The cart disappears when you change currency.** Converting a non-empty cart requires confirmation;
  removing and re-adding the lines is the safe path.

## Related pages

- [Quick Sell](/docs/business/sale/quick-sell)
- [Sale Listing](/docs/business/sale/listing)
- [View Sale](/docs/business/sale/show)
- [Customers](/docs/business/sale/customers)
- [Inventory Listing](/docs/business/inventory/listing)
