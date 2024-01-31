"use client";
import { queryKeys } from "@/constants/queryKeys";
import { getBusinesses } from "@/server/businessActions";
import { useQuery } from "react-query";
import RoundShow from "../../../../components/ChartComponents/RoundShow";
import AddExpense from "./AddExpense";

export default function () {
  return (
    <div className="flex gap-4">
      <RoundShow value={4554} currency="$" percentage={23} />
      <div className=" flex flex-col items-center justify-around">
        <AddExpense />
        <AddExpense />
      </div>
    </div>
  );
}
