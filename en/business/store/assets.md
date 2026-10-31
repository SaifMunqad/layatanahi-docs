---
title: Store Assets
section: business
---

# Store Assets

Assets are the durable things the branch owns and uses rather than sells: furniture, vehicles, computers,
machines and equipment. The Assets page registers them, tracks their value and status, and records what
happens when they are maintained, transferred to another branch, or disposed of.

Registering an asset capitalises the purchase. The money leaves a branch account once, the item appears in
the asset register, and its later maintenance and disposal are recorded against it.

## What this page is about

- Registering purchased equipment as branch assets.
- Tracking serial numbers, price, currency and age.
- Recording maintenance and scheduled service.
- Transferring assets between branches.
- Disposing of assets, including selling them.

## Page layout

| Screen | What it shows |
| --- | --- |
| Asset list | Asset, serial number, price, status and creation date |
| Add asset | A four-step wizard: basic info, financial, items, additional |
| Row actions | Dispose, maintain, transfer and edit serial |

The list is branch-scoped and shows only assets owned by the branch in your session.

## Asset statuses

| Status | Meaning |
| --- | --- |
| Active | In use and owned by the branch |
| Maintenance | Currently under maintenance |
| Sold | Disposed through a sale |
| Disposed | Scrapped, donated or recorded as lost |

Dispose and transfer are disabled for sold assets.

## How to use it

### Add an asset

1. Open **Store > Assets** and choose **Add assets**.
2. **Basic info**: choose the category, the supplier, the bill number and the purchase date.
3. **Financial**: choose the currency, the payment account and the amount.
4. **Items**: choose the product variant, quantity, unit amount, warranty years, lifetime years and
   resale price.
5. **Additional**: add notes and attach documents.
6. Submit. One asset record is created per unit and a single payment debits the account.

| Field | Required | Rules |
| --- | --- | --- |
| Category | Yes | Must exist |
| Supplier | Yes | Must belong to the business |
| Date | Yes | Purchase date |
| Currency | Yes | Must match the account |
| Account | Yes | Active branch account |
| Variant | Yes | Product variant |
| Quantity | Yes | Between 1 and 200 |
| Amount | Yes | Zero or greater |
| Warranty, lifetime, resale | No | Numeric |

If the account balance is insufficient, the save is rejected and the wizard returns to the financial step.

### Maintain an asset

1. Choose **Maintain** on an asset.
2. Enter the maintenance type and title.
3. Choose the start date and the completion date, which cannot be before the start.
4. Enter the cost and notes.
5. Save. A maintenance record is stored and the asset status becomes Maintenance.

### Transfer an asset

1. Choose **Transfer**.
2. Select the destination branch, the transfer date and a reason.
3. Enter the expense amount, the currency and the paying account of the source branch.
4. Confirm. An expense and a payment are written, the account is debited and the asset moves.

The account must have sufficient balance; a transfer is a real cost for the sending branch.

### Dispose of an asset

1. Choose **Dispose**.
2. Choose the disposal date and method: sale, scrap, donation, lost, stolen or other.
3. For a sale, enter the payment amount and the receiving account. They are required.
4. Add the gain or loss and notes.
5. Confirm. A sale credits the account; other methods record the disposal without income.

### Update the serial number

Choose **Edit serial**, enter the new serial (up to 100 characters) and save. The asset stays in the same
branch.

## What is restricted

- Reading requires `store.assets` read; adding, maintaining, transferring, disposing and editing serials
  require write.
- Assets are branch-scoped. Transfer is the only way to move one to another branch of the same business.
- Dispose and transfer are blocked for sold assets.
- A sale disposal requires the payment amount and account; the account currency must match the asset
  currency.
- A transfer requires enough balance in the source account and writes a real expense.
- Search filters the list on the client only; it does not query the server.

## Tips and troubleshooting

- **Insufficient balance.** Choose another account or top up the current one; the asset is not created
  until the payment succeeds.
- **The asset is not in the list.** It belongs to another branch, or your branch did not own it at
  creation.
- **Maintenance status never clears.** Completing the maintenance record is a separate step; update the
  completion date.
- **Dispose is disabled.** The asset was already sold through a disposal.

## Related pages

- [Expenses](/docs/business/finance/expenses)
- [Accounts](/docs/business/finance/accounts)
- [Branches](/docs/business/store/branches)
- [Store Overview](/docs/business/store/overview)
