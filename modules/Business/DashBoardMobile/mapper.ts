import { BusinessesQuery } from "@/types/businessTypes";
import { MonthExpense } from "@/types/expensesTypes";
import { MonthIncome } from "@/types/incomesTypes";

type Props = {
  expenses: MonthExpense[];
  incomes: MonthIncome[];
  businesses: BusinessesQuery | undefined;
};

export const buildCards = ({
  expenses: expensesByBusiness,
  incomes: incomesByBusiness,
  businesses,
}: Props) => {
  console.log(businesses);
};
