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
import useBusinesses from "./useBusinesses";
import {
  getByCategoryForBusinessFiltered,
  getByMonthForBusinessFiltered,
} from "@/lib/dataCalculations";

const useMonthExpenses = (timeSelected?: string) => {
  const dataContex = useData();
  const selectedBusiness = dataContex.state.currentBusiness;
  const timeRange = timeSelected || dataContex.state.timeRange;
  const datesToQuery = dateQueriesMap(timeRange);
  const { onlyBalanceIds } = useBusinesses();

  const expensesQuery = useQuery<MonthExpensesQuery, Error>({
    queryKey: [queryKeys.monthExpenses, timeRange],
    queryFn: () =>
      getCumulativeExpensesForCurrentMonth({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
  });

  const getExpensesByMonth = (business: string) =>
    getByMonthForBusinessFiltered(expensesQuery?.data?.data || [], business);

  const expensesByMonth =
    selectedBusiness === "total"
      ? expensesQuery?.data?.data?.filter((expense) =>
          onlyBalanceIds.includes(expense.businessId)
        )
      : getExpensesByMonth(selectedBusiness);

  const expensesByBusiness =
    selectedBusiness === "total"
      ? (expensesQuery?.data?.data as MonthExpense[])
          ?.reduce((accumulator, expense) => {
            const existingExpense = accumulator.find(
              (item: MonthExpense) => item.businessId === expense.businessId
            );

            if (existingExpense) {
              existingExpense.amount += expense.amount;
            } else {
              accumulator.push({ ...expense });
            }

            return accumulator;
          }, [] as MonthExpense[])
          .filter((expense) => onlyBalanceIds.includes(expense.businessId))
      : (expensesQuery.data?.data as MonthExpense[])?.filter(
          (expense) => expense.businessId === selectedBusiness
        );

  const getExpensesByCategoryFiltered = (business: string) =>
    getByCategoryForBusinessFiltered(expensesQuery?.data?.data || [], business);

  const expensesByCategory =
    selectedBusiness === "total"
      ? (expensesQuery?.data?.data as MonthExpense[])
          ?.reduce((accumulator, expense) => {
            const existingExpense = accumulator.find(
              (item: MonthExpense) => item.category === expense.category
            );

            if (existingExpense) {
              existingExpense.amount += expense.amount;
            } else {
              accumulator.push({ ...expense });
            }

            return accumulator;
          }, [] as MonthExpense[])
          .filter((expense) => onlyBalanceIds.includes(expense.businessId))
      : getExpensesByCategoryFiltered(selectedBusiness);

  const totalExpenses = expensesByCategory
    ?.reduce((sum, expense) => sum + (expense.amount || 0), 0)
    .toFixed(2);

  const expensesMetadata = expensesQuery.data?.metaData;

  return {
    totalExpenses,
    expensesQuery,
    expensesMetadata,
    expensesByCategory,
    expensesByMonth,
    expensesByBusiness,
    getExpensesByCategoryFiltered,
    getExpensesByMonth,
  };
};

export default useMonthExpenses;
