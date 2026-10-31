---
title: Profile & Settings
section: business
---

# Profile & Settings

The Settings area belongs to the signed-in person rather than to the business. It is shared by
customers and employees: the same screen manages your identity, your security, your calendar and
language preferences, your join and leave requests, and the API credentials you use to read business
data.

The **Business** and **Branch** settings entries point to the same profile screen. They exist so the
menu mirrors the workspace structure, but there is one identity for your account.

## What this page is about

- Keeping your name, photo, phone and e-mail correct.
- Choosing how dates are displayed and which language the interface uses.
- Reviewing requests you sent or received and the orders linked to your account.
- Issuing personal API credentials scoped to selected branches.

## Page layout

| Tab | What it contains |
| --- | --- |
| General | Read-only account details with an update action |
| Security | Password, two-factor authentication and trusted devices |
| API integrations | Credential list, quota card and create/edit forms |
| Privacy | Personal data export and consent controls |
| Orders | Orders linked to your account with pay and cancel actions |
| Requests | Join, leave and department-change requests |
| Shipment info | Saved delivery addresses |
| More settings | Calendar type, theme, language and chatbot preferences |

The identity card at the top shows your avatar, display name and job title. Uploading or removing a
photo happens from the card itself.

## How to use it

### Update your profile

1. Open **Settings** and choose **Update profile**.
2. Change your first and last name, username, e-mail or phone.
3. Save. A verification or uniqueness error appears on the affected field.

| Field | Required | Rules |
| --- | --- | --- |
| First name | Yes | Up to 25 characters |
| Last name | Yes | Up to 25 characters |
| Username | No | Letters, numbers, dashes and underscores; unique |
| E-mail | Yes | Valid and unique |
| Phone | Yes | Afghan international format; unique in the platform |

### Change preferences

1. Open **More settings**.
2. Pick the display mode (light, dark or system).
3. Pick the calendar type. Shamsi is the default for Afghan businesses; Gregorian, Hijri and Arabic
   options are also available.
4. Pick the interface language.
5. Save. The change applies on your next navigation.

### Manage API integrations

1. Open **API integrations**.
2. Choose **Create** and name the credential.
3. Decide whether it is business-wide or limited to selected branches. At least one branch is required
   when it is not business-wide.
4. Select abilities: products read, stock read, purchases read, orders read and sales read.
5. Save and copy the secret immediately. It is shown once and never again.
6. Use **Rotate** to replace a leaked secret and **Revoke** to disable the credential.

The quota card shows the plan, the daily and monthly allowance and current usage.

### Handle requests and orders

- **Requests**: approve or reject pending join, leave and department-change requests addressed to you.
- **Orders**: pay an outstanding order or cancel a pending one. Cancellation only succeeds while the
  order is still pending.

### Export your data

Choose **Download data** in the Privacy tab. The export is queued and delivered as an Excel workbook
containing your account information and activity.

## What is restricted

- The profile endpoints are personal: the server always uses the signed-in account and never accepts a
  user identifier from the form. You cannot edit somebody else's profile.
- The `/settings/profile` screen is intentionally outside the employee capability gate, because
  customers use it too. The **Business** and **Branch** entries require the `settings` read
  capability.
- API integrations require `settings` read to view and `settings` write to manage. Only business
  administrators or branch managers may manage them, and a branch manager cannot create a
  business-wide credential.
- A phone number and e-mail address must be unique; duplicated values are rejected with a field error.
- Photo changes only accept files you uploaded yourself.
- You cannot approve a request that is not addressed to you or that is no longer pending.

## Tips and troubleshooting

- **The secret is lost.** Rotate the credential. The previous secret stops working immediately.
- **A branch is missing from the credential form.** You can only grant branches you manage.
- **Dates still look Gregorian.** Save the preference and navigate once; open pages keep their
  previous formatting until reloaded.
- **A data export never arrives.** The job runs on the queue; ask an administrator to confirm the
  queue worker is healthy.

## Related pages

- [Business Workspace Overview](/docs/business/overview)
- [Roles & Capabilities](/docs/business/access/roles)
- [Notifications](/docs/business/notifications)
