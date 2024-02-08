"use client";

import BarChartComponent from "@/components/ChartComponents/BarChartComponent";
import LineChartComponent from "@/components/ChartComponents/LineChartComponent";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import { dataByMonth } from "@/utils/dataRearrange";
import { buildData } from "./utils";

const Chart = () => {
  const { expensesByCategory } = useMonthExpenses();
  const { incomesByCategory } = useMonthIncomes();

  if (!expensesByCategory || !incomesByCategory) return;

  const data = buildData(
    dataByMonth(expensesByCategory),
    dataByMonth(incomesByCategory)
  );

  return <LineChartComponent data={data} />;
};

export default Chart;
