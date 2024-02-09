"use client";

import { defaultCategories } from "@/constants/defaultCategories";
import { TIMOUT_FOR_REFETCH } from "@/constants/network";
import { queryKeys } from "@/constants/queryKeys";
import useExpenses from "@/hooks/useExpenses";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useUser from "@/hooks/useUser";
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
import { useData } from "../../../dashboard.provider";
type Props = {
  setOpen: (open: boolean) => void;
};

const useExpensesForm = ({ setOpen }: Props) => {
  const { data } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  const user = useUser();
  const dataContext = useData();
  const { expensesQuery } = useExpenses();
  const { expensesQuery: monthExpensesQuery } = useMonthExpenses();
  const businessId = dataContext.state.currentBusiness;
  const form = useForm<z.infer<typeof addExpenseSchema>>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      businessId,
      created_at: new Date(),
    },
  });
  const { mutate: addExpenseMutation, isPending } = useMutation({
    mutationFn: addExpense,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setTimeout(() => {
        expensesQuery.refetch();
        monthExpensesQuery.refetch();
      }, TIMOUT_FOR_REFETCH);
    },
    onSettled: async (data: any) => {
      setOpen(false);
      form.reset();
    },
  });
  const userCategories =
    user.user?.expensesCategories?.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    })) || [];

  const categoriesOptions = [...userCategories, ...defaultCategories];

  function onSubmit(data: AddExpense) {
    const transformedData: AddExpense = {
      ...data,
      amount: Number(data.amount.toFixed(2)),
    };

    addExpenseMutation(transformedData);
  }
  const businessIdOptions =
    data?.map(({ businessName, id }) => ({ label: businessName, value: id })) ||
    [];

  return { businessIdOptions, form, onSubmit, isPending, categoriesOptions };
};

export default useExpensesForm;
