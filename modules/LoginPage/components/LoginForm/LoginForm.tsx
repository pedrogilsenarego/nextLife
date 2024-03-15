"use client";

import InputForm from "@/components/ui/Wrappers/InputForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useLoginForm from "./useLoginForm";
import { useRouter } from "next/navigation";
import { ROUTE_PATHS } from "@/constants/routes";

const LoginForm = () => {
  const { form, onSubmit, isPending } = useLoginForm();
  const router = useRouter();
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
        <div className="flex flex-col gap-2">
          <InputForm
            type="password"
            label={"Password"}
            name="password"
            control={form.control}
            placeholder="Your Password"
          />
          <p
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
            className="text-xs "
            onClick={() => router.push(ROUTE_PATHS.RECOVER_PASSWORD)}
          >
            Recover Password
          </p>
        </div>

        <Button isLoading={isPending} type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
