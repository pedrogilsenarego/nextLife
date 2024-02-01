"use client";

import InputForm from "@/components/UI/Wrappers/InputForm";
import SelectForm from "@/components/UI/Wrappers/SelectForm";
import TextAreaForm from "@/components/UI/Wrappers/TextAreaForm";
import { Form } from "@/components/UI/form";
import { Button } from "@/components/ui/button";
import { defaultCategories } from "@/constants/defaultCategories";
import useIncomeForm from "./useIncomeForm";
type Props = {
  setOpen: (open: boolean) => void;
};
const IncomeForm = ({ setOpen }: Props) => {
  const { businessIdOptions, form, onSubmit, isPending } = useIncomeForm({
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
          description="Category of the income"
          control={form.control}
          options={defaultCategories}
        />
        <InputForm
          type="number"
          label={"Amount"}
          name="amount"
          control={form.control}
          placeholder="Amount of the income"
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

export default IncomeForm;
