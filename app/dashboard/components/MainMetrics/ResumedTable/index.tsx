"use client";

import { TableWrapper } from "@/components/ui/Wrappers/TableWrapper";
import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { getAllExpensesForCurrentMonth } from "@/server/expensesActions";
import { ExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";

const ResumedTable = () => {
  const businesses = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  const expenses = useQuery<ExpensesQuery>({
    queryKey: [queryKeys.expenses],
    queryFn: getAllExpensesForCurrentMonth,
  });

  if (!businesses.data || !expenses.data?.metaData.byCategory) return;
  return (
    <div className="w-full min-w-8">
      <TableWrapper
        columns={columns(businesses.data)}
        data={expenses.data?.metaData.byCategory}
      />
    </div>
  );
};

export default ResumedTable;
