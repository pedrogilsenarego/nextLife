import DrawerWrapperRight from "@/components/ui/Wrappers/DrawerWrapperRight";
import { Card } from "@/components/ui/card";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useExpenses from "@/hooks/useExpenses";
import { CrossCircledIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import moment from "moment";
import { useState } from "react";
import Item from "./Item";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import OneLevelChartPie from "@/components/ChartComponents/OneLevelChartPie";
import Chart from "./Chart";

type Props = {
  card: any;
};

const BusinessCard = ({ card }: Props) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { expenses } = useExpenses();
  const { getExpensesByCategoryFiltered, expensesQuery } = useMonthExpenses();

  const type =
    defaultBusiness.find(
      (business) => parseInt(business.value) === card.businessType
    )?.label || "";
  const expensesFiltered = expenses?.filter(
    (expense) => expense.businessId === card.businessId
  );

  const mappedExpensesByCategory =
    getExpensesByCategoryFiltered(card.businessId)?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];

  return (
    <>
      <Card
        onClick={() => setOpenDrawer(true)}
        className="p-3 rounded-none shadow-md flex justify-between"
      >
        <div>
          <p className="font-bold capitalize text-lg">{card?.businessName}</p>
          <p className="text-sm">{type}</p>
          <p style={{ color: "grey" }} className="text-xs mt-2">
            Available balance
          </p>
        </div>
        <div className="flex flex-col justify-between items-end ">
          <GitHubLogoIcon
            style={{ width: "30px", height: "30px", color: "orangered" }}
          />
          <p style={{ lineHeight: "16px" }} className="font-bold text-lg">
            {card?.balance.toFixed(1)} €
          </p>
        </div>
      </Card>
      <DrawerWrapperRight open={openDrawer} setOpen={setOpenDrawer}>
        <div
          style={{
            overflow: "scroll",
          }}
          className="p-3 w-full h-full"
        >
          <div className="flex flex-col items-center mt-2">
            <p className="capitalize font-bold text-md">{card?.businessName}</p>
            <p className="text-slate-500">{type}</p>
          </div>
          {!expensesQuery.isLoading && mappedExpensesByCategory.length > 0 && (
            <OneLevelChartPie data1={mappedExpensesByCategory} />
          )}
          <Chart business={card.businessId} />
          <div>
            {expensesFiltered?.slice(0, 10).map((expense) => {
              return <Item key={expense.id} expense={expense} />;
            })}
          </div>
        </div>
      </DrawerWrapperRight>
    </>
  );
};

export default BusinessCard;
