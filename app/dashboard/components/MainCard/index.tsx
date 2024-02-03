"use client";

import { Card } from "@/components/ui/card";
import { H3 } from "@/components/ui/h3";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddBusiness from "./AddBusiness/AddBusiness";
import {
  default as FullExpensesTable,
  default as General,
} from "./FullExpensesTable";
import FullIncomeTable from "./FullIncomeTable";
import useMainCard from "./useMainCard";

const MainCard = () => {
  const { businesses } = useMainCard();

  if (!businesses) return null;

  return (
    <>
      <Card
        style={{ boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.15)" }}
        className="w-full flex bg-white items-start p-3 rounded-md gap-4"
      >
        <AddBusiness />
        <Tabs defaultValue="total" className="w-full flex flex-col gap-4">
          <TabsList className="block">
            <TabsTrigger value="total">Total</TabsTrigger>
            {businesses.map((business) => {
              return (
                <TabsTrigger key={business.id} value={business.id}>
                  {business.businessName}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <TabsContent value="total" className="flex flex-col gap-6">
            <div className="flex gap-2 flex-col">
              <H3>Expenses</H3>
              <FullExpensesTable />
            </div>
            <div className="flex gap-2 flex-col">
              <H3>Incomes</H3>
              <FullIncomeTable />
            </div>
          </TabsContent>
          {businesses.map((business) => {
            return (
              <TabsContent key={business.id} value={business.id}>
                {business.businessName}
              </TabsContent>
            );
          })}
        </Tabs>
      </Card>
    </>
  );
};

export default MainCard;
