---
title: Sale Requests
section: business
---

# Sale Requests

Sale Requests lists the inter-branch sales your branch has sent to another branch. Each one is a request
for the other branch to accept the goods and create its purchase. Until it accepts, the sale stays
pending and the stock has not moved there.

This is the sending side of inter-branch trade. The receiving branch works from its Purchase Requests
page.

## What this page is about

- Tracking which transfers are still awaiting acceptance.
- Reviewing the lines and amounts you sent.
- Cancelling a pending request.
- Confirming that the other branch accepted.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | Title adapted from the shared request screen, search |
| Request table | Identifier, receiving branch, invoice number, amount, seller payment flag, status, date |
| Items modal | Product, SKU, quantity, unit price and total |
| Delete action | Cancels a pending request |

Requests are paginated twenty at a time and are read-only apart from cancellation.

## Status meanings

| Status | Meaning |
| --- | --- |
| Pending | Sent; the other branch has not decided yet |
| Approved | Accepted; the sale became a purchase there |
| Rejected | Refused; the linked payments and sale are reversed |

## How to use it

### Track a request

1. Open **Sale > Requests**.
2. Find the request by branch, invoice number or date.
3. Choose the items action to review what was sent.
4. If it is still pending, the other branch has not decided; check with them or cancel and resend.

### Cancel a pending request

1. Choose delete on a pending row and confirm.
2. The request is withdrawn, the linked sale is removed and any payments are reversed.

Cancellation is only available while the request is pending. Once the other branch accepted it, the
transaction is a purchase on their side and must be corrected with a return.

### After acceptance

When the request is approved, the sale on your side is completed and your stock has already left your
location. Confirm the sale in the listing and reconcile the payment if the receiving branch pre-paid.

## What is restricted

- Reading requires `sale.requests` read; cancelling requires write.
- You only see requests sent by your branch, and only those addressed to another branch of the same
  business.
- The items endpoint requires order visibility; a user who cannot read sale orders cannot open the line
  details.
- Requests cannot be edited. To change quantities, cancel the pending request and create a new sale.
- Cancelling after acceptance is impossible from this screen.
- No creation form exists here; requests are created automatically when you sell to a branch.

## Tips and troubleshooting

- **The request disappeared.** It was accepted, rejected or cancelled. Check Sale Orders or the Sale
  listing for the outcome.
- **The receiving branch says it never received it.** Confirm the receiver was a branch, not a customer;
  only branch receivers generate requests.
- **Payment status looks wrong.** The seller payment flag reflects whether your side recorded a payment;
  it does not mean the other branch accepted.
- **You need to change a line.** Cancel while pending, then record a corrected sale to the branch.

## Related pages

- [Make Sale](/docs/business/sale/sell)
- [Sale Orders](/docs/business/sale/orders)
- [Purchase Requests](/docs/business/purchase/requests)
- [Notifications](/docs/business/notifications)
