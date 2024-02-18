"use client";

import InputForm from "@/components/ui/Wrappers/InputForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useLoginForm from "./useLoginForm";

const LoginForm = () => {
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
        <InputForm
          type="password"
          label={"Password"}
          name="password"
          control={form.control}
          placeholder="Your Password"
        />

        <Button isLoading={isPending} type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
