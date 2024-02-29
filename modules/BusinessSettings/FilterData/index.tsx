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
import { Form } from "@/components/ui/form";
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
    if (businesses?.data && businesses.data.length > 0) {
      const businessId = businesses.data[0].id;
      updateSettingsBalanceState({ businessId, status: false });
    } else {
      console.error("No business data available");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <H2>Filter Data</H2>
      <Card className="w-full p-3" style={{ minWidth: "400px" }}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-4 flex-col"
          >
            {businesses.data?.map((business) => {
              const balanceName = `balances.${business.businessName}`;
              return (
                <div key={business.id}>
                  <div className="flex items-center  mb-2">
                    <P className="capitalize font-bold">
                      {business.businessName}
                    </P>
                    <p className=" text-xs " style={{ color: "grey" }}>
                      &nbsp; &nbsp;
                      {defaultBusiness.find(
                        (business1) =>
                          business1.value === business?.type.toString()
                      )?.label || ""}
                    </p>
                  </div>
                  <div className="rounded-lg border shadow-sm">
                    <SwitchForm
                      control={form.control}
                      name={balanceName}
                      label={"Balance"}
                    />
                  </div>
                </div>
              );
            })}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default BusinessForm;
