import { Card } from "@/components/ui/card";
import { H3 } from "@/components/ui/h3";
import { P } from "@/components/ui/p";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";

const InfoTable = () => {
  const { incomes: cumulativeIncomes } = useMonthIncomes();
  const { expenses: cumulativeExpenses } = useMonthExpenses();
  const IVA = parseFloat(cumulativeIncomes) * 0.23;
  const profit = (
    parseFloat(cumulativeIncomes) * 0.77 -
    parseFloat(cumulativeExpenses)
  ).toFixed(0);
  const IRC = parseFloat(profit) < 0 ? 0 : parseFloat(profit) * 0.17;
  const IRS = parseFloat(profit) < 0 ? 0 : parseFloat(profit) * 0.35;

  return (
    <Card className="p-2 rounded-sm">
      <div className="flex w-full justify-between">
        <P>Profit</P>
        <P>{profit}</P>
      </div>
      <div className="flex w-full justify-between">
        <P>IVA</P>
        <P>{IVA}</P>
      </div>
      <div className="flex w-full justify-between">
        <P>IRC</P>
        <P>{IRC}</P>
      </div>
      <div className="flex w-full justify-between">
        <P>IRS</P>
        <P>{IRS}</P>
      </div>
    </Card>
  );
};

export default InfoTable;
