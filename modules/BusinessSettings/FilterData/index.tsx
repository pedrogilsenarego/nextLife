"use client";
import {
  addBusiness,
  getBusinesses,
  updateSettingsBalanceState,
} from "@/clientActions/businessActions";
import InputForm from "@/components/ui/Wrappers/InputForm";
import SelectForm from "@/components/ui/Wrappers/SelectForm";
import SwitchForm from "@/components/ui/Wrappers/SwitchForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { H2 } from "@/components/ui/h2";
import { P } from "@/components/ui/p";
import { defaultBusiness } from "@/constants/defaultBusinesses";
import useBusinesses from "@/hooks/useBusinesses";
import useScreenSize from "@/hooks/useScreenSize";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TotalSettings, totalSettingsSchema } from "./validation";

const BusinessForm = () => {
  const isSmallScreen = useScreenSize();
  const businesses = useBusinesses();

  const form = useForm<TotalSettings>({
    resolver: zodResolver(totalSettingsSchema),
  });

  function onSubmit(data: TotalSettings) {
    console.log(data);
    // if (businesses?.data && businesses.data.length > 0) {
    //   const businessId = businesses.data[0].id;
    //   updateSettingsBalanceState({ businessId, status: false });
    // } else {
    //   console.error("No business data available");
    // }
  }

  return (
    <div className="flex flex-col gap-2">
      <H2>Filter Data</H2>
      <Card className="w-full p-3" style={{ minWidth: "400px" }}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-2 flex-col"
          >
            <div className="flex flex-col rounded-lg border shadow p-4 gap-2">
              <div className="border-b">
                <FormLabel className="text-md">Show only Balance</FormLabel>
                <FormDescription>
                  Show in total only the balance between incomes and expenses
                </FormDescription>
              </div>
              {businesses.data?.map((business) => {
                const balanceName = `balances.${business.businessName}`;
                return (
                  <SwitchForm
                    key={business.id}
                    defaultValue={business.settings?.filters.balanceStatus}
                    control={form.control}
                    name={balanceName}
                    label={business.businessName}
                  />
                );
              })}{" "}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default BusinessForm;
