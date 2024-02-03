"use client";

import { TIMOUT_FOR_REFETCH } from "@/constants/network";
import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import {
  addIncome,
  getAllIncomesForCurrentMonth,
} from "@/server/incomeActions";
import { AddExpense } from "@/zodSchema/addExpense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addIncomeSchema } from "./validation";
type Props = {
  setOpen: (open: boolean) => void;
};

const useIncomeForm = ({ setOpen }: Props) => {
  const { data } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  const { refetch: refetchIncome } = useQuery({
    queryKey: [queryKeys.incomes],
    queryFn: getAllIncomesForCurrentMonth,
  });
  const form = useForm<z.infer<typeof addIncomeSchema>>({
    resolver: zodResolver(addIncomeSchema),
  });
  const { mutate: addIncomeMutation, isPending } = useMutation({
    mutationFn: addIncome,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setTimeout(() => refetchIncome(), TIMOUT_FOR_REFETCH);
    },
    onSettled: async () => {
      setOpen(false);
      form.reset();
    },
  });

  function onSubmit(data: AddExpense) {
    addIncomeMutation(data);
  }
  const businessIdOptions =
    data?.map(({ businessName, id }) => ({ label: businessName, value: id })) ||
    [];

  return { businessIdOptions, form, onSubmit, isPending };
};

export default useIncomeForm;
