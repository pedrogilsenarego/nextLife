"use client";

import { TableWrapper } from "@/components/ui/Wrappers/TableWrapper";
import useBusinesses from "@/hooks/useBusinesses";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import { columns } from "./columns";

const ResumedTable = () => {
  const businesses = useBusinesses();
  const { expensesByCategory } = useMonthExpenses();

  const mappedExpensesByCategory =
    expensesByCategory?.map((expenses) => {
      return { value: expenses.amount, name: expenses.category };
    }) || [];

  mappedExpensesByCategory.sort((a, b) => b.value - a.value);

  if (!businesses.data || !expensesByCategory) return;
  return (
    <div className="w-full min-w-8">
      <TableWrapper
        columns={columns(businesses.data)}
        data={mappedExpensesByCategory}
      />
    </div>
  );
};

export default ResumedTable;