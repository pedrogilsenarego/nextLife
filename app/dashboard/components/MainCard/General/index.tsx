"use client";

import { TableWrapper } from "@/components/ui/Wrappers/TableWrapper";
import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { Expense, ExpensesQuery } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";

type Props = {
  data: ExpensesQuery;
};

const General = ({ data }: Props) => {
  const { data: businesses } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });

  if (!businesses || !data) return;
  return (
    <>
      <TableWrapper columns={columns(businesses)} data={data?.data} />
    </>
  );
};

export default General;
