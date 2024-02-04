"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getAllIncomesForCurrentMonth } from "@/server/incomeActions";
import { IncomesQuery } from "@/types/incomesTypes";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "./slicer.hooks";

const useIncomes = () => {
  const selectedBusiness = useAppSelector<string>(
    (state) => state.DataSlice.business
  );
  const incomesQuery = useQuery<IncomesQuery, Error>({
    queryKey: [queryKeys.incomes],
    queryFn: getAllIncomesForCurrentMonth,
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
