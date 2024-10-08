"use client";

import InputForm from "@/components/ui/Wrappers/InputForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useLoginForm from "./useSignupForm";

const SignupForm = () => {
  const { form, onSubmit, isPending } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <InputForm
          id="password"
          type="password"
          label={"Password"}
          name="password"
          control={form.control}
          placeholder="Your Password"
          autoComplete="new-password"
        />
        <InputForm
          id="password"
          type="password"
          label={"Confirm Password"}
          name="confirmPassword"
          control={form.control}
          placeholder="Confirm Your Password"
          autoComplete="new-password"
        />

        <Button isLoading={isPending} type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
