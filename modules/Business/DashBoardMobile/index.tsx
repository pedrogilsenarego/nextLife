import OneLevelChartPie from "@/components/ChartComponents/OneLevelChartPie";
import { Card } from "@/components/ui/card";
import useMonthExpenses from "@/hooks/useMonthExpenses";

const DashBoardMobile = () => {
  const { expensesByCategory, expensesQuery } = useMonthExpenses();
  const mappedExpensesByCategory =
    expensesByCategory?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];
  return (
    <div className="w-full p-2">
      <Card className="flex justify-center p-2">
        {!expensesQuery.isLoading && mappedExpensesByCategory.length > 0 && (
          <OneLevelChartPie data1={mappedExpensesByCategory} />
        )}
      </Card>
    </div>
  );
};

export default DashBoardMobile;
