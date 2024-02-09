"use client";

import { useData } from "@/app/[user]/components/dashboard.provider";
import { queryKeys } from "@/constants/queryKeys";
import { getCumulativeExpensesForCurrentMonth } from "@/server/expensesActions";
import {
  Expense,
  MonthExpense,
  MonthExpensesQuery,
} from "@/types/expensesTypes";
import { dateQueriesMap } from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";

const useMonthExpenses = () => {
  const dataContex = useData();
  const selectedBusiness = dataContex.state.currentBusiness;
  const timeRange = dataContex.state.timeRange;
  const datesToQuery = dateQueriesMap(timeRange);

  const expensesQuery = useQuery<MonthExpensesQuery, Error>({
    queryKey: [queryKeys.monthExpenses],
    queryFn: () =>
      getCumulativeExpensesForCurrentMonth({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
  });

  const expensesFilteredByBusiness =
    selectedBusiness === "total"
      ? expensesQuery.data?.data
      : expensesQuery.data?.data.filter(
          (expense) => expense.businessId === selectedBusiness
        );

  const expenses = expensesFilteredByBusiness
    ?.reduce((sum, expense) => sum + (expense.amount || 0), 0)
    .toFixed(2);

  const expensesMetadata = expensesQuery.data?.metaData;

  return {
    expenses,
    expensesQuery,
    expensesMetadata,
    expensesByCategory: expensesFilteredByBusiness,
  };
};

export default useMonthExpenses;
