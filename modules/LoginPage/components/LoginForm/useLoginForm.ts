"use client";

import { signinUser } from "@/clientActions/userAction";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Login, loginSchema } from "./validation";

const useLoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<Login>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: signinUser,
    onError: (data: string) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: data,
      });
      
    },
    onSuccess: (data: any) => {
      router.push(`/${data}`);

      form.reset();
    },
  });

  function onSubmit(data: Login) {
    loginMutation(data);
  }

  return { form, onSubmit, isPending };
};

export default useLoginForm;
