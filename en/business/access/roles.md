---
title: Roles & Capabilities
section: business
---

# Roles & Capabilities

A role is the unit of trust in Layatanahi. It combines a **scope** (where the role applies) with a
list of **capabilities** (which pages the holder may read or write). Employees do not receive
permissions one by one; they receive roles, and the roles decide what their sidebar and their
buttons look like.

The Roles page is where an administrator creates roles, edits their capabilities and assigns them to
employees.

## What this page is about

- Defining who can see and change each module of the business.
- Keeping branch managers powerful inside their branch without letting them grant permissions.
- Providing ready-made department templates that can be used as a starting point.

## Page layout

| Area | What it shows |
| --- | --- |
| Header | Page title and the "Add role" action |
| Section navigation | Links to Roles and Audit Log |
| Administrator banner | Count of administrators, with a warning when only one remains |
| Role grid | Cards with the role name, code, number of capabilities, a system badge and actions |

Each role card offers **Edit**, **Assign** and **Delete**. System roles only offer **Assign**,
because their definition is owned by the platform.

## How to use it

### Understand scope first

| Scope | Meaning | Can switch branch? |
| --- | --- | --- |
| Business | The role applies in every branch of the business | Yes |
| Branch | The role applies only inside the holder's home branch | No |

A business-scope role can act on any branch the owner manages. A branch-scope role follows the
employee's home branch permanently. Only Administration templates are business-scope by default.

### Create a role

1. Open **Store > Employees > Roles**.
2. Choose **Add role**.
3. Enter a name. The code is generated from the name and may be edited before saving.
4. Choose the scope.
5. Tick capabilities per page. Read and write are offered separately; write implies read.
6. Save. The role appears in the grid and can be assigned immediately.

| Field | Required | Rules |
| --- | --- | --- |
| Name | Yes | Up to 255 characters |
| Code | No | Lowercase letters, digits, dots, dashes and underscores; unique; set on create only |
| Scope | Yes | Business or branch |
| Capabilities | No | Each capability must be one the acting administrator holds |

### Edit a role

Open a role card and change its name, scope or capability list. Changes apply immediately to every
employee holding the role; there is no per-employee override. If the change would remove the last
administrator capable of managing roles, the save is rejected.

### Assign or revoke a role

1. Choose **Assign** on a role card, or open the employee's access page.
2. Pick the employee and confirm. The assignment is written to the audit log with a new revision.
3. To revoke, use the same dialog and remove the assignment.

Assignments require the `access.assignments` write capability in addition to `access.roles`.

### Use department templates

The role editor can start from a department template such as Sale, Accounting or Inventory. Templates
pre-select the module's capabilities so you only need to adjust the exceptions. The Management
template is the branch manager: every operational page, but never access administration.

## What is restricted

- Opening the page requires `access.roles` read; creating, editing and deleting require write.
- Assignments require `access.assignments` write. A user with only role editing cannot grant roles.
- `access.*` capabilities are excluded from the Management template and from branch managers
  entirely. Only business-scope Administration roles hold them.
- You can only grant capabilities you already hold. The interface disables the rest and the server
  rejects an attempt to exceed your own access.
- The last administrator cannot be removed. Deleting, revoking or editing a role in a way that leaves
  the business without an administrator fails inside the same transaction.
- System roles cannot be edited or deleted.
- You cannot assign a role from another business; roles and employees are resolved inside the signed
  in business only.

## Tips and troubleshooting

- **A capability is greyed out.** You do not hold it yourself, so you cannot delegate it.
- **The save fails while editing a role.** The change would remove the last administrator, or the code
  is duplicated.
- **An employee still sees an old menu.** Menu entries are derived from capabilities; ask them to
  reload. Their session is refreshed on the next navigation.
- **You need a temporary contractor.** Create a narrow branch-scope role with read-only capabilities
  instead of sharing an existing account.

## Related pages

- [Audit Log](/docs/business/access/audit)
- [Employees](/docs/business/store/employees)
- [Employee Access](/docs/business/store/employee-access)
- [Business Workspace Overview](/docs/business/overview)
