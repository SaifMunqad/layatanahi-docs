---
title: Access Audit Log
section: business
---

# Access Audit Log

Every change to a role or to an assignment is recorded. The Audit Log shows that history in plain
language: who changed what, when, and exactly which capabilities were added or removed. It is the
answer to the question "who gave this person access to finance?".

The log is append-only. There is no edit, delete or export action on this page.

## What this page is about

- Proving that permission changes were authorised and traceable.
- Reviewing the effect of a role edit without opening the role itself.
- Investigating unexpected access after a security review.

## Page layout

| Column | What it shows |
| --- | --- |
| Action | A coloured chip with the action code, for example role created or assignment revoked |
| Revision | The revision number produced by the change |
| Changes | One card per operation, with the added, removed and total capability counts |
| Actor | The employee who performed the change |
| Date | When the change happened, using your calendar preference |

The list loads twenty-five rows at a time and continues as you scroll. Expanding a change card shows
the full capability diff and, where relevant, the role or employee involved.

## How to use it

1. Open **Store > Employees > Audit**.
2. Scan the action chips: green tones mark creation and grants, red tones mark deletion, revocation and
   departures, neutral tones cover other maintenance.
3. Find the entry you need and expand it.
4. Read the diff: capabilities added, capabilities removed and the resulting total.
5. Cross-check with the role page or the employee's access page before acting.

## Action reference

| Action | Meaning |
| --- | --- |
| Role created | A new role was defined |
| Role updated | Name, scope or capabilities changed |
| Role deleted | The role was removed and assignments ended |
| Assignment granted | An employee received the role |
| Assignment revoked | The role was taken away from an employee |
| Assignment synchronized | An employee's role set was reconciled in one operation |
| Assignment left | The employee left and their roles were closed |
| Branch manager set | A manager was appointed for a branch |
| Administrator provisioned | The initial administrator was created |
| Administrator repaired | A missing administrator assignment was restored |
| System roles read/write | System role definitions were applied |
| System roles reshaped | System roles were adjusted to a new catalog |
| Department backfilled | Existing employees received department defaults |
| Employee join roles | Roles were applied when an employee joined |

Each entry also shows a revision number. Revisions increase monotonically, which lets you confirm that
you are looking at the newest version of a permission set.

## What is restricted

- Viewing requires the `access.audit` read capability. There is no write capability and no endpoint
  that modifies the log.
- Like all `access.*` pages, it is limited to business-scope Administration roles. Branch managers,
  including the Management template, cannot open it.
- Entries are scoped to your business. Role and employee names are resolved only for records that
  belong to the signed-in business.
- The page never shows passwords, tokens or personal data beyond the employee name attached to a
  change.
- Log entries remain after an employee is fired, so the trail survives staff turnover.

## Tips and troubleshooting

- **A capability change is missing.** Confirm you are looking at the right business and that the
  change did not happen in another branch's role set. Only access administration is logged here;
  operational changes appear in Store Activities instead.
- **The actor shows as a system action.** Provisioning and backfill jobs run without a human actor;
  these entries are expected after platform upgrades or initial setup.
- **Names are blank.** The referenced role or employee may have been deleted after the change. The
  diff and revision remain valid.
- **You need an export for an auditor.** Take a screenshot or copy the table; the product does not
  provide a CSV export of this log.

## Related pages

- [Roles & Capabilities](/docs/business/access/roles)
- [Employee Access](/docs/business/store/employee-access)
- [Activities](/docs/business/store/activities)
