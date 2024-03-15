"use client";

import InputForm from "@/components/ui/Wrappers/InputForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useLoginForm from "./useRecoverForm";

const RecoverForm = () => {
  const { form, onSubmit, isPending } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <InputForm
          className="w-full"
          label={"Email"}
          name="email"
          control={form.control}
          placeholder="Your email"
        />

        <Button isLoading={isPending} type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RecoverForm;
