"use client";
import { buildData } from "@/app/[slug]/components/MainCard/Chart/utils";
import LineChartComponent from "@/components/ChartComponents/LineChartComponent";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import { dataByMonth } from "@/utils/dataRearrange";

type Props = {
  business: string;
};

const Chart = ({ business }: Props) => {
  const { getExpensesByMonth } = useMonthExpenses();
  const { getIncomesByMonth } = useMonthIncomes();

  const data = buildData(
    dataByMonth(getExpensesByMonth(business)),
    dataByMonth(getIncomesByMonth(business))
  );

  if (data.length <= 0) return;

  return <LineChartComponent data={data} />;
};

export default Chart;
