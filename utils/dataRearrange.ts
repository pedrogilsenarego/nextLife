import { MonthExpense } from "@/types/expensesTypes";

const combineExpensesByDate = (
  expenses: MonthExpense[] | undefined
): { date: Date; amount: number }[] => {
  const combinedExpenses =
    expenses?.reduce((accumulator, expense) => {
      const { created_at, amount } = expense;
      // Convert timestamp to a Date object
      const date = new Date(created_at);

      // Extract year and month from the Date object
      const yearMonthKey = new Date(date.getFullYear(), date.getMonth(), 1);

      // Find the entry for this year and month in the accumulator array
      const existingEntry = accumulator.find(
        (entry) => entry.date.getTime() === yearMonthKey.getTime()
      );

      // If an entry already exists, update its amount
      if (existingEntry) {
        existingEntry.amount += amount;
      } else {
        // Otherwise, create a new entry for this year and month
        accumulator.push({ date: yearMonthKey, amount });
      }
      return accumulator;
    }, [] as { date: Date; amount: number }[]) || [];

  return combinedExpenses;
};

export const dataByMonth = (expenses: MonthExpense[] | undefined) => {
  return combineExpensesByDate(expenses);
};
