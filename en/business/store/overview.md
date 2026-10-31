---
title: Store Overview
section: business
---

# Store Overview

Store is the administrative heart of the branch. It holds the branch profile, the employee directory and
their access, capitalised assets, the financial reports and the activity and analytics dashboards.

If Finance answers "where did the money go", Store answers "who works here, what do we own, and how is
the branch performing". Most of the screens are read-oriented, with a small number of administrative
write actions.

## What this page is about

- Maintaining the branches of the business and their public profile.
- Inviting employees, keeping their records and managing their access.
- Registering and depreciating branch assets.
- Reviewing financial reports across sales, purchases, expenses and profit.
- Auditing what happened in the branch.
- Understanding performance through the analytics dashboard.

## Pages in this module

| Page | Purpose | Permission |
| --- | --- | --- |
| Branches | Branch directory and public profile | `store.branches`, `store.branch` |
| Employees | Staff directory, invitations and records | `store.employees` |
| Employee Access | Roles, transfer and termination | `store.employees` + `access.*` |
| Assets | Capitalised assets and their lifecycle | `store.assets` |
| Reports | Financial reports and period comparisons | `store.reports` |
| Activities | Unified timeline of branch events | `store.activities` |
| Analytics | KPIs, charts and account balances | `store.analytics` |

## Two branch capabilities

Store distinguishes between reading the branch directory and administering the branch:

| Capability | What it allows |
| --- | --- |
| `store.branches` | Browse branches, view profiles and statistics |
| `store.branch` | Create and edit branches, manage inventory grants, see subscriptions |

`store.branch` write is effectively the business-administrator test in the codebase. A branch-scope
manager normally holds `store.branches` read and `store.branch` write for their own branch only.

## Employees versus access

Employee records and access are separated on purpose:

- **Employees** covers the person: identity, contact, contract, address, guarantors, department.
- **Access** covers the roles that person holds, the branch they work in and whether they are still
  employed.

Keeping them apart means an HR change does not silently grant permissions, and a permission change does
not require editing the personnel file.

## What is restricted

- Every page requires its own capability; the module is not granted as a block.
- Branches and employees are limited to your business. Records from another business are never reachable.
- Creating or editing a branch requires `store.branch` write and, for inventory grants, administrator
  rights.
- Employees can only be transferred inside the same business, and the last administrator cannot be
  removed.
- Financial reports and analytics are branch-scoped, except customer counts which are business-wide.
- Asset disposals, maintenance and transfers move money and therefore require `store.assets` write.
- Only users with `store.employees` write can invite, edit, transfer or fire staff, and role assignment
  additionally requires `access.assignments` write.

## Recommended order of setup

1. Complete the branch profile: address, map location, calendar type, public visibility.
2. Invite the management team and assign the Management template.
3. Register capitalised assets with their purchase documents.
4. Review Reports weekly and Analytics monthly.
5. Use Activities when a number in a report needs an explanation.

## Related pages

- [Branches](/docs/business/store/branches)
- [Employees](/docs/business/store/employees)
- [Employee Access](/docs/business/store/employee-access)
- [Store Assets](/docs/business/store/assets)
- [Reports](/docs/business/store/reports)
- [Activities](/docs/business/store/activities)
- [Analytics](/docs/business/store/analytics)
