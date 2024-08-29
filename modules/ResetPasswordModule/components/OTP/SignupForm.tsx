"use client";

import InputForm from "@/components/ui/Wrappers/InputForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useLoginForm from "./useSignupForm";

const OTP = () => {
  const { form, onSubmit, isPending } = useLoginForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <InputForm
          id="otp"
          label={"Otp"}
          name="otp"
          control={form.control}
          placeholder="Your Otp"
        />
        <InputForm
          id="email"
          label={"Email"}
          name="email"
          control={form.control}
          placeholder="Confirm Your Email"
        />

        <Button isLoading={isPending} type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default OTP;
