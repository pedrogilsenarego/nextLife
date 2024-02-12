"use client";

import { signinUser, signupUser } from "@/clientActions/userAction";
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
  });

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: signupUser,
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
        title: "User created with success",
        description: data,
      });
      router.push(ROUTE_PATHS.LOGIN);

      form.reset();
    },
  });

  function onSubmit(data: Signup) {
    signupMutation(data);
  }

  return { form, onSubmit, isPending };
};

export default useSignupForm;
