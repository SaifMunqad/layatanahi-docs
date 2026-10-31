---
title: Notifications
section: business
---

# Notifications

Notifications are the workspace inbox. Whenever something happens that needs your attention — a
colleague requests a purchase, another branch places an order, an employee asks to join, a payment is
verified — the system writes a notification addressed to you and, when relevant, to your branch.

The page is deliberately simple: a reverse-chronological list you can read, open and clear. There are
no settings to configure and nothing to create here.

## What this page is about

- Delivering operational events to the employee who must act on them.
- Keeping a per-branch and per-user trail of requests so nothing is lost when people are away.
- Linking each notification to the screen where the work is done.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | Title with the unread count, and an "updating" hint while new items arrive |
| Notification list | Cards with title, body, section label, sender, date and an unread dot |
| Empty state | A dashed placeholder when the inbox has no notifications |
| Scroll sentinel | Loads the next page automatically as you reach the bottom |

The section label tells you which part of the system produced the notification, for example requests,
orders or a model section. The date follows the calendar type configured for your account (Shamsi by
default for Afghan businesses).

## How to use it

### Read and act on a notification

1. Open **Notifications** from the sidebar, or click the bell in the header.
2. Unread items carry a dot and are counted in the title.
3. Click a card. The system marks it as viewed and, when the notification carries a destination,
   takes you to the related page — a purchase request, an order, a customer profile and so on.
4. Use the back button to return; the item stays marked as read.

### Keep the inbox current

The page polls for new notifications every fifteen seconds and merges new items at the top without
reloading the page. You do not need to refresh manually during a busy day.

### Clear notifications

From the bell menu in the header you can:

- **Mark all as read** — clears the unread badge without deleting anything.
- **Delete all read** — removes everything you have already read.
- **Delete a single item** — removes one notification immediately.

Deletion is permanent. The underlying business record (the order, request or payment) is never
deleted with the notification.

## What is restricted

- The page requires the `notifications` page capability. It is a universal page, so every department
  template grants read and write.
- You only ever see notifications addressed to **you** or to **your active branch**. A notification
  belonging to another employee or another branch returns an access error, even with a direct link.
- Opening and deleting are filtered by the same rule, so a link copied from a colleague will not work
  for you.
- The list is capped at fifty items per request. Scrolling loads older pages; there is no export.
- Notifications about records you can no longer access still appear, but the destination page will
  refuse to open. Ask an administrator to restore the capability if the work is yours.

## Tips and troubleshooting

- **The unread count does not drop after opening one item.** Refresh the page; the badge is updated by
  the polling cycle and can lag behind the list.
- **A notification has no destination.** Informational notifications (for example a status change
  note) are intentionally not clickable.
- **You stopped receiving notifications.** Check that your branch is selected correctly and that your
  employee membership is still active; notifications are written per user and per branch.
- **A colleague's notification appears in your inbox.** You share the active branch. Branch-level
  notifications are delivered to every employee currently working in that branch.

## Related pages

- [Dashboard](/docs/business/home)
- [Purchase Requests](/docs/business/purchase/requests)
- [Purchase Orders](/docs/business/purchase/orders)
- [Sale Orders](/docs/business/sale/orders)
- [Payment Requests](/docs/business/finance/payment-requests)
