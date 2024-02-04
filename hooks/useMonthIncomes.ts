"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getCumulativeIncomesForCurrentMonth } from "@/server/incomeActions";
import { MonthIncomesQuery } from "@/types/incomesTypes";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppSelector } from "./slicer.hooks";

const useMonthIncomes = () => {
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

  const incomesQuery = useQuery<MonthIncomesQuery, Error>({
    queryKey: [queryKeys.monthIncomes],
    queryFn: () =>
      getCumulativeIncomesForCurrentMonth({
        timeRange: { startDate: firstDayOfMonth, endDate: lastDayOfMonth },
      }),
  });
  const incomesFilteredByBusiness =
    selectedBusiness === "total"
      ? incomesQuery.data?.data
      : incomesQuery.data?.data.filter(
          (expense) => expense.businessId === selectedBusiness
        );
  const incomes = incomesFilteredByBusiness?.reduce(
    (sum, expense) => sum + (expense.amount || 0),
    0
  );
  const incomesMetadata = incomesQuery.data?.metaData;
  return {
    incomesMetadata,
    incomesQuery,
    incomes,
    incomesByCategory: incomesFilteredByBusiness,
  };
};

export default useMonthIncomes;
