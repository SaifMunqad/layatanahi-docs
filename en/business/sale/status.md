---
title: Sale Status & Locking
section: business
---

# Sale Status & Locking

Every sale carries two kinds of state. The **trade status** describes where the goods and money are in
the business flow. The **edit and delete flags** describe what colleagues may still do to the document.
They are separate, and confusing them causes most support questions.

This page explains both and when to change the flags.

## What this page is about

- Understanding what a trade status means.
- Locking a completed sale against accidental change.
- Preventing deletion once stock and money have moved.
- Knowing which actions change the trade status for you.

## Trade status versus flags

| Concept | Changed by | Typical values |
| --- | --- | --- |
| Trade status | Business flow: order acceptance, returns, payments | Draft, Pending approval, Completed, Returned |
| Editable flag | A user with write access, from the sale view | Editable or locked |
| Deletable flag | A user with write access, from the sale view | Deletable or protected |

You cannot type a trade status directly. It is produced by the documents around the sale. The flags, by
contrast, are deliberate human decisions and are recorded as sale activities.

## How to lock a sale

1. Open the sale from **Sale > Sales**.
2. Open the status menu in the invoice view.
3. Clear **Editable** once the invoice is final.
4. Clear **Deletable** as soon as stock or money has moved.
5. Repeat the same for individual payments when they must not be reversed.

Locking is per document. There is no bulk lock.

## Recommended policy

| Moment | Editable | Deletable | Reason |
| --- | --- | --- | --- |
| Just created, being checked | Yes | Yes | Corrections are still expected |
| Invoice printed and delivered | No | Yes | Amounts should not change silently |
| Payment received and reconciled | No | No | The document is part of a closed period |
| Fully returned | No | No | The return document carries the correction |

Document the policy internally so two shifts do not unlock the same invoice.

## What is restricted

- Toggling flags requires `sale.sales` write.
- Protecting a payment requires finance account write access as well, because it affects the ledger.
- The sale must belong to your active branch.
- Locking does not block payments. You can still collect an outstanding balance on a locked sale.
- Locking does not hide the sale from reports or from the customer statement.
- A locked sale can still be returned if it remains returnable; returns are governed separately.

## Tips and troubleshooting

- **I unlocked the sale but Edit is missing.** Reload the listing; the row actions are rendered from the
  flags delivered with the page.
- **The sale was re-locked.** The latest change wins; check the sale activity for the responsible user.
- **A payment cannot be deleted.** Clear its deletable flag first, then delete it from Records >
  Payments.
- **The status says Completed but money is still owed.** Completed refers to delivery; the invoice has
  its own payment status. Collect the balance from Records.

## Related pages

- [View Sale](/docs/business/sale/show)
- [Sale Listing](/docs/business/sale/listing)
- [Records](/docs/business/sale/records)
- [Returns](/docs/business/sale/returns)
