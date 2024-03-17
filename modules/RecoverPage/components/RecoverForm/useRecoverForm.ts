"use client";

import { recoverPassword, signinUser } from "@/clientActions/userAction";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RecoverPwd, recoverPwdSchema } from "./validation";
import { ROUTE_PATHS } from "@/constants/routes";

const useRecoverForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<RecoverPwd>({
    resolver: zodResolver(recoverPwdSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: recoverPassword,
    onError: (data: string) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    },
    onSuccess: (data: any) => {
      toast({
        variant: "default",
        title: "Check your email",
        description: data,
      });
      form.reset();
    },
  });

  function onSubmit(data: RecoverPwd) {
    loginMutation(data);
  }

  return { form, onSubmit, isPending };
};

export default useRecoverForm;
