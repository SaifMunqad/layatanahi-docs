---
title: Purchase Requests
section: business
---

# Purchase Requests

Purchase Requests is the inbox for goods another branch has sold to your branch. When a colleague in a
different branch records a sale addressed to you, the system does not create your purchase
automatically. It creates a request, notifies you, and waits for your decision.

Accepting the request is what actually brings the stock in and settles the money. Rejecting it reverses
the sale on the sending side.

## What this page is about

- Reviewing inter-branch transfers presented as sale requests.
- Accepting a request to create the matching purchase and receive stock.
- Rejecting a request when the goods or prices are wrong.
- Inspecting the line items before deciding.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | Title, description and search |
| Request table | Identifier, sending branch, invoice number, amount, seller payment flag, status, date |
| Items modal | Product, SKU, quantity, unit price and line total |
| Accept modal | Account, inventory, stock option and notes |
| Reject action | A short confirmation before reversing the sale |

Requests are paginated twenty at a time. Only pending requests are actionable; approved and rejected
rows remain visible for reference.

## How to use it

### Review a request

1. Open **Purchase > Requests**.
2. Find the pending request and choose **View items**.
3. Compare the products, quantities and prices with what you expected to receive.
4. Check whether the seller has already paid, shown by the seller payment column. This decides whether
   you must choose an account when accepting.

### Accept a request

1. Choose **Accept**.
2. Select the branch account that pays, if the seller did not pre-pay or if you are settling now.
3. Select the receiving inventory.
4. Keep **Add to stock** enabled if the goods physically arrive now. Disable it when you only want to
   create the purchase document and add stock later.
5. Add notes when the transfer needs an explanation.
6. Submit. The purchase is created, stock is added and the request becomes approved.

The accepted purchase is locked by default: it is no longer editable, but it is returnable.

### Reject a request

1. Choose **Reject** and confirm.
2. The linked payments are removed, the account balances are restored and the sale on the sending side
   is deleted.
3. The request is marked rejected and the sender is notified.

Rejection is irreversible from this screen. If only one line is wrong, accept the request and record a
return afterwards instead.

## Validation and business rules

| Rule | Effect |
| --- | --- |
| Only pending requests can be accepted or rejected | Decided requests return an error |
| Account is required when the seller has already paid | Missing account blocks the accept |
| Account currency must match the request currency | Otherwise an exchange amount is required |
| Account balance must cover the amount | Insufficient balance blocks the accept |
| Inventory must be reachable by your branch | Otherwise it is not offered |
| Stock is only written when "Add to stock" is on | Otherwise the purchase is created as approved |

## What is restricted

- Reading requires `purchase.requests` read; accepting and rejecting require write.
- You only see requests addressed to your branch. Requests sent by your branch appear in **Sale >
  Requests** instead.
- The receiving branch is always your session branch; you cannot accept goods into another branch.
- Line items are readable only while the request is visible to your branch.
- Accepting changes stock, money and the sender's sale in one transaction. A failure leaves everything
  untouched.
- There is no bulk accept. Each transfer is reviewed individually by design.

## Tips and troubleshooting

- **The request disappeared.** A colleague accepted or rejected it, or the sender cancelled it.
- **Accept is disabled.** The request is no longer pending, or you lack write access.
- **No account is available.** Create a branch account in Finance with the request currency.
- **Stock did not increase.** Check whether "Add to stock" was disabled, and whether the inventory is
  the one you expected.
- **You accepted by mistake.** Use Purchase > Returns to send the goods back; do not delete the purchase
  if stock has already moved.

## Related pages

- [Purchase Overview](/docs/business/purchase/overview)
- [Purchase Orders](/docs/business/purchase/orders)
- [Sale Requests](/docs/business/sale/requests)
- [Notifications](/docs/business/notifications)
