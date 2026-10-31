---
title: Partners
section: business
---

# Partners

The Partners page shows the ownership structure of the business: who the partners are, their share of
the business and, where recorded, when a partnership ends. It is a reference screen for management and
accounting, not a day-to-day operational tool.

The data is business-wide, so every branch sees the same partner list.

## What this page is about

- Reviewing the partners of the business.
- Seeing each partner's ownership percentage.
- Checking contact details and partnership end dates.

## Page layout

| Area | What it shows |
| --- | --- |
| Partner cards | Photo or avatar, name, ownership percentage, contact e-mail and end date |
| Card action | A partnership change action on each card |

Cards are shown in a responsive grid. The percentage is displayed as a subtitle under the name.

## How to use it

1. Open **Finance > Partners**.
2. Scan the cards to confirm the ownership split.
3. Check the end date where a partnership is time-limited.
4. Use the contact details to reach the partner for approvals.

The page is read-only in the current release. Adding a partner, changing a percentage or ending a
partnership is not performed from this screen; those changes are administrative operations.

## Reading the ownership percentage

| Situation | Interpretation |
| --- | --- |
| Percentages add up to one hundred | Complete ownership is recorded |
| Percentages add up to less than one hundred | Part of the ownership is unassigned or held outside the system |
| A partner has zero | The record exists but holds no share |
| An end date is in the past | The partnership has ended and the share should be reviewed |

Review the split after any change of ownership and keep it consistent with the legal documents of the
company.

## What is restricted

- Viewing requires `finance.partners` read. There is no write capability in this module.
- Partners are business-wide, not branch-scoped. A branch user with the capability sees every partner.
- The list is not filtered by the session branch, so switching branches does not change it.
- Financial documents are not linked to partners here; profit distribution is not automated.
- Ownership changes are not audited on this page. Record them in your corporate documentation.

## Tips and troubleshooting

- **The list is empty.** No partners have been configured for the business. Ask an administrator to set
  them up.
- **The percentages do not total one hundred.** This is allowed by the system but usually indicates
  incomplete data; confirm with the legal ownership records.
- **The add action does nothing.** Partner creation is not implemented in this release; the screen is
  informational.
- **A partner left the business.** The record remains for history; an administrator must update the
  ownership structure.

## Related pages

- [Finance Overview](/docs/business/finance/overview)
- [Reports](/docs/business/store/reports)
- [Business Workspace Overview](/docs/business/overview)
