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
import DrawerWrapperRight from "@/components/ui/Wrappers/DrawerWrapperRight";

const DashBoardMobile = () => {
  const [openBusiness, setOpenBusiness] = useState(false);
  const { expensesByCategory, expensesQuery, expensesByBusiness } =
    useMonthExpenses();
  const { incomesByBusiness } = useMonthIncomes();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [drawerSelected, setDrawerSelected] = useState<string | null>(null);

  const { businesses: businessesQuery } = useBusinesses();
  const dataContext = useData();
  const { user } = useUser();
  const businessSelected = dataContext.state.currentBusiness;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
    <>
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
        <Carousel setApi={setApi} className="w-full max-w-xs">
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

        <div style={{ gap: "18px" }} className="flex flex-col ">
          {cards()?.map((expenses: any, index: number) => {
            return (
              <div
                onClick={() => {
                  setOpenBusiness(true);
                  setDrawerSelected(expenses.businessId);
                }}
              >
                <BusinessCard
                  key={index}
                  balance={expenses.balance}
                  title={expenses.businessName}
                  type={
                    defaultBusiness.find(
                      (business) =>
                        parseInt(business.value) === expenses.businessType
                    )?.label || ""
                  }
                />
              </div>
            );
          })}
          <AddBusinessCard />
        </div>
        {typeBusiness === 1 && <InfoTable />}
        <div className="mt-4">
          <ResumedTable />
        </div>
      </div>
      <DrawerWrapperRight open={openBusiness} setOpen={setOpenBusiness}>
        {drawerSelected}
      </DrawerWrapperRight>
    </>
  );
};

export default DashBoardMobile;
