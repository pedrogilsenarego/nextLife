"use client";

import { getAllExpensesForCurrentMonth } from "@/clientActions/expensesActions";
import { queryKeys } from "@/constants/queryKeys";
import { ExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";

import { useData } from "@/app/[slug]/components/dashboard.provider";
import { dateQueriesMap } from "@/utils/dateFormat";

const useExpenses = () => {
  const dataContext = useData();
  const timeRange = dataContext.state.timeRange;
  const datesToQuery = dateQueriesMap(timeRange);

  const selectedBusiness = dataContext.state.currentBusiness;
  const expensesQuery = useQuery<ExpensesQuery, Error>({
    queryKey: [queryKeys.expenses],
    queryFn: () =>
      getAllExpensesForCurrentMonth({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
  });

  const expenses =
    selectedBusiness === "total"
      ? expensesQuery.data?.data
      : expensesQuery.data?.data.filter(
          (expense) => expense.businessId === selectedBusiness
        );
  const expensesMetadata = expensesQuery.data?.metaData;

  return { expenses, expensesQuery, expensesMetadata };
};

export default useExpenses;
