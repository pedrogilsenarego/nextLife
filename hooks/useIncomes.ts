"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getAllIncomesForCurrentMonth } from "@/server/incomeActions";
import { IncomesQuery } from "@/types/incomesTypes";
import { dateQueriesMap } from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./slicer.hooks";

const useIncomes = () => {
  const selectedBusiness = useAppSelector<string>(
    (state) => state.DataSlice.business
  );
  const timeRange = useAppSelector((state) => state.DataSlice.timeRange);
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
