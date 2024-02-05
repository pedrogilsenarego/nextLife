"use client";

import LineChartComponent from "@/components/ChartComponents/LineChartComponent";
import { Card } from "@/components/ui/card";
import useExpenses from "@/hooks/useExpenses";
import useIncomes from "@/hooks/useIncomes";
import { buildData } from "./utils";

const ChartCard = () => {
  const { expenses } = useExpenses();
  const { incomes } = useIncomes();
  const expensesData = expenses || [];
  const incomesData = incomes || [];
  const data = buildData(expensesData, incomesData);

  return (
    <Card
      style={{ boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.15)" }}
      className="w-full flex bg-white items-start p-3 rounded-md gap-4"
    >
      <LineChartComponent data={data} />
    </Card>
  );
};

export default ChartCard;
