"use client";

import InputForm from "@/components/ui/Wrappers/InputForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useLoginForm from "./useSignupForm";

const SignupForm = () => {
  const { form, onSubmit, isPending } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <InputForm
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
        <InputForm
          type="password"
          label={"Confirm Password"}
          name="confirmPassword"
          control={form.control}
          placeholder="Confirm Your Password"
        />
        <InputForm
          label={"Username"}
          name="username"
          control={form.control}
          placeholder="Your Username"
        />

        <Button isLoading={isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
