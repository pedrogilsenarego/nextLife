"use client";
import { H1 } from "@/components/ui/h1";
import { H2 } from "@/components/ui/h2";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import SlotCounter from "react-slot-counter";
import "./index.css";

import { H3 } from "@/components/ui/h3";
import AddExpense from "./AddExpense/AddExpense";
import AddIncome from "./AddIncome";

const MainValue = () => {
  const { expenses: cumulativeExpenses } = useMonthExpenses();
  const { incomes: cumulativeIncomes } = useMonthIncomes();

  if (!cumulativeExpenses || !cumulativeIncomes) return;

  return (
    <div className="flex justify-around items-center gap-2">
      <div className="bg-slate-200 px-4 py-2 rounded-md flex justify-center items-center gap-2">
        <H3 className="  text-emerald-600  text-2xl font-semibold ">
          {cumulativeIncomes.toString()}
        </H3>
        <H3 className="  text-red-600  text-2xl font-semibold ">{`-${cumulativeExpenses.toString()}`}</H3>
        <div className="flex items-center">
          <H3 className="text-color-black text-2xl font-semibold">$</H3>
          <SlotCounter
            separatorClassName="slot"
            charClassName="slot"
            value={(
              Number(cumulativeIncomes) - Number(cumulativeExpenses)
            ).toFixed(2)}
          />
        </div>
      </div>
      <AddExpense />
      <AddIncome />
    </div>
  );
};

export default MainValue;
