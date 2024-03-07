import InfoTable from "@/app/[slug]/components/MainMetrics/InfoTable";
import ResumedTable from "@/app/[slug]/components/MainMetrics/ResumedTable";
import { useData } from "@/app/[slug]/components/dashboard.provider";
import OneLevelChartPie from "@/components/ChartComponents/OneLevelChartPie";
import { Card } from "@/components/ui/card";
import useBusinesses from "@/hooks/useBusinesses";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useUser from "@/hooks/useUser";

import TimeRangeSelectModal from "@/components/LayoutComponents/HeaderMobile/RangeTimeSelectModal";
import Balance from "./Balance";
import BusinessCard from "./BusinessCard";
import { buildCards } from "./mapper";
import useIncomes from "@/hooks/useIncomes";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import { useEffect, useState } from "react";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import Chart from "@/app/[slug]/components/MainCard/Chart";
import { CarouselCard } from "@/components/ui/Wrappers/CarouselCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const DashBoardMobile = () => {
  const {
    expensesByCategory,
    expensesQuery,

    expensesByBusiness,
  } = useMonthExpenses();
  const { incomesByBusiness } = useMonthIncomes();

  const { businesses: businessesQuery } = useBusinesses();
  const dataContext = useData();
  const { user } = useUser();
  const businessSelected = dataContext.state.currentBusiness;

  const cards = () => {
    if (!businessesQuery.data) return [];
    const mapedData: any = businessesQuery?.data.map((business) => {
      const expense =
        expensesByBusiness?.find(
          (expense) => expense.businessId === business.id
        )?.amount || 0;

      const rawIncome =
        incomesByBusiness?.find((income) => income.businessId === business.id)
          ?.amount || 0;

      const iva = rawIncome * (business.type === 1 ? 0.23 : 0);

      const incomeAfterIva = rawIncome - iva;

      const irs = Math.max(
        (incomeAfterIva - expense) * (business.type === 1 ? 0.35 : 0),
        0
      );
      const irc = Math.max(
        (incomeAfterIva - expense) * (business.type === 1 ? 0.17 : 0),
        0
      );

      const income = incomeAfterIva - irs;

      return {
        businessType: business.type,
        businessId: business.id,
        businessName: business.businessName,
        income,
        expense,
        iva,
        irs,
        irc,
        balance: income - expense,
      };
    });
    return mapedData;
  };

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
        <Balance cards={cards()} />
        <div className="flex items-end">
          <TimeRangeSelectModal />
        </div>
      </div>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          <CarouselItem>
            {!expensesQuery.isLoading &&
              mappedExpensesByCategory.length > 0 && (
                <OneLevelChartPie data1={mappedExpensesByCategory} />
              )}
          </CarouselItem>
          <CarouselItem>
            <Chart />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div style={{ gap: "18px" }} className="flex flex-col ">
        {cards()?.map((expenses: any) => {
          return (
            <BusinessCard
              balance={expenses.balance}
              title={expenses.businessName}
              type={
                defaultBusiness.find(
                  (business) =>
                    parseInt(business.value) === expenses.businessType
                )?.label || ""
              }
            />
          );
        })}
      </div>
      {typeBusiness === 1 && <InfoTable />}
      <div className="mt-4">
        <ResumedTable />
      </div>
    </div>
  );
};

export default DashBoardMobile;
