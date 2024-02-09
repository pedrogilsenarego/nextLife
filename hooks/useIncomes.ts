"use client";

import { useData } from "@/app/[user]/components/dashboard.provider";
import { queryKeys } from "@/constants/queryKeys";
import { getAllIncomesForCurrentMonth } from "@/server/incomeActions";
import { IncomesQuery } from "@/types/incomesTypes";
import { dateQueriesMap } from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";

const useIncomes = () => {
  const dataContex = useData();
  const selectedBusiness = dataContex.state.currentBusiness;
  const timeRange = dataContex.state.timeRange;
  const datesToQuery = dateQueriesMap(timeRange);
  const incomesQuery = useQuery<IncomesQuery, Error>({
    queryKey: [queryKeys.incomes],
    queryFn: () =>
      getAllIncomesForCurrentMonth({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
  });

  const incomes =
    selectedBusiness === "total"
      ? incomesQuery.data?.data
      : incomesQuery.data?.data.filter(
          (expense) => expense.businessId === selectedBusiness
        );
  const incomesMetadata = incomesQuery.data?.metaData;
  return { incomes, incomesQuery, incomesMetadata };
};

export default useIncomes;
