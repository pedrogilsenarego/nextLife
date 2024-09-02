"use client";

import { updatePassword } from "@/clientActions/userAction";
import { useToast } from "@/components/ui/use-toast";
import { ROUTE_PATHS } from "@/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Signup, signupSchema } from "./validation";

const useSignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<Signup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate: updatePasswordMutation, isPending } = useMutation({
    mutationFn: updatePassword,
    onError: (data: string) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: data,
      });
    },
    onSuccess: (data: any) => {
      toast({
        variant: "default",
        title: "Password reseted with success",
        description: "Welcome back",
      });
      router.push(ROUTE_PATHS.LOGIN);
    },
  });

  function onSubmit(data: Signup) {
    updatePasswordMutation({ password: data.password });
  }

  return { form, onSubmit, isPending };
};

export default useSignupForm;
