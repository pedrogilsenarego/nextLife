import DrawerWrapperRight from "@/components/ui/Wrappers/DrawerWrapperRight";
import { Card } from "@/components/ui/card";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useExpenses from "@/hooks/useExpenses";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import moment from "moment";
import { useState } from "react";

type Props = {
  card: any;
};

const BusinessCard = ({ card }: Props) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const { expenses } = useExpenses();
  const dateFormatter = (date: Date) => {
    return moment(date).format("DD HH:MM");
  };
  const type =
    defaultBusiness.find(
      (business) => parseInt(business.value) === card.businessType
    )?.label || "";
  const expensesFiltered = expenses?.filter(
    (expense) => expense.businessId === card.businessId
  );
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
        <div className="p-3 w-full">
          <div className="flex flex-col items-center mt-2">
            <p className="capitalize font-bold text-md">{card?.businessName}</p>
            <p className="text-slate-500">{type}</p>
          </div>
          <div>
            {expensesFiltered?.slice(0, 10).map((expense) => {
              return (
                <div key={expense.id} className="flex justify-between">
                  <p>{dateFormatter(expense.created_at)}</p>
                  <p>{expense.category}</p>
                  <p>{expense.amount}€</p>
                </div>
              );
            })}
          </div>
        </div>
      </DrawerWrapperRight>
    </>
  );
};

export default BusinessCard;
