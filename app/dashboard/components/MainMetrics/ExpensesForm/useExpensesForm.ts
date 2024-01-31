"use client";

import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { addExpenseSchema } from "@/zodSchema/addExpense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useExpensesForm = () => {
  const { data } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  const form = useForm<z.infer<typeof addExpenseSchema>>({
    resolver: zodResolver(addExpenseSchema),
  });
  const businessIdOptions =
    data?.map(({ businessName, id }) => ({ label: businessName, value: id })) ||
    [];

  return { businessIdOptions, form };
};

export default useExpensesForm;
