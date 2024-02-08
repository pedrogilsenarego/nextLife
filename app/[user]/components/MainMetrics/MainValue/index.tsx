"use client";
import { H1 } from "@/components/ui/h1";
import { H2 } from "@/components/ui/h2";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import SlotCounter from "react-slot-counter";
import "./index.css";

const MainValue = () => {
  const { expenses: cumulativeExpenses } = useMonthExpenses();
  const { incomes: cumulativeIncomes } = useMonthIncomes();

  if (!cumulativeExpenses || !cumulativeIncomes) return;

  return (
    <div className="bg-slate-200 p-3 rounded-md flex items-end justify-center h-full flex-col ">
      <div className="flex flex-col text-right mr-4">
        <H2 className="scroll-m-20 border-b text-emerald-600 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          {cumulativeIncomes.toString()}
        </H2>
        <H2 className="scroll-m-20 border-b text-red-600 pb-2 text-2xl font-semibold tracking-tight first:mt-0">{`-${cumulativeExpenses.toString()}`}</H2>
        <div className="flex items-center">
          <H1>$</H1>
          <SlotCounter
            separatorClassName="slot"
            charClassName="slot"
            value={(
              Number(cumulativeIncomes) - Number(cumulativeExpenses)
            ).toFixed(2)}
          />
        </div>
      </div>
    </div>
  );
};

export default MainValue;
