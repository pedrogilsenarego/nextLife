"use client";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/button";
import { queryKeys } from "@/constants/queryKeys";
import { addBusiness, getBusinesses } from "@/server/businessActions";
import { addExpense } from "@/server/expensesActions";
import { AddBusiness, addBusinessSchema } from "@/zodSchema/addBusiness";
import { AddExpense, addExpenseSchema } from "@/zodSchema/addExpense";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
type Props = {
  setOpen: (open: boolean) => void;
};
const BusinessForm = ({ setOpen }: Props) => {
  const { handleSubmit, control, reset } = useForm<AddExpense>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      amount: 50,
      category: "33694fe1-d07f-4771-8d92-00eec95db916",
      businessId: "ec39798a-fcb9-43e3-862b-1bd663955bb6",
      note: "teste",
    },
  });

  const { data } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  const { mutate: addExpenseMutation, isPending } = useMutation({
    mutationFn: addExpense,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {},
    onSettled: async () => {
      setOpen(false);
      reset();
    },
  });

  function onSubmit(data: AddExpense) {
    addExpenseMutation(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 flex-col">
      <Input placeholder="Category" name="category" control={control} />
      <Input placeholder="BusinessId" name="businessId" control={control} />
      <Input placeholder="Amount" name="amount" control={control} />

      <Input placeholder="Note" name="note" control={control} />

      <Button isLoading={isPending} type="submit">
        Submit
      </Button>
    </form>
  );
};

export default BusinessForm;
