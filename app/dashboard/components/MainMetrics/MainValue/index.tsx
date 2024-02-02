"use client";

import { H1 } from "@/components/ui/h1";
import { H2 } from "@/components/ui/h2";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";

const MainValue = () => {
  const expensesQuery = useExpenses();
  const incomesQuery = useIncomes();

  const totalExpenses = expensesQuery.data?.metaData.totalAmount || 0;
  const totalIncomes = incomesQuery.data?.metaData.totalAmount || 0;

  return (
    <div className="bg-slate-200 p-3 rounded-md flex items-end justify-center h-full flex-col ">
      <div className="flex flex-col text-right mr-4">
        <H2>{totalIncomes.toString()}</H2>
        <H2>{`-${totalExpenses.toString()}`}</H2>
        <H1>{`$${(totalIncomes - totalExpenses).toString()}`}</H1>
      </div>
    </div>
  );
};

export default MainValue;
