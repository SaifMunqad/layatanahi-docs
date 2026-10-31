---
title: Salaries
section: business
---

# Salaries

Salaries cover the payroll of the branch: assigning a fixed or percentage-based salary, generating slips
for a period, adding bonuses and deductions, and paying employees from a branch account.

Payroll is currency-aware. A salary assignment has a currency, and only branch accounts in that currency
can pay it. Percentage salaries are calculated from sales and can be generated across several currencies
with per-currency exchange rates.

## What this page is about

- Assigning a salary basis to an employee.
- Generating salary slips for a period.
- Adding bonuses and deductions before payment.
- Paying a slip fully or partially and printing a payslip.
- Calculating percentage salaries from sales.

## Page layout

| Area | What it shows |
| --- | --- |
| Employee salaries | Employee, basis, amount, tax percentage, status and creation date |
| Salary slips | Employee, slip number, period, net salary, paid amount, status |
| Salary payments | Employee, reference, period, amount, status and payment date |
| Actions | Add bonus, add deduction, assign salary and pay salary |

Slips and payments show the latest twenty each. Use the payslip view for the complete record.

## How to use it

### Assign a salary

1. Open **Finance > Salaries** and choose **Assign salary**.
2. Choose the employee and the basis: fixed or percentage.
3. For a fixed salary, choose the currency, the period type and the amount.
4. For a percentage salary, enter the percentage and choose what it is calculated on.
5. Choose the effective date.
6. Save. A previous active assignment with the same basis is deactivated, so one employee keeps one
   active salary per basis.

| Field | Required | Rules |
| --- | --- | --- |
| Employee | Yes | Must belong to the branch |
| Period type | Yes | Must exist |
| Currency | Yes for fixed | Must exist |
| Basis | Yes | Fixed or percentage |
| Amount | For fixed | Zero or greater |
| Percentage | For percentage | Between zero and one hundred |
| Calculated on | For percentage | Must be a percentage salary type |
| Effective from | Yes | Date |

### Add a bonus or deduction

1. Choose **Add bonus** or **Add deduction**.
2. Select the employee.
3. For periodic salaries choose the period; for others choose an effective date.
4. Enter the amount and a reason. Deductions also take a type such as tax, insurance, loan or advance.
5. Save. If a slip already exists it is recalculated immediately; otherwise the adjustment stays pending
   until the slip is generated.

Bonuses and deductions are blocked once a slip is fully paid.

### Pay a salary

1. Choose **Pay salary**.
2. Pick the assignment and, for periodic salaries, the period.
3. Review the information sheet: base salary, bonuses, deductions, calculated payable, paid and
   remaining.
4. Choose the branch account. It must be in the salary currency and have enough balance.
5. Enter the amount. It cannot exceed the remaining payable.
6. Add notes and confirm. The account is debited, the slip paid amount increases and the status changes.

### Percentage salaries

Choose the from and to dates and calculate. The table shows each invoice with the amount and the earned
share. Exchange rates can be adjusted per active sales currency before generating slips, either as one
combined currency or as separate slips per currency.

## What is restricted

- Reading requires `finance.salaries` read; assigning, adjusting, generating and paying require write.
- Employees must belong to the active branch, and slips are branch-scoped.
- Only accounts in the salary currency are offered; a mismatch blocks payment.
- Overpayment, paying a fully paid slip and insufficient account balance are all rejected.
- A bonus or deduction cannot be applied to a paid or fully paid slip.
- Salary history cannot be deleted. Corrections are recorded as new payments or adjustments.

## Tips and troubleshooting

- **The employee is missing.** They belong to another branch; switch branch or correct the employee
  record.
- **No periods are available.** The period type of the assignment does not produce periods for the chosen
  range, or slips already exist.
- **The account list is empty.** Create an account in the salary currency.
- **The payslip shows an old amount.** Recalculate after adding a bonus or deduction; open the slip view
  to confirm the latest totals.
- **Percentage slips are empty.** There were no sales in the selected range for that employee's branch.

## Related pages

- [Accounts](/docs/business/finance/accounts)
- [Employee Access](/docs/business/store/employee-access)
- [Reports](/docs/business/store/reports)
- [Finance Overview](/docs/business/finance/overview)
