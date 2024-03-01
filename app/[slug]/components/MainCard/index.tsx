"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { H2 } from "@/components/ui/h2";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TIMOUT_FOR_REFETCH } from "@/constants/network";

import useBusinesses from "@/hooks/useBusinesses";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useData } from "../dashboard.provider";
import AddBusiness from "./AddBusiness/AddBusiness";
import Chart from "./Chart";
import { default as FullExpensesTable } from "./FullTables/FullExpensesTable";
import FullIncomeTable from "./FullTables/FullIncomeTable";
import { H3 } from "@/components/ui/h3";
import { P } from "@/components/ui/p";
import { defaultBusiness } from "@/constants/defaultBusinesses";

const MainCard = () => {
  const { businesses: businessesQuery } = useBusinesses();
  const dataContext = useData();
  const businessSelected = dataContext.state.currentBusiness;
  const user = useUser();
  const router = useRouter();
  const { expensesQuery } = useExpenses();
  const { incomesQuery } = useIncomes();
  const { expensesQuery: monthExpensesQuery } = useMonthExpenses();
  const { incomesQuery: monthIncomesQuery } = useMonthIncomes();
  const timeRange = dataContext.state.timeRange;

  if (!businessesQuery.data) return null;

  const handleClickTab = (tabValue: string) => {
    dataContext.setCurrentBusiness(tabValue);
  };

  const handleClickTabDate = (tabValue: string) => {
    dataContext.setTimeRange(tabValue);

    setTimeout(() => {
      expensesQuery.refetch();
      incomesQuery.refetch();
      monthExpensesQuery.refetch();
      monthIncomesQuery.refetch();
    }, TIMOUT_FOR_REFETCH);
  };

  const businessSelectedData = businessesQuery.data.find(
    (business) => business.id === businessSelected
  );

  const handleClickSettings = () => {
    router.push(
      `/${user?.userQuery?.data?.username}/${
        businessSelectedData?.businessName || "total"
      }`
    );
  };

  return (
    <>
      <Card
        style={{ boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.15)" }}
        className="w-full flex bg-white items-start p-3 rounded-md gap-4"
      >
        <AddBusiness />
        <div className="w-full ">
          <div className="flex gap-2">
            <Tabs
              defaultValue={businessSelected}
              className="w-full flex flex-col gap-4"
            >
              <TabsList className="flex justify-start">
                <TabsTrigger
                  value="total"
                  onClick={() => handleClickTab("total")}
                >
                  Total
                </TabsTrigger>
                {businessesQuery.data.map((business) => {
                  return (
                    <TabsTrigger
                      key={business.id}
                      value={business.id}
                      onClick={() => handleClickTab(business.id)}
                    >
                      {business.businessName}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
            <Tabs defaultValue={timeRange}>
              <TabsList className=" flex justify-between">
                <TabsTrigger
                  value="3years"
                  onClick={() => handleClickTabDate("3years")}
                >
                  Last 3 Year
                </TabsTrigger>
                <TabsTrigger
                  value="1year"
                  onClick={() => handleClickTabDate("1year")}
                >
                  Last Year
                </TabsTrigger>
                <TabsTrigger
                  value="6Months"
                  onClick={() => handleClickTabDate("6Months")}
                >
                  Last 6 Months
                </TabsTrigger>
                <TabsTrigger
                  value="currentMonth"
                  onClick={() => handleClickTabDate("currentMonth")}
                >
                  Current Month
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col gap-4 py-2 w-full">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 w-full justify-between">
                  <div className="flex gap-3 items-center">
                    <H3 className="capitalize">
                      {businessSelectedData?.businessName || ""}
                    </H3>
                    <P className="text-slate-400">
                      {defaultBusiness.find(
                        (business) =>
                          business.value ===
                          businessSelectedData?.type.toString()
                      )?.label || ""}
                    </P>
                  </div>
                  <Button variant="ghost" onClick={handleClickSettings}>
                    Settings
                  </Button>
                </div>
                <Card className="py-2">
                  <Chart />
                </Card>
              </div>
              <FullExpensesTable />
              <FullIncomeTable />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default MainCard;
