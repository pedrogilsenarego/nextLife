"use client";

import { TableWrapper } from "@/components/UI/Wrappers/TableWrapper";
import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { Expense } from "@/types/expensesTypes";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";

type Props = {
  data: Expense[];
};

const General = ({ data }: Props) => {
  const { data: businesses } = useQuery({
    queryKey: [queryKeys.businesses],
    queryFn: getBusinesses,
  });
  if (!businesses) return;
  return (
    <>
      <TableWrapper columns={columns(businesses)} data={data} />
    </>
  );
};

export default General;
