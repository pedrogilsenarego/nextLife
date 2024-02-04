"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getAllExpensesForCurrentMonth } from "@/server/expensesActions";
import { ExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";

import { useAppSelector } from "./slicer.hooks";

const useExpenses = () => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const selectedBusiness = useAppSelector<string>(
    (state) => state.DataSlice.business
  );

  const expensesQuery = useQuery<ExpensesQuery, Error>({
    queryKey: [queryKeys.expenses],
    queryFn: () =>
      getAllExpensesForCurrentMonth({
        timeRange: { startDate: firstDayOfMonth, endDate: lastDayOfMonth },
      }),
  });

  const expenses =
    selectedBusiness === "total"
      ? expensesQuery.data?.data
      : expensesQuery.data?.data.filter(
          (expense) => expense.businessId === selectedBusiness
        );
  const expensesMetadata = expensesQuery.data?.metaData;

  return { expenses, expensesQuery, expensesMetadata };
};

export default useExpenses;
