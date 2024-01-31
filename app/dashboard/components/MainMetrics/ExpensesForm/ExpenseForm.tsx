"use client";

import InputForm from "@/components/UI/Wrappers/InputForm";
import SelectForm from "@/components/UI/Wrappers/SelectForm";
import { Button } from "@/components/UI/button";
import { Form } from "@/components/UI/form";
import { defaultCategories } from "@/constants/defaultCategories";
import { addExpense } from "@/server/expensesActions";
import { AddExpense, addExpenseSchema } from "@/zodSchema/addExpense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useExpensesForm from "./useExpensesForm";
type Props = {
  setOpen: (open: boolean) => void;
};
const BusinessForm = ({ setOpen }: Props) => {
  const { businessIdOptions, form } = useExpensesForm();

  const { mutate: addExpenseMutation, isPending } = useMutation({
    mutationFn: addExpense,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {},
    onSettled: async () => {
      setOpen(false);
      form.reset();
    },
  });

  function onSubmit(data: AddExpense) {
    addExpenseMutation(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <SelectForm
          label="Business"
          name="businessId"
          description="The business that will be associated"
          control={form.control}
          options={businessIdOptions}
        />
        <SelectForm
          label="Category"
          name="category"
          description="Category of the expense"
          control={form.control}
          options={defaultCategories}
        />
        <InputForm
          label={"Amount"}
          name="amount"
          control={form.control}
          placeholder="Amount of the expense"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default BusinessForm;
