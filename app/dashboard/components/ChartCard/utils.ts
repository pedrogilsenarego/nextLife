import { Expense } from "@/types/expensesTypes";
import { Income } from "@/types/incomesTypes";

export const buildData = (expenses: Expense[], incomes: Income[]) => {
  // Convert expenses and incomes to arrays with { date, amount } format
  const expensesData = expenses.map((expense) => ({
    date: new Date(expense.created_at).toISOString(),
    amount: expense.amount,
  }));

  const incomesData = incomes.map((income) => ({
    date: new Date(income.created_at).toISOString(),
    amount: income.amount,
  }));

  // Merge expenses and incomes based on date
  const mergedData = expensesData
    .map((expense) => ({
      xAxis: expense.date,
      uv: expense.amount,
      pv: 0, // Set income amount to 0 initially
    }))
    .concat(
      incomesData.map((income) => ({
        xAxis: income.date,
        uv: 0, // Set expense amount to 0 initially
        pv: income.amount,
      }))
    );

  // Add a point for the first day of the month
  const firstDayOfMonth =
    mergedData.length > 0 ? new Date(mergedData[0]?.xAxis) : new Date();

  firstDayOfMonth.setDate(1);
  mergedData.unshift({
    xAxis: firstDayOfMonth?.toISOString(),
    uv: 0,
    pv: 0,
  });

  // Sort the merged array based on the 'xAxis' property
  mergedData.sort(
    (a, b) => new Date(a.xAxis).getTime() - new Date(b.xAxis).getTime()
  );

  return mergedData;
};
