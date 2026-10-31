---
title: Payment Requests
section: business
---

# Payment Requests

Payment requests move money between branches of the same business. When one branch sells to another,
the receiving branch must approve the transfer before money leaves the sender's account. This page is
the approval queue for the branch you are working in.

Requests come in two directions: **incoming**, addressed to your branch, and **outgoing**, sent by your
branch to another.

## What this page is about

- Approving a transfer addressed to your branch.
- Reviewing transfers your branch sent.
- Inspecting the line items behind a request.
- Rejecting a request when the documents are wrong.

## Page layout

| Tab | What it shows |
| --- | --- |
| Incoming | Requests from other branches with amount, status, date, reference and actions |
| Outgoing | Requests your branch sent, with the receiving branch and status |
| Items modal | Product, SKU, quantity, unit price and total for the linked sale or purchase |

The table loads thirty rows at a time. Status is shown with an icon and colour: green for approved, red
for rejected, amber for pending.

## Status meanings

| Status | Meaning |
| --- | --- |
| Pending | Waiting for the receiving branch to decide; shown as sent on the outgoing tab |
| Approved | Accepted; money moved and the linked payment completed |
| Rejected | Refused; payments reversed and balances restored |

## How to use it

### Approve an incoming request

1. Open **Finance > Accounts > Payment Requests > Incoming**.
2. Choose **View items** to confirm the products and amounts.
3. Choose **Approve**.
4. Enter the branch account that pays. It must be active, in the branch, and in the request currency.
   When the account currency differs, enter an exchange amount; the rate is derived.
5. Add notes if needed.
6. Submit. The sender's payment completes, the invoice is updated and the request becomes approved.

### Reject an incoming request

Choose **Reject** and confirm. The linked payments are removed, both balances are restored and the
invoice returns to its previous status.

### Review outgoing requests

The outgoing tab shows what your branch sent. You cannot approve them here; the receiving branch decides.
You can reject a pending request, which reverses the balances on both sides.

## Fields and rules

| Field | Required | Rules |
| --- | --- | --- |
| Branch account | Yes | Active, belongs to your branch |
| Exchange amount | When currencies differ | At least 0.01; the rate is computed |
| Notes | No | Up to 1,000 characters |

Server-side checks also verify that the request is pending, the source payment is completed and cash,
the account balance covers the amount, and the invoice paid amount does not exceed its grand total.

## What is restricted

- Reading requires `finance.accounts` read; approving and rejecting require write.
- Incoming requests are limited to those addressed to your branch; outgoing to those your branch sent.
- Only pending requests can be decided. Approved or rejected rows are read-only.
- The paying account must belong to your branch and be active; another branch's account is never offered.
- Approval is atomic: balances, payments and the invoice are updated in one transaction, and a failure
  leaves everything untouched.
- The line items modal is scoped to the same branch; a request you cannot see cannot be inspected.

## Tips and troubleshooting

- **Approve is disabled.** The request is no longer pending, or you lack write access.
- **The account dropdown is empty.** Create an account in the request currency and make sure it is
  active.
- **Insufficient balance.** The sender's account does not cover the amount at approval time. Ask them to
  top up or reduce the request.
- **The request vanished.** A colleague decided it, or the sender cancelled the underlying sale.
- **The exchange amount is rejected.** Provide the amount in the paying account's currency; the system
  derives the rate and stores six decimals.

## Related pages

- [Accounts](/docs/business/finance/accounts)
- [Sale Requests](/docs/business/sale/requests)
- [Purchase Requests](/docs/business/purchase/requests)
- [Notifications](/docs/business/notifications)
