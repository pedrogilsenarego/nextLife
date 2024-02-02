"use client";
import { H2 } from "@/components/ui/h2";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import SlotCounter from "react-slot-counter";
import "./index.css";

const MainValue = () => {
  const expensesQuery = useExpenses();
  const incomesQuery = useIncomes();

  const totalExpenses = expensesQuery.data?.metaData.totalAmount || 0;
  const totalIncomes = incomesQuery.data?.metaData.totalAmount || 0;

  return (
    <div className="bg-slate-200 p-3 rounded-md flex items-end justify-center h-full flex-col ">
      <div className="flex flex-col text-right mr-4">
        <H2 className="scroll-m-20 border-b text-emerald-600 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          {totalIncomes.toString()}
        </H2>
        <H2 className="scroll-m-20 border-b text-red-600 pb-2 text-2xl font-semibold tracking-tight first:mt-0">{`-${totalExpenses.toString()}`}</H2>
        <SlotCounter
          charClassName="slot"
          value={totalIncomes - totalExpenses}
        />
      </div>
    </div>
  );
};

export default MainValue;
