"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getAllIncomesForCurrentMonth } from "@/server/incomeActions";
import { IncomesQuery } from "@/types/incomesTypes";
import { useQuery } from "@tanstack/react-query";

const useIncomes = () => {
  const incomes = useQuery<IncomesQuery, Error>({
    queryKey: [queryKeys.incomes],
    queryFn: getAllIncomesForCurrentMonth,
  });
  return incomes;
};

export default useIncomes;
