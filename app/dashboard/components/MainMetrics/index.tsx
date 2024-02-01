"use client";

import {
  default as Example,
  default as TwoLevelChartPie,
} from "@/components/ChartComponents/TwoLevelChartPie";
import { CarouselCard } from "@/components/UI/Wrappers/CarouselCard";
import { H3 } from "@/components/UI/h3";
import { queryKeys } from "@/constants/queryKeys";
import { getAllExpensesForCurrentMonth } from "@/server/expensesActions";
import { getAllIncomesForCurrentMonth } from "@/server/incomeActions";
import { ExpensesQuery } from "@/types/expensesTypes";
import { IncomesQuery } from "@/types/incomesTypes";
import { useQuery } from "@tanstack/react-query";
import AddExpense from "./AddExpense/AddExpense";
import AddIncome from "./AddIncome";

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

  const ratio = totalExpense / totalIncome;

  return (
    <div className="flex gap-4 justify-between w-full">
      <div className="flex gap-4">
        <TwoLevelChartPie percentageRatio={ratio} />
        <div className=" flex flex-col items-center justify-around">
          <div className="flex items-center gap-2">
            <AddExpense />
            <H3>{`$${totalExpense.toString()}`}</H3>
          </div>
          <div className="flex items-center gap-2">
            <AddIncome />
            <H3>{`$${totalIncome.toString()}`}</H3>
          </div>
        </div>
      </div>
      <CarouselCard />
    </div>
  );
};

export default MainMetrics;
