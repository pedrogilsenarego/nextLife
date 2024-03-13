"use client";

import { TableWrapper } from "@/components/ui/Wrappers/TableWrapper";
import useBusinesses from "@/hooks/useBusinesses";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import { columns } from "./columns";

type Props = {
  business: string;
};

const ResumedTable = ({ business }: Props) => {
  const { businesses } = useBusinesses();
  const { getExpensesByCategoryFiltered } = useMonthExpenses();

  const mappedExpensesByCategory =
    getExpensesByCategoryFiltered(business)?.map((expenses) => {
      return { value: Math.round(expenses.amount), name: expenses.category };
    }) || [];

  mappedExpensesByCategory.sort((a, b) => b.value - a.value);

  if (!businesses.data) return;
  return (
    <div className="w-full min-w-6">
      <TableWrapper
        columns={columns(businesses.data)}
        data={mappedExpensesByCategory}
      />
    </div>
  );
};

export default ResumedTable;
