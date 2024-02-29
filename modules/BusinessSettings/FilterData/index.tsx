"use client";
import { updateSettingsBalanceState } from "@/clientActions/businessActions";
import SwitchForm from "@/components/ui/Wrappers/SwitchForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { H2 } from "@/components/ui/h2";
import useBusinesses from "@/hooks/useBusinesses";
import useScreenSize from "@/hooks/useScreenSize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TotalSettings, totalSettingsSchema } from "./validation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const BusinessForm = () => {
  const isSmallScreen = useScreenSize();
  const businesses = useBusinesses();
  const { toast } = useToast();

  const form = useForm<TotalSettings>({
    resolver: zodResolver(totalSettingsSchema),
  });

  const { mutate: updateBalanceStatus, isPending } = useMutation({
    mutationFn: updateSettingsBalanceState,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Settings updated",
      });
    },
    onSettled: async () => {},
  });

  function onSubmit(data: TotalSettings) {
    const arr = Object.entries(data.balances).map(([id, status]) => ({
      id,
      status,
    }));
    updateBalanceStatus({ arr });
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
                const balanceId = `balances.${business.id}`;
                return (
                  <SwitchForm
                    key={business.id}
                    defaultValue={business.settings?.filters.balanceStatus}
                    control={form.control}
                    name={balanceId}
                    label={business.businessName}
                  />
                );
              })}{" "}
            </div>
            <Button type="submit" isLoading={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default BusinessForm;
