"use client";

import {
  default as Example,
  default as TwoLevelChartPie,
} from "@/components/ChartComponents/TwoLevelChartPie";
import { CarouselCard } from "@/components/ui/Wrappers/CarouselCard";
import { queryKeys } from "@/constants/queryKeys";
import { getAllExpensesForCurrentMonth } from "@/server/expensesActions";
import { getAllIncomesForCurrentMonth } from "@/server/incomeActions";
import { ExpensesQuery } from "@/types/expensesTypes";
import { IncomesQuery } from "@/types/incomesTypes";
import { useQuery } from "@tanstack/react-query";
import AddExpense from "./AddExpense/AddExpense";
import AddIncome from "./AddIncome";
import MainValue from "./MainValue";
import ResumedTable from "./ResumedTable";

const MainMetrics = () => {
  const { data: expensesMonth } = useQuery<ExpensesQuery>({
    queryKey: [queryKeys.expenses],
    queryFn: getAllExpensesForCurrentMonth,
  });

  const { data: incomesMonth } = useQuery<IncomesQuery>({
    queryKey: [queryKeys.incomes],
    queryFn: getAllIncomesForCurrentMonth,
  });
  if (!expensesMonth || !incomesMonth) return;

  const totalIncome = incomesMonth.metaData.totalAmount;
  const totalExpense = expensesMonth.metaData.totalAmount;

  const incomeByCategory = incomesMonth.metaData.byCategory;
  const expenseByCategory = expensesMonth.metaData.byCategory;

  const ratio = totalExpense / totalIncome;

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
        <CarouselCard />
      </div>
    </div>
  );
};

export default MainMetrics;
