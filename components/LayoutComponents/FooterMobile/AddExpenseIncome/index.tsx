"use client";
import BusinessForm from "@/app/[slug]/components/MainValue/AddExpense/ExpensesForm/ExpenseForm";
import IncomeForm from "@/app/[slug]/components/MainValue/AddIncome/IncomeForm";
import DrawerWrapper from "@/components/ui/Wrappers/DrawerWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusSquare } from "lucide-react";
import { useState } from "react";

const AddExpenseIncome = () => {
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <>
      <div onClick={() => setOpenAdd(true)} className="py-1 px-2">
        <PlusSquare className="text-primary" size={26} color="white" />
      </div>
      <DrawerWrapper open={openAdd} setOpen={setOpenAdd}>
        <div>
          <Tabs defaultValue={"expenses"} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="incomes">Incomes</TabsTrigger>
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
    </>
  );
};

export default AddExpenseIncome;
