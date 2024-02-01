"use client";

import { Card } from "@/components/UI/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import AddBusiness from "./AddBusiness/AddBusiness";
import General from "./General";
import useMainCard from "./useMainCard";

const MainCard = () => {
  const { businesses, expensesMonth, incomesMonth } = useMainCard();

  if (!businesses || !expensesMonth) return null;

  return (
    <>
      <Card className="w-full max-w-6xl flex bg-white items-start p-3 rounded-md gap-4">
        <AddBusiness />
        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            {businesses.map((business) => {
              return (
                <TabsTrigger key={business.id} value={business.id}>
                  {business.businessName}
                </TabsTrigger>
              );
            })}
          </TabsList>
          <TabsContent value="general">
            Expenses
            <General data={expensesMonth} />
            Incomes
            <General data={incomesMonth} />
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
