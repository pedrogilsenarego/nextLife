"use client";

import { loginWithOtp, updatePassword } from "@/clientActions/userAction";
import { useToast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { Signup, signupSchema } from "./validation";

const useSignupForm = () => {
  const { toast } = useToast();

  const form = useForm<Signup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      otp: "",
      email: "",
    },
  });

  const { mutate: updatePasswordMutation, isPending } = useMutation({
    mutationFn: loginWithOtp,
    onError: (data: string) => {
      console.log(data);
      // toast({
      //   variant: "destructive",
      //   title: "Uh oh! Something went wrong.",
      //   description: data,
      // });
    },
    onSuccess: (data: any) => {
      toast({
        variant: "default",
        title: "Password reseted with success",
        description: data,
      });

      form.reset();
    },
  });

  function onSubmit(data: Signup) {
    updatePasswordMutation({ email: data.email, otp: data.otp });
  }

  return { form, onSubmit, isPending };
};

export default useSignupForm;
