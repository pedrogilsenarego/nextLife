"use client";

import { TableWrapper } from "@/components/ui/Wrappers/TableWrapper";
import { queryKeys } from "@/constants/queryKeys";
import useExpenses from "@/hooks/useExpenses";
import { getBusinesses } from "@/server/businessActions";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";

const ResumedTable = () => {
  const businesses = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  const expenses = useExpenses();

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
