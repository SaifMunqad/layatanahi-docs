---
title: Employee Access
section: business
---

# Employee Access

The access page of an employee is where the relationship between a person and the business is governed.
From a single screen you can assign or revoke roles, move the employee to another branch or department,
and terminate their employment.

Every action on this page is immediate. There is no draft state and no "apply" button: the change is
written, the employee's navigation is rebuilt on their next request, and the audit log records the
revision.

## What this page is about

- Granting and revoking roles for one employee.
- Moving an employee between branches and departments.
- Ending employment while keeping the record for audit.
- Reviewing which roles the employee currently holds.

## Page layout

| Section | What it shows |
| --- | --- |
| Assigned roles | Each role with a revoke action |
| Add role | A picker of roles you are allowed to grant |
| Create role | A shortcut to the role editor when you hold the capability |
| Location | Transfer action with new branch and department |
| Fire | Destructive termination action |

If you hold none of the required capabilities, the page shows a notice instead of the actions.

## How to use it

### Assign a role

1. Open the employee from **Store > Employees** and choose **Access**.
2. Choose **Add role** and select a role.
3. Confirm. The employee receives the capabilities of that role immediately.

Assignment requires `access.assignments` write in addition to `store.employees` write. Only roles within
your own capability set are offered.

### Revoke a role

Choose revoke on an assigned role and confirm. The employee loses the capabilities derived from that
role; capabilities from their other roles remain.

### Transfer an employee

1. Choose **Transfer**.
2. Select the new branch and department.
3. Confirm. The target branch must belong to the same business.

Transferring the last administrator out of the administration department is rejected, and a
non-administrator cannot transfer an administrator.

### Fire an employee

1. Choose **Fire** and confirm.
2. The employee is soft-deleted, their sessions are cleared and their role assignments end.
3. Historical records, payments and audit entries remain attached to the employee.

You cannot fire yourself, you cannot fire the last administrator, and a non-administrator cannot fire an
administrator. The interface hides transfer and fire for employees who hold a business-scope role unless
you are allowed to manage them.

## Validation and rules

| Action | Required fields | Key rule |
| --- | --- | --- |
| Assign or revoke | Employee and role | Both must belong to the business |
| Transfer | Employee, branch, department | Branch must be in the business; department must exist |
| Fire | Employee | Cannot be yourself, cannot remove the last administrator |
| Edit employee | Department | Role list must belong to the business |

## What is restricted

- Opening the page requires `store.employees` read. Every action requires write.
- Role assignment additionally requires `access.assignments` write; creating roles requires
  `access.roles` write.
- Only administrators can manage another administrator, and the business must always keep at least one
  active administrator.
- A branch-scope manager can manage employees of their own branch but cannot grant capabilities beyond
  their own.
- Firing never deletes financial history; the person's past actions remain attributed to them.
- Audit entries for these changes are visible only to users with `access.audit` read.

## Tips and troubleshooting

- **Add role is disabled.** You lack `access.assignments` write, or no role contains only capabilities
  you hold.
- **Transfer is rejected.** The target branch is outside the business, or the change would remove the last
  administrator.
- **Fire is missing.** You are looking at yourself, at an administrator you cannot manage, or you lack
  write access.
- **The employee still has access after revocation.** Ask them to reload; permissions are re-evaluated on
  the next request and the menu is rebuilt then.

## Related pages

- [Roles & Capabilities](/docs/business/access/roles)
- [Audit Log](/docs/business/access/audit)
- [Employees](/docs/business/store/employees)
- [Business Workspace Overview](/docs/business/overview)
