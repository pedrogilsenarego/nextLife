"use client";

import { defaultIncomesCategories } from "@/constants/defaultCategories";
import { TIMOUT_FOR_REFETCH } from "@/constants/network";

import { getBusinesses } from "@/clientActions/businessActions";
import { addIncome } from "@/clientActions/incomeActions";
import useBusinesses from "@/hooks/useBusinesses";
import useIncomes from "@/hooks/useIncomes";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import useUser from "@/hooks/useUser";
import { AddExpense } from "@/zodSchema/addExpense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useData } from "../../../dashboard.provider";
import { addIncomeSchema } from "./validation";
type Props = {
  setOpen: (open: boolean) => void;
};

const useIncomeForm = ({ setOpen }: Props) => {
  const business = useBusinesses();
  const { incomesQuery } = useIncomes();
  const dataContext = useData();
  const { incomesQuery: incomeMonthQuery } = useMonthIncomes();
  const businessId = dataContext.state.currentBusiness;
  const user = useUser();
  const form = useForm<z.infer<typeof addIncomeSchema>>({
    resolver: zodResolver(addIncomeSchema),
    defaultValues: {
      businessId: businessId !== "total" ? businessId : undefined,
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
