"use client";

import { TableWrapper } from "@/components/ui/Wrappers/TableWrapper";
import { TIMOUT_FOR_REFETCH } from "@/constants/network";
import { useAppSelector } from "@/hooks/slicer.hooks";
import useBusinesses from "@/hooks/useBusinesses";
import useIncomes from "@/hooks/useIncomes";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import { deleteIncomes } from "@/server/incomeActions";
import { Income } from "@/types/incomesTypes";
import { useMutation } from "@tanstack/react-query";
import { columns } from "./columns";

const FullIncomeTable = () => {
  const businessesQuery = useBusinesses();
  const { incomes, incomesQuery } = useIncomes();
  const { incomesQuery: monthIncomesQuery } = useMonthIncomes();
  const businesses = businessesQuery.data;

  const { mutate: deleteIncomeMutation, isPending } = useMutation({
    mutationFn: deleteIncomes,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setTimeout(() => {
        incomesQuery.refetch();
        monthIncomesQuery.refetch();
      }, TIMOUT_FOR_REFETCH);
    },
  });

  const handleDeleteIncomes = (data: Income[]) => {
    deleteIncomeMutation(data);
  };

  if (!businesses || !incomes) return;

  return (
    <>
      <TableWrapper
        title={"Incomes"}
        columns={columns(businesses)}
        data={incomes}
        isDeleting={isPending}
        onDelete={(data) => handleDeleteIncomes(data)}
      />
    </>
  );
};

export default FullIncomeTable;
