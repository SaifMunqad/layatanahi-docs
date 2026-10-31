---
title: Purchase Status & Locking
section: business
---

# Purchase Status & Locking

A purchase is not editable forever. Once the goods are received and the supplier has been paid, the
document should stop changing. Layatanahi handles this with two per-record switches, **editable** and
**deletable**, rather than a single approval step.

Understanding these switches matters because they decide which buttons your colleagues see. A locked
purchase is not read-only for reporting; it is read-only for modification.

## What this page is about

- Protecting a finalized purchase from accidental edits.
- Allowing a correction while a document is still being reconciled.
- Preventing deletion of a purchase that already moved stock or money.

## The two switches

| Switch | When it is set | When it is cleared |
| --- | --- | --- |
| Editable | The Edit action is available and the edit form opens | Edit is hidden and the edit URL redirects back |
| Deletable | The Delete action is available | Delete is hidden and the delete endpoint refuses |

They are independent. A purchase can be editable but not deletable, which is the usual state for a
document that may still need a price correction but must never disappear.

## How to change them

1. Open the purchase from **Purchase > Purchases**.
2. Open the status menu in the purchase view.
3. Choose **Make editable** or **Make not editable**, and the equivalent pair for deletable.
4. Confirm. The change is recorded as a purchase activity.

Only users with `purchase.purchases` write can toggle the switches. The change applies immediately for
every user in the branch.

## How the trade status differs

The trade status (Draft, Ordered, Received, Completed and so on) is produced by the business flow: an
order being accepted, a purchase being received, a return being completed. You do not edit it directly
here. The switches in this page only govern modification rights.

If you need to change the trade status, work through the flow that owns it:

| Goal | Where to do it |
| --- | --- |
| Receive an outstanding order | Accept the request from Purchase Requests |
| Close a fully returned purchase | Create a return for the remaining lines |
| Record the final payment | Pay the bill from Records or from the purchase view |

## Recommended policy

1. Keep a new purchase editable while the supplier's paper is being checked.
2. Lock it once the stock count and totals are verified.
3. Prevent deletion as soon as stock or money has moved.
4. Allow a short correction window only for genuine supplier errors, then lock again.

Write this policy into your internal procedure so two colleagues do not unlock the same document
simultaneously.

## What is restricted

- Toggling requires `purchase.purchases` write. Read access alone cannot unlock a document.
- The purchase must belong to the branch in your session.
- The switches accept only the two supported fields; no other column can be changed through this
  endpoint.
- Locking does not prevent payments. You can still pay an outstanding invoice on a locked purchase,
  which is intentional: receiving money never rewrites the purchase lines.
- Locking does not hide the document from reports or from the supplier's statement.
- There is no bulk action: each purchase is locked individually.

## Tips and troubleshooting

- **I unlocked the purchase but Edit is still missing.** Refresh the listing; the action list is rendered
  from the flags sent with the page.
- **A colleague re-locked the document.** The most recent change wins. Check the purchase activity to
  see who toggled it and when.
- **I need to delete a locked purchase.** Unlock it first. If stock has already moved, a return is the
  correct correction rather than deletion.
- **Payments still work on a locked purchase.** This is expected; only structural edits are blocked.

## Related pages

- [View Purchase](/docs/business/purchase/show)
- [Purchase Listing](/docs/business/purchase/listing)
- [Returns](/docs/business/purchase/returns)
- [Records](/docs/business/purchase/records)
