"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { getAllExpensesForCurrentMonth } from "@/server/expensesActions";
import { getAllIncomesForCurrentMonth } from "@/server/incomeActions";
import { useQuery } from "@tanstack/react-query";

const useMainCard = () => {
  const { data: businesses } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  const { data: expensesMonth } = useQuery({
    queryKey: [queryKeys.expenses],
    queryFn: getAllExpensesForCurrentMonth,
  });
  const { data: incomesMonth } = useQuery({
    queryKey: [queryKeys.incomes],
    queryFn: getAllIncomesForCurrentMonth,
  });
  return {
    businesses,
    expensesMonth,
    incomesMonth,
  };
};

export default useMainCard;
