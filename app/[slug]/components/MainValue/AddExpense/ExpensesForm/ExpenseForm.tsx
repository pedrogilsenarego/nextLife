"use client";

import DatePickerForm from "@/components/ui/Wrappers/DatePickerForm";
import InputForm from "@/components/ui/Wrappers/InputForm";
import SelectForm from "@/components/ui/Wrappers/SelectForm";
import TextAreaForm from "@/components/ui/Wrappers/TextAreaForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import AddCategory from "../../AddCategory";
import useExpensesForm from "./useExpensesForm";
import useScreenSize from "@/hooks/useScreenSize";
type Props = {
  setOpen: (open: boolean) => void;
};
const BusinessForm = ({ setOpen }: Props) => {
  const { businessIdOptions, form, onSubmit, isPending, categoriesOptions } =
    useExpensesForm({
      setOpen,
    });
  const { isSmallScreen } = useScreenSize();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <SelectForm
          label="Business"
          name="businessId"
          description={
            isSmallScreen ? undefined : "The business that will be associated"
          }
          control={form.control}
          options={businessIdOptions}
        />
        <div
          className={
            isSmallScreen
              ? "flex w-full gap-2 items-end"
              : "flex w-full gap-2 items-center"
          }
        >
          <div className="w-full">
            <SelectForm
              label="Category"
              name="category"
              description={
                isSmallScreen ? undefined : "Category of the expense"
              }
              control={form.control}
              options={categoriesOptions}
            />
          </div>
          <div>
            <AddCategory configuration="expense" />
          </div>
        </div>
        <DatePickerForm
          className="w-full"
          label="Date"
          name="created_at"
          control={form.control}
        />
        <InputForm
          className="w-full"
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
        <Button className="w-full" isLoading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default BusinessForm;
