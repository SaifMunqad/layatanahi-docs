---
title: Business Workspace Overview
section: business
---

# Business Workspace Overview

The Business workspace is the operational back office of Layatanahi. It is where a company records
what it buys, what it sells, what it stores, how it pays its staff, and who inside the company is
allowed to do each of those things. Every screen you open in the workspace belongs to a module, and
every module is controlled by the employee's role rather than by their account alone.

This page explains how the workspace is organised, how access works, and which parts of the system
are shared across the whole business versus limited to a single branch. Reading it first makes the
rest of the Business documentation much easier to follow.

## How the workspace is organised

The workspace is split into modules. A module is both a menu group in the sidebar and a unit of
permission: a role either has access to a module's pages or it does not.

| Module | What it covers | Typical users |
| --- | --- | --- |
| Home | Branch KPIs, activity, daily sales | Everyone |
| Notifications | Inbox of requests, orders and updates | Everyone |
| Chatbot | Conversational assistant that drafts records | Everyone |
| Purchase | Purchases, suppliers, purchase orders, bills, returns | Purchasing, Delivery |
| Inventory | Stock rows, warehouses, stock movements, merges | Inventory, Administration |
| Sale | Selling, customers, sale orders, invoices, returns | Sales, Marketing, Customer Service |
| Finance | Accounts, incomes, expenses, taxes, salaries, partners | Accounting, Administration |
| Store | Branches, employees, assets, reports, analytics | Management, HR |
| E-commerce | Storefront visibility and public copy | Administration, Management |
| Access | Roles, capability grants and the audit trail | Administration only |

## Business-wide scope versus branch scope

Layatanahi separates the company from its locations. A business owns branches, and every operational
record (stock, sales, purchases, payments, employees) belongs to one branch. This has three
consequences that appear on nearly every page:

1. The branch you are currently working in is chosen from the dashboard and stored in your session.
   Lists, totals and reports are filtered to that branch automatically.
2. Some records are deliberately business-wide: suppliers, customers, employees (as people),
   business partners, roles and the storefront configuration.
3. Holding a **branch-scope** role pins you to your home branch. Holding a **business-scope** role
   lets you switch between branches from the dashboard.

A branch-scope user who tries to open another branch's record receives an access error instead of the
record, even if they know the exact URL. Record identifiers in URLs are encoded, and the server
re-checks ownership on every request.

## How permissions work

Access is granted per page, not per button. Each page in the documentation lists the page identifier
you need (for example `purchase.purchases`) and the level it requires.

| Level | What it allows | Notes |
| --- | --- | --- |
| Read | Open the page and view its data | Cannot create, edit, delete, approve or pay |
| Write | Every mutating action on that page | Write always implies read |

Important details:

- **Write is page-wide.** A user with `finance.expenses.write` can do everything on the expenses
  page, including deleting or paying. There is no separate "delete" permission to grant.
- **Some pages are universal.** `home`, `notifications` and `chatbot` are granted to every department
  template, because every employee needs them to work.
- **Access administration is never delegated.** `access.roles`, `access.assignments` and `access.audit`
  are only held by business-scope Administration roles. Even a branch manager cannot grant a
  capability, including their own.
- **You can only delegate what you hold.** When assigning a role, the role editor offers only the
  capabilities the acting administrator already has.

## What is restricted for everyone

Some restrictions are structural and cannot be granted away:

- You cannot open a module you have no page for; the system redirects you to the first page you can
  access, or to the customer site with a "no permission" message.
- You cannot view or act on another branch's record. The only exception is a business-scope role that
  has switched the managing branch.
- You cannot remove the last administrator of the business, and you cannot fire yourself.
- System roles are permanent: they cannot be renamed, deleted or have their scope changed.
- A subscription must be active. Write actions and the storefront are blocked when the business
  subscription has lapsed, while read access remains available so you can renew.

## Recommended first steps

1. Open **Store > Branches** and confirm the branch profile, address and currency settings.
2. Open **Finance > Accounts** and create at least one cash or bank account. Almost every payment
   flow needs one.
3. Open **Access > Roles**, review the department templates, and assign the correct role to each
   employee.
4. Record an opening stock position from **Inventory**, then try a small purchase and a small sale
   end to end.
5. Read the module overview pages in the order they appear in the sidebar; each one links to the
   detailed page documentation.

## Related pages

- [Dashboard](/docs/business/home)
- [Notifications](/docs/business/notifications)
- [Chatbot](/docs/business/chatbot)
- [Roles & Capabilities](/docs/business/access/roles)
- [Audit Log](/docs/business/access/audit)
- [Storefront Settings](/docs/business/ecommerce/storefront)
- [Profile & Settings](/docs/business/settings)
