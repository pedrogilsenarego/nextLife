import { useEffect, useState } from "react";
import useBusinesses from "./useBusinesses";
import useMonthExpenses from "./useMonthExpenses";
import useMonthIncomes from "./useMonthIncomes";

const useMonthBalances = () => {
  const { businesses } = useBusinesses();
  const { expensesByBusiness } = useMonthExpenses();
  const { incomesByBusiness } = useMonthIncomes();

  if (!businesses.data || !expensesByBusiness || !incomesByBusiness) {
    return [];
  }

  // Create a map of businessId to expenses amount
  const expensesMap = Object.fromEntries(
    expensesByBusiness.map(({ businessId, amount }) => [businessId, amount])
  );

  // Create a map of businessId to incomes amount
  const incomesMap = Object.fromEntries(
    incomesByBusiness.map(({ businessId, amount }) => [businessId, amount])
  );

  // Merge expenses and incomes for each business and calculate balance
  const monthBalances = businesses.data.map((business) => {
    const businessId = business.id;
    const expensesAmount = expensesMap[businessId] || 0;
    const incomesAmount = incomesMap[businessId] || 0;
    const balance = incomesAmount - expensesAmount;
    return { businessId, balance };
  });
  console.log(monthBalances);
  return monthBalances;
};

export default useMonthBalances;
