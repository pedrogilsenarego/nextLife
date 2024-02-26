"use client";

import { PlusSquare } from "lucide-react";
import useScreenSize from "@/hooks/useScreenSize";
import DrawerWrapper from "@/components/ui/Wrappers/DrawerWrapper";
import { useState } from "react";
import BusinessForm from "@/app/[slug]/components/MainValue/AddExpense/ExpensesForm/ExpenseForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncomeForm from "@/app/[slug]/components/MainValue/AddIncome/IncomeForm";

const FooterMobile = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [tab, setTab] = useState<"expenses" | "incomes">("expenses");

  return (
    <div
      style={{
        background:
          "linear-gradient(to top, rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0.8) 70%, rgba(255, 255, 255, 0.7) 100%)",
      }}
      className="
      flex justify-center fixed bottom-0 w-full bg-white  pb-10 border border-solid"
    >
      <div onClick={() => setOpenAdd(true)} className="py-1 px-2">
        <PlusSquare className="text-primary" size={26} />
      </div>
      <DrawerWrapper open={openAdd} setOpen={setOpenAdd}>
        <div>
          <Tabs defaultValue={"expenses"} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expenses" onClick={() => setTab("expenses")}>
                Expenses
              </TabsTrigger>
              <TabsTrigger value="incomes" onClick={() => setTab("incomes")}>
                Incomes
              </TabsTrigger>
            </TabsList>
            <TabsContent value="expenses" className="w-full">
              <BusinessForm setOpen={setOpenAdd} />
            </TabsContent>
            <TabsContent value="incomes">
              <IncomeForm setOpen={setOpenAdd} />
            </TabsContent>
          </Tabs>
        </div>
      </DrawerWrapper>
    </div>
  );
};

export default FooterMobile;
