"use client";
import LineChartComponent from "@/components/ChartComponents/LineChartComponent";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import { dataByMonth } from "@/utils/dataRearrange";
import { buildData } from "./utils";

const Chart = () => {
  const { expensesByMonth } = useMonthExpenses();
  const { incomesByMonth } = useMonthIncomes();

  if (!expensesByMonth || !incomesByMonth) return;
  const data = buildData(
    dataByMonth(expensesByMonth),
    dataByMonth(incomesByMonth)
  );

  if (data.length <= 0) return;

  return <LineChartComponent data={data} />;
};

export default Chart;
