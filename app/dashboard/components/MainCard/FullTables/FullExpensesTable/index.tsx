"use client";

import { TableWrapper } from "@/components/ui/Wrappers/TableWrapper";
import { TIMOUT_FOR_REFETCH } from "@/constants/network";
import { useAppSelector } from "@/hooks/slicer.hooks";
import useBusinesses from "@/hooks/useBusinesses";
import useExpenses from "@/hooks/useExpenses";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import { deleteExpenses } from "@/server/expensesActions";
import { Expense } from "@/types/expensesTypes";
import { useMutation } from "@tanstack/react-query";
import { columns } from "./columns";

const FullExpensesTable = () => {
  const businessesQuery = useBusinesses();
  const { expensesQuery, expenses } = useExpenses();
  const { expensesQuery: monthExpensesQuery } = useMonthExpenses();
  const businesses = businessesQuery.data;

  const { mutate: deleteExpensesMutation, isPending } = useMutation({
    mutationFn: deleteExpenses,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setTimeout(() => {
        expensesQuery.refetch();
        monthExpensesQuery.refetch();
      }, TIMOUT_FOR_REFETCH);
    },
  });

  const handleDeleteExpenses = (data: Expense[]) => {
    deleteExpensesMutation(data);
  };

  if (!businesses || !expenses) return;
  return (
    <>
      <TableWrapper
        pagination
        title={"Expenses"}
        columns={columns(businesses)}
        data={expenses}
        isDeleting={isPending}
        onDelete={(data) => handleDeleteExpenses(data)}
      />
    </>
  );
};

export default FullExpensesTable;
