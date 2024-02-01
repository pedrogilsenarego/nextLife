"use client";

import { CarouselCard } from "@/components/UI/Wrappers/CarouselCard";
import { queryKeys } from "@/constants/queryKeys";
import { getAllExpensesForCurrentMonth } from "@/server/expensesActions";
import { getAllIncomesForCurrentMonth } from "@/server/incomeActions";
import { ExpensesQuery } from "@/types/expensesTypes";
import { IncomesQuery } from "@/types/incomesTypes";
import { useQuery } from "@tanstack/react-query";
import RoundShow from "../../../../components/ChartComponents/RoundShow";
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

  return (
    <div className="flex gap-4 justify-between w-full">
      <div className="flex gap-4">
        <RoundShow
          value={
            expensesMonth?.metaData?.totalAmount -
            incomesMonth?.metaData?.totalAmount
          }
          currency="$"
          percentage={
            (incomesMonth?.metaData?.totalAmount /
              expensesMonth?.metaData?.totalAmount) *
            100
          }
        />
        <div className=" flex flex-col items-center justify-around">
          <AddExpense />
          <AddIncome />
        </div>
      </div>
      <CarouselCard />
    </div>
  );
};

export default MainMetrics;
