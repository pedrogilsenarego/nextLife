import ResumedTable from "@/app/[slug]/components/MainMetrics/ResumedTable";
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
    <div
      style={{ marginTop: "60px" }}
      className="w-full p-4 gap-2 flex flex-col"
    >
      <Card className="flex justify-center p-2">
        {!expensesQuery.isLoading && mappedExpensesByCategory.length > 0 && (
          <OneLevelChartPie data1={mappedExpensesByCategory} />
        )}
      </Card>
      <Card className="flex justify-center p-2">
        <ResumedTable />
      </Card>
    </div>
  );
};

export default DashBoardMobile;
