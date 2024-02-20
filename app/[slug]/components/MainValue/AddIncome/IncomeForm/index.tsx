"use client";

import DatePickerForm from "@/components/ui/Wrappers/DatePickerForm";
import InputForm from "@/components/ui/Wrappers/InputForm";
import SelectForm from "@/components/ui/Wrappers/SelectForm";
import TextAreaForm from "@/components/ui/Wrappers/TextAreaForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AddCategory from "../../AddCategory";
import useIncomeForm from "./useIncomeForm";
import useScreenSize from "@/hooks/useScreenSize";
type Props = {
  setOpen: (open: boolean) => void;
};
const IncomeForm = ({ setOpen }: Props) => {
  const { businessIdOptions, form, onSubmit, isPending, categoriesOptions } =
    useIncomeForm({
      setOpen,
    });
  const { isSmallScreen } = useScreenSize();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <SelectForm
          label="Business"
          name="businessId"
          description={
            isSmallScreen ? undefined : "The business that will be associated"
          }
          control={form.control}
          options={businessIdOptions}
        />
        <div className="flex w-full gap-2">
          <div className="w-full">
            <SelectForm
              label="Category"
              name="category"
              description={isSmallScreen ? undefined : "Category of the income"}
              control={form.control}
              options={categoriesOptions}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <AddCategory configuration="income" />
          </div>
        </div>
        <DatePickerForm
          className="w-full"
          label="Date"
          name="created_at"
          control={form.control}
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
        <Button className="w-full" isLoading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default IncomeForm;
