"use client";

import InputForm from "@/components/ui/Wrappers/InputForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useCategoryForm from "./useCategoryForm";
type Props = {
  setOpen: (open: boolean) => void;
  configuration: "expense" | "income";
};
const CategoryForm = ({ setOpen, configuration }: Props) => {
  const { form, onSubmit, isPending } = useCategoryForm({
    setOpen,
    configuration,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <InputForm
          label={"Category"}
          name="category"
          control={form.control}
          placeholder="New category"
        />

        <Button isLoading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
