import InfoTable from "@/app/[slug]/components/MainMetrics/InfoTable";
import ResumedTable from "@/app/[slug]/components/MainMetrics/ResumedTable";
import { useData } from "@/app/[slug]/components/dashboard.provider";
import OneLevelChartPie from "@/components/ChartComponents/OneLevelChartPie";
import { Card } from "@/components/ui/card";
import useBusinesses from "@/hooks/useBusinesses";
import useMonthExpenses from "@/hooks/useMonthExpenses";

const DashBoardMobile = () => {
  const { expensesByCategory, expensesQuery } = useMonthExpenses();
  const { businesses: businessesQuery } = useBusinesses();
  const dataContext = useData();
  const businessSelected = dataContext.state.currentBusiness;
  const { state } = useData();
  const mappedExpensesByCategory =
    expensesByCategory?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];
  const businessSelectedData = businessesQuery?.data?.find(
    (business) => business.id === businessSelected
  );
  const typeBusiness = businessSelectedData?.type;
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
      {typeBusiness === 1 && <InfoTable />}
      <Card className="flex justify-center p-2">
        <ResumedTable />
      </Card>
    </div>
  );
};

export default DashBoardMobile;
