---
title: Quick Sell
section: business
---

# Quick Sell

Quick Sell is a compact counter screen for staff who already know the products. It shows purchase and
sale totals, profit and margin per line while you build the sale, so you can see the economics of the
transaction before submitting it.

It is intended for busy shops, not for complex invoices. Use the normal Sell screen when you need
discounts beyond the summary field, notes, or a careful review of the cart.

## What this page is about

- Entering a sale quickly with live profit visibility.
- Comparing purchase cost and sale price per product.
- Recording the supplier and the customer in one screen.
- Seeing whether the transaction is profitable before saving.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | Title and submit action |
| Parties | Supplier and customer pickers, each with an inline add action |
| Totals | Purchase total, sale total, discount and profit with margin |
| Currency and account | Sale currency and the reserve that receives money |
| Product cards | Purchase price, sell price, quantity and per-line profit |
| Summary | Final total and the submit label that reflects profit or loss |

Only currencies that have at least one active branch account are offered.

## How to use it

1. Open **Sale > Quick Sell**.
2. Choose the supplier you bought from (for cost context) and the customer you are selling to.
3. Pick the currency. Available products follow that currency.
4. Add products and enter the purchase price, the sell price and the quantity.
5. Watch the profit and margin update per line and in the summary.
6. Enter a discount if needed.
7. Choose the reserve account when the customer pays now.
8. Submit.

## What the numbers mean

| Figure | Meaning |
| --- | --- |
| Purchase total | Sum of quantity multiplied by purchase price |
| Sale total | Sum of quantity multiplied by sell price |
| Discount | Amount removed from the sale total |
| Profit | Sale total minus purchase total and discount |
| Margin | Profit as a percentage of the sale total |

A negative margin is shown clearly. The submit button label changes when the transaction would lose
money, so an accidental loss is visible before the sale is written.

## Important limitation

The quick entry screen is a fast interface, not a separate accounting path. It is designed to feed the
same sale, invoice and stock documents as the normal screen. If your build does not have the quick
submit endpoint enabled, the form can be filled and reviewed but the final save is rejected; use the
normal Sell screen for the actual transaction in that case.

Treat Quick Sell as a calculator and a convenience screen. Record every real sale through a flow you
have verified end to end on your installation.

## What is restricted

- The page requires `sale.sell` write. Read-only users cannot open it.
- The currency list is limited to currencies with an active branch account.
- The customer and supplier must belong to the business; adding a new customer follows the same rules as
  the customer page, including a unique phone number.
- Products must be sellable stock rows in a location your branch can access.
- The discount cannot exceed the sale total.
- Stock availability and account balance are still validated by the underlying sale flow.

## Tips and troubleshooting

- **The product list is short.** Only stock in the selected currency and in accessible locations is
  offered.
- **Profit is negative.** The sell price is below the purchase price, or the discount is too large.
- **Submit fails.** Check the branch account, stock availability and the endpoint availability described
  above.
- **You need a formal invoice.** Use the normal Sell screen and print from the saved sale.

## Related pages

- [Make Sale](/docs/business/sale/sell)
- [Sale Listing](/docs/business/sale/listing)
- [Customers](/docs/business/sale/customers)
- [Sale Overview](/docs/business/sale/overview)
