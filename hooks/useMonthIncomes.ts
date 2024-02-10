"use client";

import { useData } from "@/app/[slug]/components/dashboard.provider";
import { getCumulativeIncomesForCurrentMonth } from "@/clientActions/incomeActions";
import { queryKeys } from "@/constants/queryKeys";
import { MonthIncomesQuery } from "@/types/incomesTypes";
import { dateQueriesMap } from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";

const useMonthIncomes = () => {
  const dataContex = useData();
  const selectedBusiness = dataContex.state.currentBusiness;
  const timeRange = dataContex.state.timeRange;
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
