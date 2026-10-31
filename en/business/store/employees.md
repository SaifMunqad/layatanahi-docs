---
title: Employees
section: business
---

# Employees

The Employees page is the staff directory of the branch. It lists the people who work here, links to
their full profile, and is the starting point for inviting a new colleague, editing their personnel
record and adding guarantors.

Access is deliberately not managed here. Roles, transfer and termination live on the Employee Access
page, so that HR edits and permission changes stay separate.

## What this page is about

- Browsing the staff of the branch.
- Inviting a user to join as an employee.
- Maintaining personal, contract and address details.
- Recording guarantors for the employee file.

## Page layout

| Screen | What it shows |
| --- | --- |
| Employee list | Avatar cards with name, department, username, e-mail and phone |
| Create | Invitation form with username, contact, gender, department and roles |
| Employee profile | Intro, guarantors, contract and address tabs |

The section navigation also exposes Roles and Audit for users who hold the access capabilities.

## How to use it

### Invite an employee

1. Open **Store > Employees** and choose **Add employee**.
2. Enter the username, e-mail and phone. The username must contain letters and underscores only.
3. Choose the gender and the department.
4. Optionally select roles to grant on joining.
5. Add a note explaining the invitation.
6. Submit. The system either sends an invitation or reports that the user is already registered.

| Field | Required | Rules |
| --- | --- | --- |
| Username | Yes | Letters and underscores, up to 16 characters, no leading underscore |
| E-mail | Yes | Valid address |
| Phone | Yes | Afghan international format |
| Gender | Yes | Must be provided |
| Department | Yes | Must exist |
| Roles | No | Must belong to the business |
| Note | No | Up to 1,000 characters |

### Read an employee profile

The profile has four tabs:

| Tab | Contents |
| --- | --- |
| Intro | Personal and contact details, department and job title |
| Guarantors | Guarantor cards with identity, contact, relationship and notes |
| Contract | Contract terms recorded for the employee |
| Address | Current and permanent address details |

Use the print action for a personnel file copy.

### Edit the personnel record

Editing covers job title, department, personal data (father's name, date of birth, nationality, ID and
tax numbers), contact details, emergency contact, addresses, education and medical notes. All fields
except the department are optional, so record what you actually have.

### Add a guarantor

1. Open the Guarantors tab.
2. Choose **Add guarantor**.
3. Enter at least the employee and the first name; last name, job title, phone, e-mail, ID number,
   relationship, address and notes are optional.
4. Save. The guarantor appears in the employee file.

## What is restricted

- Reading requires `store.employees` read; inviting, editing and adding guarantors require write.
- Employees are branch-scoped for listing and editing. A user cannot edit a person from another branch.
- Roles offered during invitation must belong to the same business.
- A non-administrator cannot modify an administrator, and the last administrator cannot be removed from
  the administration department.
- Firing, transfer and role changes are not available here; they require the access page and, for roles,
  `access.assignments` write.
- The employee list loads the first page only; refine with search rather than scrolling for a specific
  person.

## Tips and troubleshooting

- **The invitation says the user is already registered.** The account exists; use the access page to
  assign roles or transfer them to this branch.
- **The username is rejected.** Remove spaces, digits and special characters; only letters and
  underscores are allowed.
- **An employee is missing from the list.** They may belong to another branch; search by name or ask an
  administrator.
- **Guarantor save fails.** The employee must belong to your branch and a first name is required.

## Related pages

- [Employee Access](/docs/business/store/employee-access)
- [Roles & Capabilities](/docs/business/access/roles)
- [Audit Log](/docs/business/access/audit)
- [Branches](/docs/business/store/branches)
