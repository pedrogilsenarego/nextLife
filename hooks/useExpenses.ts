"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getAllExpensesForCurrentMonth } from "@/server/expensesActions";
import { ExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";

const useExpenses = () => {
  const expenses = useQuery<ExpensesQuery, Error>({
    queryKey: [queryKeys.expenses],
    queryFn: getAllExpensesForCurrentMonth,
  });
  return expenses;
};

export default useExpenses;
