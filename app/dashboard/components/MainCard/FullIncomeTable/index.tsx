"use client";

import { TableWrapper } from "@/components/ui/Wrappers/TableWrapper";
import { queryKeys } from "@/constants/queryKeys";
import useIncomes from "@/hooks/useIncomes";
import { getBusinesses } from "@/server/businessActions";
import { deleteIncomes } from "@/server/incomeActions";
import { Income } from "@/types/incomesTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { columns } from "./columns";

const FullIncomeTable = () => {
  const { data: businesses } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  const incomes = useIncomes();
  const { mutate: deleteIncomeMutation, isPending } = useMutation({
    mutationFn: deleteIncomes,
    onError: (error: any) => {
      console.log("error", error);
    },
    onSuccess: (data: any) => {
      setTimeout(() => incomes.refetch(), 1000);
    },
  });

  const handleDeleteIncomes = (data: Income[]) => {
    const idsToDelete = data.map((income) => income.id);
    deleteIncomeMutation(idsToDelete);
  };

  if (!businesses || !incomes.data?.data) return;
  return (
    <>
      <TableWrapper
        columns={columns(businesses)}
        data={incomes.data.data}
        isDeleting={isPending}
        onDelete={(data) => handleDeleteIncomes(data)}
      />
    </>
  );
};

export default FullIncomeTable;
