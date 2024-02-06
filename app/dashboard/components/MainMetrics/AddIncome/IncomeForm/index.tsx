"use client";

import DatePickerForm from "@/components/ui/Wrappers/DatePickerForm";
import InputForm from "@/components/ui/Wrappers/InputForm";
import SelectForm from "@/components/ui/Wrappers/SelectForm";
import TextAreaForm from "@/components/ui/Wrappers/TextAreaForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AddCategory from "../../AddCategory";
import useIncomeForm from "./useIncomeForm";
type Props = {
  setOpen: (open: boolean) => void;
};
const IncomeForm = ({ setOpen }: Props) => {
  const { businessIdOptions, form, onSubmit, isPending, categoriesOptions } =
    useIncomeForm({
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
        <div className="flex gap-2">
          <SelectForm
            label="Category"
            name="category"
            description="Category of the income"
            control={form.control}
            options={categoriesOptions}
          />
          <div style={{ marginTop: "30px" }}>
            <AddCategory configuration="income" />
          </div>
        </div>
        <DatePickerForm label="Date" name="created_at" control={form.control} />
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
