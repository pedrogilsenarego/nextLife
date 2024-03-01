"use client";

import { useData } from "@/app/[slug]/components/dashboard.provider";
import { getCumulativeIncomesForCurrentMonth } from "@/clientActions/incomeActions";
import { queryKeys } from "@/constants/queryKeys";
import { MonthIncome, MonthIncomesQuery } from "@/types/incomesTypes";
import { dateQueriesMap } from "@/utils/dateFormat";
import { useQuery } from "@tanstack/react-query";

const useMonthIncomes = () => {
  const dataContex = useData();
  const selectedBusiness = dataContex.state.currentBusiness;
  const timeRange = dataContex.state.timeRange;
  const datesToQuery = dateQueriesMap(timeRange);
  const incomesQuery = useQuery<MonthIncomesQuery, Error>({
    queryKey: [queryKeys.monthIncomes],
    queryFn: () =>
      getCumulativeIncomesForCurrentMonth({
        timeRange: {
          startDate: datesToQuery.startDate,
          endDate: datesToQuery.endDate,
        },
      }),
  });
  const incomesByMonth =
    selectedBusiness === "total"
      ? incomesQuery?.data?.data
      : (incomesQuery.data?.data as MonthIncome[])?.filter(
          (expense) => expense.businessId === selectedBusiness
        );

  const incomesByBusiness =
    selectedBusiness === "total"
      ? (incomesQuery?.data?.data as MonthIncome[])?.reduce(
          (accumulator, expense) => {
            const existingExpense = accumulator.find(
              (item: MonthIncome) => item.businessId === expense.businessId
            );

            if (existingExpense) {
              existingExpense.amount += expense.amount;
            } else {
              accumulator.push({ ...expense });
            }

            return accumulator;
          },
          [] as MonthIncome[]
        )
      : (incomesQuery.data?.data as MonthIncome[])?.filter(
          (expense) => expense.businessId === selectedBusiness
        );

  const incomesByCategory =
    selectedBusiness === "total"
      ? (incomesQuery?.data?.data as MonthIncome[])?.reduce(
          (accumulator, expense) => {
            const existingExpense = accumulator.find(
              (item: MonthIncome) => item.category === expense.category
            );

            if (existingExpense) {
              existingExpense.amount += expense.amount;
            } else {
              accumulator.push({ ...expense });
            }

            return accumulator;
          },
          [] as MonthIncome[]
        )
      : (incomesQuery.data?.data as MonthIncome[])?.filter(
          (expense) => expense.businessId === selectedBusiness
        );

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
  };
};

export default useMonthIncomes;
