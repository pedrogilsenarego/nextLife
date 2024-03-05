import InfoTable from "@/app/[slug]/components/MainMetrics/InfoTable";
import ResumedTable from "@/app/[slug]/components/MainMetrics/ResumedTable";
import { useData } from "@/app/[slug]/components/dashboard.provider";
import OneLevelChartPie from "@/components/ChartComponents/OneLevelChartPie";
import { Card } from "@/components/ui/card";
import useBusinesses from "@/hooks/useBusinesses";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import useUser from "@/hooks/useUser";
import SlotCounter from "react-slot-counter";
import "./index.css";
import { Button } from "@/components/ui/button";
import TimeRangeSelectModal from "@/components/LayoutComponents/HeaderMobile/RangeTimeSelectModal";

const DashBoardMobile = () => {
  const { expensesByCategory, expensesQuery, totalExpenses } =
    useMonthExpenses();
  const { totalIncomes } = useMonthIncomes();
  const { businesses: businessesQuery } = useBusinesses();
  const dataContext = useData();

  const { user } = useUser();
  const businessSelected = dataContext.state.currentBusiness;

  const mappedExpensesByCategory =
    expensesByCategory?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];
  const businessSelectedData = businessesQuery?.data?.find(
    (business) => business.id === businessSelected
  );
  const typeBusiness = businessSelectedData?.type;
  return (
    <div style={{ marginTop: "60px" }} className="w-full p-4  flex flex-col">
      <p className="text-xl">
        Hello, <b>{user?.username}</b>
      </p>
      <div className="flex w-full justify-between">
        <div className="flex flex-col gap-0.5">
          <p className="text-sm">Your balance</p>
          <div className="flex items-center">
            <SlotCounter
              separatorClassName="slot2"
              charClassName="slot2"
              value={(
                Number(totalIncomes || 0) - Number(totalExpenses || 0)
              ).toFixed(1)}
            />
            <p style={{ fontSize: "20px", lineHeight: "20px" }}>€</p>
          </div>
        </div>
        <div className="flex items-end">
          <TimeRangeSelectModal />
        </div>
      </div>
      {!expensesQuery.isLoading && mappedExpensesByCategory.length > 0 && (
        <OneLevelChartPie data1={mappedExpensesByCategory} />
      )}

      {typeBusiness === 1 && <InfoTable />}
      <Card className="flex justify-center p-2">
        <ResumedTable />
      </Card>
    </div>
  );
};

export default DashBoardMobile;
