"use client";

import { default as TwoLevelChartPie } from "@/components/ChartComponents/TwoLevelChartPie";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import AddExpense from "./AddExpense/AddExpense";
import AddIncome from "./AddIncome";
import DateCarousel from "./DateCarousel";
import MainValue from "./MainValue";
import ResumedTable from "./ResumedTable";

const MainMetrics = () => {
  const { expenses, expensesByCategory } = useMonthExpenses();
  const { incomes, incomesByCategory } = useMonthIncomes();

  const ratio = (Number(expenses) || 1) / (Number(incomes) || 1);
  const mappedExpensesByCategory =
    expensesByCategory?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];
  const mappedIncomesByCategory =
    incomesByCategory?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];

  return (
    <div className="flex gap-3 justify-between w-full">
      <div className="flex gap-1  w-full p-3 ">
        <div className="flex gap-4 flex-col">
          <TwoLevelChartPie
            percentageRatio={ratio}
            data1={mappedExpensesByCategory}
            data2={mappedIncomesByCategory}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <ResumedTable />
          <MainValue />
          <div className=" flex items-center gap-1 ">
            <AddExpense />
            <AddIncome />
          </div>
        </div>
      </div>
      <div>
        <DateCarousel />
      </div>
    </div>
  );
};

export default MainMetrics;
