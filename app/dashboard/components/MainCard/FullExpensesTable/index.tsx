"use client";

import { TableWrapper } from "@/components/ui/Wrappers/TableWrapper";
import { queryKeys } from "@/constants/queryKeys";
import useExpenses from "@/hooks/useExpenses";
import { getBusinesses } from "@/server/businessActions";
import { deleteExpenses } from "@/server/expensesActions";
import { Expense, ExpensesQuery } from "@/types/expensesTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { columns } from "./columns";

const FullExpensesTable = () => {
  const { data: businesses } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  const expensesquery = useExpenses();

  const expenses = expensesquery.data?.data;

  const { mutate: deleteExpensesMutation, isPending } = useMutation({
    mutationFn: deleteExpenses,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setTimeout(() => expensesquery.refetch(), 1000);
    },
  });

  const handleDeleteExpenses = (data: Expense[]) => {
    const idsToDelete = data.map((expense) => expense.id);
    deleteExpensesMutation(idsToDelete);
  };

  if (!businesses || !expenses) return;
  return (
    <>
      <TableWrapper
        columns={columns(businesses)}
        data={expenses}
        isDeleting={isPending}
        onDelete={(data) => handleDeleteExpenses(data)}
      />
    </>
  );
};

export default FullExpensesTable;
