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
import { useState } from "react";
import { useData } from "../dashboard.provider";
import AddBusiness from "./AddBusiness/AddBusiness";
import Chart from "./Chart";
import { default as FullExpensesTable } from "./FullTables/FullExpensesTable";
import FullIncomeTable from "./FullTables/FullIncomeTable";

const MainCard = () => {
  const [fetchingDateRange, setFetchingDateRange] = useState(false);
  const businessesQuery = useBusinesses();
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

    setFetchingDateRange(true);
    setTimeout(() => {
      expensesQuery.refetch();
      incomesQuery.refetch();
      monthExpensesQuery.refetch();
      monthIncomesQuery.refetch();
      setFetchingDateRange(false);
    }, TIMOUT_FOR_REFETCH);
  };

  const businessName =
    businessesQuery.data.find((business) => business.id === businessSelected)
      ?.businessName || "";

  const handleClickSettings = () => {
    router.push(`/${user?.userQuery?.data?.username}/${businessName}`);
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
              {fetchingDateRange ? (
                <Button isLoading />
              ) : (
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
              )}
            </Tabs>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-col gap-2 py-2 w-full">
            <div className="flex gap-2">
              <H2 className="capitalize">{businessName}</H2>
              <Separator orientation="vertical" />
              <Button variant="ghost" onClick={handleClickSettings}>
                Settings
              </Button>
            </div>
            <div className="flex flex-col gap-6">
              <Card className="py-2">
                <Chart />
              </Card>

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
