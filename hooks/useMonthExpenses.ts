"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getCumulativeExpensesForCurrentMonth } from "@/server/expensesActions";
import { MonthExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppSelector } from "./slicer.hooks";

const useMonthExpenses = () => {
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
  const timeRangeSelected = useAppSelector<{ startDate: Date; endDate: Date }>(
    (state) => state.DataSlice.timeRange
  );

  const expensesQuery = useQuery<MonthExpensesQuery, Error>({
    queryKey: [queryKeys.monthExpenses],
    queryFn: () =>
      getCumulativeExpensesForCurrentMonth({
        timeRange: { startDate: firstDayOfMonth, endDate: lastDayOfMonth },
      }),
  });

  // useEffect(() => {
  //   expensesQuery.refetch();
  // }, [timeRangeSelected]);
  const expensesFilteredByBusiness =
    selectedBusiness === "total"
      ? expensesQuery.data?.data
      : expensesQuery.data?.data.filter(
          (expense) => expense.businessId === selectedBusiness
        );

  const expenses = expensesFilteredByBusiness?.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );

  const expensesMetadata = expensesQuery.data?.metaData;

  return {
    expenses,
    expensesQuery,
    expensesMetadata,
    expensesByCategory: expensesFilteredByBusiness,
  };
};

export default useMonthExpenses;
