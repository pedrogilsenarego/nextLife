import { useData } from "@/app/[slug]/components/dashboard.provider";
import DrawerWrapper from "@/components/ui/Wrappers/DrawerWrapper";
import { Button } from "@/components/ui/button";
import { TIMOUT_FOR_REFETCH } from "@/constants/network";

import useBusinesses from "@/hooks/useBusinesses";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const TimeRangeSelectModal = () => {
  const [openBusinessSelect, setOpenBusinessSelect] = useState<boolean>(false);

  const { expensesQuery } = useExpenses();
  const { incomesQuery } = useIncomes();
  const { expensesQuery: monthExpensesQuery } = useMonthExpenses();
  const { incomesQuery: monthIncomesQuery } = useMonthIncomes();
  const dataContext = useData();
  const timeRangeSelected = dataContext.state.timeRange;

  const handleClickTab = (tabValue: string) => {
    dataContext.setTimeRange(tabValue);

    setTimeout(() => {
      expensesQuery.refetch();
      incomesQuery.refetch();
      monthExpensesQuery.refetch();
      monthIncomesQuery.refetch();
    }, TIMOUT_FOR_REFETCH);
    setOpenBusinessSelect(false);
  };
  return (
    <>
      <div className="flex gap-3 items-center">
        <Button
          onClick={() => setOpenBusinessSelect(true)}
          size={"xs"}
          className="capitalize"
        >
          {timeRangeSelected || "currentMonth"}&nbsp;
          <CaretDownIcon />
        </Button>
      </div>
      <DrawerWrapper open={openBusinessSelect} setOpen={setOpenBusinessSelect}>
        <div className="gap-2 flex flex-col">
          <Button
            variant={
              timeRangeSelected === "currentMonth" || "" ? "default" : "outline"
            }
            className="w-full"
            value="currentMonth"
            onClick={() => handleClickTab("currentMonth")}
          >
            Current Month
          </Button>
          <Button
            variant={
              timeRangeSelected === "6Months" || "" ? "default" : "outline"
            }
            className="w-full"
            value="6Months"
            onClick={() => handleClickTab("6Months")}
          >
            Last 6 Months
          </Button>
          <Button
            variant={
              timeRangeSelected === "1year" || "" ? "default" : "outline"
            }
            className="w-full"
            value="1year"
            onClick={() => handleClickTab("1year")}
          >
            Last Year
          </Button>
          <Button
            variant={
              timeRangeSelected === "3year" || "" ? "default" : "outline"
            }
            className="w-full"
            value="3year"
            onClick={() => handleClickTab("3year")}
          >
            Last 3 Year
          </Button>
        </div>
      </DrawerWrapper>
    </>
  );
};

export default TimeRangeSelectModal;
