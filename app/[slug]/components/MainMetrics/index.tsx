"use client";

import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";

import DateCarousel from "./DateCarousel";

import OneLevelChartPie from "@/components/ChartComponents/OneLevelChartPie";
import { H2 } from "@/components/ui/h2";
import ResumedTable from "./ResumedTable";
import InfoTable from "./InfoTable";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useBusinesses from "@/hooks/useBusinesses";
import { useData } from "../dashboard.provider";

const MainMetrics = () => {
  const { expensesByCategory, expensesQuery } = useMonthExpenses();
  //const { incomes, incomesByCategory } = useMonthIncomes();
  const businessesQuery = useBusinesses();
  const dataContext = useData();
  const businessSelected = dataContext.state.currentBusiness;
  //const ratio = (Number(expenses) || 1) / (Number(incomes) || 1);
  const mappedExpensesByCategory =
    expensesByCategory?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];

  const businessSelectedData = businessesQuery?.data?.find(
    (business) => business.id === businessSelected
  );
  const typeBusiness = businessSelectedData?.type;

  return (
    <div className="flex gap-3 justify-between w-full">
      <div>
        {!expensesQuery.isLoading && mappedExpensesByCategory.length > 0 && (
          <OneLevelChartPie data1={mappedExpensesByCategory} />
        )}
        <H2
          className="absolute"
          style={{ opacity: expensesQuery.isLoading ? 1 : 0 }}
        >
          Loading...
        </H2>
      </div>
      <div className="w-full">
        <ResumedTable />
        {typeBusiness === 1 && <InfoTable />}
      </div>
      <DateCarousel />
    </div>
  );
};

export default MainMetrics;
