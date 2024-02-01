"use client";

import InputForm from "@/components/UI/Wrappers/InputForm";
import SelectForm from "@/components/UI/Wrappers/SelectForm";
import TextAreaForm from "@/components/UI/Wrappers/TextAreaForm";
import { Button } from "@/components/UI/button";
import { Form } from "@/components/UI/form";
import { defaultCategories } from "@/constants/defaultCategories";
import useExpensesForm from "./useExpensesForm";
type Props = {
  setOpen: (open: boolean) => void;
};
const BusinessForm = ({ setOpen }: Props) => {
  const { businessIdOptions, form, onSubmit, isPending } = useExpensesForm({
    setOpen,
  });

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
          type="number"
          label={"Amount"}
          name="amount"
          control={form.control}
          placeholder="Amount of the expense"
        />
        <TextAreaForm
          label={"Note"}
          name="note"
          control={form.control}
          placeholder="You can add a note if you want ..."
        />
        <Button isLoading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BusinessForm;
