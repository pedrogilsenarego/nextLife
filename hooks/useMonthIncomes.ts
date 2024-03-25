"use client";

import { useData } from "@/app/[slug]/components/dashboard.provider";
import { getCumulativeIncomesForCurrentMonth } from "@/clientActions/incomeActions";
import { queryKeys } from "@/constants/queryKeys";
import { MonthIncome, MonthIncomesQuery } from "@/types/incomesTypes";
import { dateQueriesMap } from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";
import useBusinesses from "./useBusinesses";
import {
  getByCategoryForBusinessFiltered,
  getByMonthForBusinessFiltered,
} from "@/lib/dataCalculations";

const useMonthIncomes = (timeSelected?: string) => {
  const dataContex = useData();
  const selectedBusiness = dataContex.state.currentBusiness;
  const timeRange = timeSelected || dataContex.state.timeRange;
  const datesToQuery = dateQueriesMap(timeRange);
  const { onlyBalanceIds, getBusinesesType1 } = useBusinesses();
  const incomesQuery = useQuery<MonthIncomesQuery, Error>({
    queryKey: [queryKeys.monthIncomes, timeRange],
    queryFn: () =>
      getCumulativeIncomesForCurrentMonth({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
  });

  const getIncomesByMonth = (business: string) => {
    return getByMonthForBusinessFiltered(
      incomesQuery?.data?.data || [],
      business
    ).map((income) => {
      if (getBusinesesType1().includes(income.businessId)) {
        return { ...income, amount: income.amount * 0.77 };
      } else {
        return income;
      }
    });
  };

  const incomesByMonth =
    selectedBusiness === "total"
      ? incomesQuery?.data?.data
          .filter((expense) => onlyBalanceIds.includes(expense.businessId))
          .map((income) => {
            if (getBusinesesType1().includes(income.businessId)) {
              return { ...income, amount: income.amount * 0.77 };
            } else {
              return income;
            }
          })
      : getIncomesByMonth(selectedBusiness);

  const incomesByBusiness =
    selectedBusiness === "total"
      ? (incomesQuery?.data?.data as MonthIncome[])
          ?.reduce((accumulator, expense) => {
            const existingExpense = accumulator.find(
              (item: MonthIncome) => item.businessId === expense.businessId
            );

            if (existingExpense) {
              existingExpense.amount += expense.amount;
            } else {
              accumulator.push({ ...expense });
            }

            return accumulator;
          }, [] as MonthIncome[])
          .filter((expense) => onlyBalanceIds.includes(expense.businessId))
      : (incomesQuery.data?.data as MonthIncome[])?.filter(
          (expense) => expense.businessId === selectedBusiness
        );

  const getIncomesByCategoryFiltered = (business: string) =>
    getByCategoryForBusinessFiltered(incomesQuery?.data?.data || [], business);

  const incomesByCategory =
    selectedBusiness === "total"
      ? (incomesQuery?.data?.data as MonthIncome[])
          ?.reduce((accumulator, expense) => {
            const existingExpense = accumulator.find(
              (item: MonthIncome) => item.category === expense.category
            );

            if (existingExpense) {
              existingExpense.amount += expense.amount;
            } else {
              accumulator.push({ ...expense });
            }
            return accumulator;
          }, [] as MonthIncome[])
          .filter((expense) => onlyBalanceIds.includes(expense.businessId))
      : getIncomesByCategoryFiltered(selectedBusiness);

  const totalIncomes = incomesByCategory
    ?.reduce((sum, expense) => sum + (expense.amount || 0), 0)
    .toFixed(2);
  const incomesMetadata = incomesQuery.data?.metaData;
  return {
    incomesMetadata,
    incomesQuery,
    totalIncomes,
    incomesByCategory,
    incomesByMonth,
    incomesByBusiness,
    getIncomesByCategoryFiltered,
    getIncomesByMonth,
  };
};

export default useMonthIncomes;
