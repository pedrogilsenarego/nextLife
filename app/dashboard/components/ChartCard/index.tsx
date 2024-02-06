"use client";

import BarChartComponent from "@/components/ChartComponents/BarChartComponent";
import { Card } from "@/components/ui/card";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import { dataByMonth } from "@/utils/dataRearrange";
import { buildData } from "./utils";

const ChartCard = () => {
  const { expensesByCategory } = useMonthExpenses();
  const { incomesByCategory } = useMonthIncomes();

  if (!expensesByCategory || !incomesByCategory) return;

  const data = buildData(
    dataByMonth(expensesByCategory),
    dataByMonth(incomesByCategory)
  );

  return (
    <Card
      style={{ boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.15)" }}
      className="w-full flex bg-white items-start p-3 rounded-md gap-4"
    >
      <BarChartComponent data={data} />
    </Card>
  );
};

export default ChartCard;
