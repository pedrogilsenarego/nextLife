"use client";

import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";

import DateCarousel from "./DateCarousel";

import OneLevelChartPie from "@/components/ChartComponents/OneLevelChartPie";
import { H2 } from "@/components/ui/h2";
import ResumedTable from "./ResumedTable";

const MainMetrics = () => {
  const { expensesByCategory, expensesQuery } = useMonthExpenses();
  //const { incomes, incomesByCategory } = useMonthIncomes();

  //const ratio = (Number(expenses) || 1) / (Number(incomes) || 1);
  const mappedExpensesByCategory =
    expensesByCategory?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];
  // const mappedIncomesByCategory =
  //   incomesByCategory?.map((expenses) => {
  //     return { value: expenses.amount, name: expenses.category };
  //   }) || [];

  return (
    <div className="flex gap-3 justify-between w-full">
      <div className="flex gap-1  w-full p-3 ">
        <div className="flex gap-4 flex-col">
          {!expensesQuery.isLoading && (
            <OneLevelChartPie data1={mappedExpensesByCategory} />
          )}
          <H2
            className="absolute"
            style={{ opacity: expensesQuery.isLoading ? 1 : 0 }}
          >
            Loading...
          </H2>
        </div>
        <div className="w-full flex flex-col gap-4">
          <ResumedTable />
        </div>
      </div>
      <div>
        <DateCarousel />
      </div>
    </div>
  );
};

export default MainMetrics;
