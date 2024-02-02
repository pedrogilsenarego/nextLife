"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import {
  addExpense,
  getAllExpensesForCurrentMonth,
} from "@/server/expensesActions";
import { AddExpense, addExpenseSchema } from "@/zodSchema/addExpense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
type Props = {
  setOpen: (open: boolean) => void;
};

const useExpensesForm = ({ setOpen }: Props) => {
  const { data } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  const { refetch: refetchExpenses } = useQuery({
    queryKey: [queryKeys.expenses],
    queryFn: getAllExpensesForCurrentMonth,
  });
  const form = useForm<z.infer<typeof addExpenseSchema>>({
    resolver: zodResolver(addExpenseSchema),
  });
  const { mutate: addExpenseMutation, isPending } = useMutation({
    mutationFn: addExpense,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setTimeout(() => refetchExpenses(), 500);
    },
    onSettled: async (data: any) => {
      setOpen(false);
      form.reset();
    },
  });

  function onSubmit(data: AddExpense) {
    addExpenseMutation(data);
  }
  const businessIdOptions =
    data?.map(({ businessName, id }) => ({ label: businessName, value: id })) ||
    [];

  return { businessIdOptions, form, onSubmit, isPending };
};

export default useExpensesForm;
