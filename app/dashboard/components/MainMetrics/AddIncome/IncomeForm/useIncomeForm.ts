"use client";

import { defaultIncomesCategories } from "@/constants/defaultCategories";
import { TIMOUT_FOR_REFETCH } from "@/constants/network";
import { queryKeys } from "@/constants/queryKeys";
import { useAppSelector } from "@/hooks/slicer.hooks";
import useBusinesses from "@/hooks/useBusinesses";
import useIncomes from "@/hooks/useIncomes";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import useUser from "@/hooks/useUser";
import { getBusinesses } from "@/server/businessActions";
import { addIncome } from "@/server/incomeActions";
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
  const business = useBusinesses();
  const { incomesQuery } = useIncomes();
  const { incomesQuery: incomeMonthQuery } = useMonthIncomes();
  const businessId = useAppSelector<string>(
    (state) => state.DataSlice.business
  );
  const user = useUser();
  const form = useForm<z.infer<typeof addIncomeSchema>>({
    resolver: zodResolver(addIncomeSchema),
    defaultValues: {
      businessId,
      created_at: new Date(),
    },
  });
  const { mutate: addIncomeMutation, isPending } = useMutation({
    mutationFn: addIncome,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setTimeout(() => {
        incomesQuery.refetch();
        incomeMonthQuery.refetch();
      }, TIMOUT_FOR_REFETCH);
    },
    onSettled: async () => {
      setOpen(false);
      form.reset();
    },
  });

  const userCategories =
    user.user?.incomesCategories?.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    })) || [];

  const categoriesOptions = [...userCategories, ...defaultIncomesCategories];

  function onSubmit(data: AddExpense) {
    const transformedData: AddExpense = {
      ...data,
      amount: Number(data.amount.toFixed(2)),
    };
    addIncomeMutation(transformedData);
  }
  const businessIdOptions =
    business.data?.map(({ businessName, id }) => ({
      label: businessName,
      value: id,
    })) || [];

  return { businessIdOptions, form, onSubmit, isPending, categoriesOptions };
};

export default useIncomeForm;
