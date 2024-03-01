"use client";

import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import SlotCounter from "react-slot-counter";
import "./index.css";

import { H3 } from "@/components/ui/h3";
import AddExpense from "./AddExpense/AddExpense";
import AddIncome from "./AddIncome";

const MainValue = () => {
  const { totalExpenses, sumOfExcludedTotalExpenses } = useMonthExpenses();
  const { totalIncomes, sumOfExcludedTotalIncomes } = useMonthIncomes();

  const balanceOfExcluded =
    sumOfExcludedTotalIncomes - sumOfExcludedTotalExpenses;

  const cumulativeIncomes =
    parseFloat(totalIncomes) -
    sumOfExcludedTotalIncomes +
    (balanceOfExcluded > 0 ? balanceOfExcluded : 0);
  const cumulativeExpenses =
    parseFloat(totalExpenses) -
    sumOfExcludedTotalExpenses +
    (balanceOfExcluded < 0 ? balanceOfExcluded : 0);

  if (!totalExpenses || !totalIncomes) return;

  return (
    <div className="flex justify-around items-center gap-2">
      <div className="bg-slate-200 px-4 py-2 rounded-md flex justify-center items-center gap-2">
        <H3 className="  text-emerald-600  text-2xl font-semibold ">
          {cumulativeIncomes.toFixed(0)}
        </H3>
        <H3 className="  text-red-600  text-2xl font-semibold ">{`-${cumulativeExpenses.toFixed(
          0
        )}`}</H3>
        <div className="flex items-center">
          <H3 className="text-color-black text-2xl font-semibold">$</H3>
          <SlotCounter
            separatorClassName="slot"
            charClassName="slot"
            value={(cumulativeIncomes - cumulativeExpenses).toFixed(2)}
          />
        </div>
      </div>
      <AddExpense />
      <AddIncome />
    </div>
  );
};

export default MainValue;
