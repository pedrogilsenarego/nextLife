"use client";

import { default as TwoLevelChartPie } from "@/components/ChartComponents/TwoLevelChartPie";
import { CarouselCard } from "@/components/ui/Wrappers/CarouselCard";
import { queryKeys } from "@/constants/queryKeys";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";

import AddExpense from "./AddExpense/AddExpense";
import AddIncome from "./AddIncome";
import DateCarousel from "./DateCarousel";
import MainValue from "./MainValue";
import ResumedTable from "./ResumedTable";

const MainMetrics = () => {
  const expensesQuery = useExpenses();
  const incomesQuery = useIncomes();

  const totalIncome = incomesQuery?.data?.metaData.totalAmount;
  const totalExpense = expensesQuery?.data?.metaData.totalAmount;

  const incomeByCategory = incomesQuery.data?.metaData.byCategory;
  const expenseByCategory = expensesQuery?.data?.metaData.byCategory;

  const ratio = (totalExpense || 1) / (totalIncome || 1);

  if (!expenseByCategory || !incomeByCategory) return;

  return (
    <div className="flex gap-3 justify-between w-full">
      <div className="flex gap-1  w-full p-3 ">
        <div className="flex gap-4 flex-col">
          <TwoLevelChartPie
            percentageRatio={ratio}
            data1={expenseByCategory}
            data2={incomeByCategory}
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
