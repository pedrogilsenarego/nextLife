import { MonthExpense } from "@/types/expensesTypes";

export const getByCategoryForBusinessFiltered = (
  data: MonthExpense[],
  filter: string
) =>
  data
    ?.filter((expense) => expense.businessId === filter)
    .reduce((accumulator, expense) => {
      const existingExpense = accumulator.find(
        (item: MonthExpense) => item.category === expense.category
      );

      if (existingExpense) {
        existingExpense.amount += expense.amount;
      } else {
        accumulator.push({ ...expense });
      }

      return accumulator;
    }, [] as MonthExpense[]);
