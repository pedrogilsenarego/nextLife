"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { getAllExpensesForCurrentMonth } from "@/server/expensesActions";
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
  return {
    businesses,
    expensesMonth,
  };
};

export default useMainCard;
