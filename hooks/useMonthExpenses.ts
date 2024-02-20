"use client";

import { useData } from "@/app/[slug]/components/dashboard.provider";
import { getCumulativeExpensesForCurrentMonth } from "@/clientActions/expensesActions";
import { queryKeys } from "@/constants/queryKeys";
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
      ? (expensesQuery?.data?.data as MonthExpense[])?.reduce(
          (accumulator, expense) => {
            const existingExpense = accumulator.find(
              (item: MonthExpense) => item.category === expense.category
            );

            if (existingExpense) {
              existingExpense.amount += expense.amount;
            } else {
              accumulator.push({ ...expense });
            }

            return accumulator;
          },
          [] as MonthExpense[]
        )
      : (expensesQuery.data?.data as MonthExpense[])?.filter(
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
