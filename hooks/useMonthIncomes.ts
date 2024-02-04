"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getCumulativeIncomesForCurrentMonth } from "@/server/incomeActions";
import { MonthIncomesQuery } from "@/types/incomesTypes";
import { dateQueriesMap } from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAppSelector } from "./slicer.hooks";

const useMonthIncomes = () => {
  const selectedBusiness = useAppSelector<string>(
    (state) => state.DataSlice.business
  );
  const timeRange = useAppSelector((state) => state.DataSlice.timeRange);
  const datesToQuery = dateQueriesMap(timeRange);
  const incomesQuery = useQuery<MonthIncomesQuery, Error>({
    queryKey: [queryKeys.monthIncomes],
    queryFn: () =>
      getCumulativeIncomesForCurrentMonth({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
  });
  const incomesFilteredByBusiness =
    selectedBusiness === "total"
      ? incomesQuery.data?.data
      : incomesQuery.data?.data.filter(
          (expense) => expense.businessId === selectedBusiness
        );
  const incomes = incomesFilteredByBusiness
    ?.reduce((sum, expense) => sum + (expense.amount || 0), 0)
    .toFixed(2);
  const incomesMetadata = incomesQuery.data?.metaData;
  return {
    incomesMetadata,
    incomesQuery,
    incomes,
    incomesByCategory: incomesFilteredByBusiness,
  };
};

export default useMonthIncomes;
