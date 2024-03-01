"use client";
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

  if (data.length <= 0) return;

  return <LineChartComponent data={data} />;
};

export default Chart;
