import InfoTable from "@/app/[slug]/components/MainMetrics/InfoTable";
import ResumedTable from "@/app/[slug]/components/MainMetrics/ResumedTable";
import { useData } from "@/app/[slug]/components/dashboard.provider";
import OneLevelChartPie from "@/components/ChartComponents/OneLevelChartPie";
import useBusinesses from "@/hooks/useBusinesses";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useUser from "@/hooks/useUser";
import TimeRangeSelectModal from "@/components/LayoutComponents/HeaderMobile/RangeTimeSelectModal";
import Balance from "./Balance";
import BusinessCard from "./BusinessCard";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import { useEffect, useState } from "react";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import Chart from "@/app/[slug]/components/MainCard/Chart";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AddBusinessCard from "./AddBusinessCard";
import useMetrics from "@/hooks/useMetrics";

const DashBoardMobile = () => {
  const { expensesByCategory, expensesQuery } = useMonthExpenses();
  const { cards } = useMetrics();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const { user } = useUser();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const mappedExpensesByCategory =
    expensesByCategory?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];

  return (
    <>
      <div
        style={{ marginBottom: "100px" }}
        className="w-full p-4  flex flex-col"
      >
        <p className="text-xl">
          Hello, <b>{user?.username}</b>
        </p>
        <div className="flex w-full justify-between">
          <Balance cards={cards()} />
          <div className="flex items-end">
            <TimeRangeSelectModal />
          </div>
        </div>
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            <CarouselItem>
              {!expensesQuery.isLoading &&
              mappedExpensesByCategory.length > 0 ? (
                <OneLevelChartPie data1={mappedExpensesByCategory} />
              ) : (
                <div style={{ height: "30px" }} />
              )}
            </CarouselItem>
            <CarouselItem>
              <Chart />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        {mappedExpensesByCategory.length > 0 && (
          <div
            style={{ marginTop: "-15px", marginBottom: "30px" }}
            className="flex w-full justify-center gap-2"
          >
            <div
              className="bg-primary"
              style={{
                height: "6px",
                width: "6px",
                borderRadius: "50%",
                opacity: current === 0 ? 1 : 0.5,
              }}
            />
            <div
              className="bg-primary"
              style={{
                height: "6px",
                width: "6px",
                borderRadius: "50%",
                opacity: current === 1 ? 1 : 0.5,
              }}
            />
          </div>
        )}

        <div style={{ gap: "18px" }} className="flex flex-col ">
          {cards()?.map((card: any, index: number) => {
            return <BusinessCard key={index} card={card} />;
          })}
          {cards()?.length === 0 && (
            <div
              style={{
                padding: "60px 0px 0px 0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p style={{ color: "grey" }} className="text-center text-md py-4">
                This app uses businesses has any activity. Start by adding a new
                business! For example add a Business named General and type
                Default
              </p>
            </div>
          )}
          <AddBusinessCard />
        </div>

        <div className="mt-4">
          <ResumedTable />
        </div>
      </div>
    </>
  );
};

export default DashBoardMobile;
