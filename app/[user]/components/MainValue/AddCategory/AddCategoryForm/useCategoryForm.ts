"use client";

import { TIMOUT_FOR_REFETCH } from "@/constants/network";
import useUser from "@/hooks/useUser";
import { addExpense } from "@/server/expensesActions";
import { addCategory } from "@/server/userAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { AddCategory, addCategorySchema } from "./validation";
type Props = {
  setOpen: (open: boolean) => void;
  configuration: "expense" | "income";
};

const useCategoryForm = ({ setOpen, configuration }: Props) => {
  const form = useForm<AddCategory>({
    resolver: zodResolver(addCategorySchema(configuration)),
  });
  const { userQuery } = useUser();
  const { mutate: addCategoryMutation, isPending } = useMutation({
    mutationFn: addCategory,
    onError: (error: any) => {
      form.setError("category", { message: error.message });
    },
    onSuccess: (data: any) => {
      setTimeout(() => {
        userQuery.refetch();
      }, TIMOUT_FOR_REFETCH);
      setOpen(false);
      form.reset();
    },
    onSettled: async (data: any) => {},
  });

  function onSubmit(data: AddCategory) {
    addCategoryMutation({ categoryName: data.category, type: configuration });
  }

  return { form, onSubmit, isPending };
};

export default useCategoryForm;