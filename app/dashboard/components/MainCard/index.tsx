"use client";

import { Card } from "@/components/UI/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { queryKeys } from "@/constants/queryKeys";
import { getAllExpensesForCurrentMonth } from "@/server/expensesActions";
import { useQuery } from "@tanstack/react-query";
import AddBusiness from "./AddBusiness/AddBusiness";
import useMainCard from "./useMainCard";

const MainCard = () => {
  const { businesses, expensesMonth } = useMainCard();

  if (!businesses || !expensesMonth) return null;

  console.log(expensesMonth);

  return (
    <>
      <Card className="w-full max-w-6xl flex bg-white items-center p-3 rounded-md gap-4">
        <AddBusiness />
        <Tabs defaultValue="general" className="w-[400px]">
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
          <TabsContent value="general">General stuff</TabsContent>
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
