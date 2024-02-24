import { P } from "@/components/ui/p";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import SlotCounter from "react-slot-counter";
import "./index.css";
import BusinessSelectModal from "./BusinessSelectModal";

const HeaderMobile = () => {
  const { expenses: cumulativeExpenses } = useMonthExpenses();
  const { incomes: cumulativeIncomes } = useMonthIncomes();

  return (
    <div
      className="
        flex justify-between px-5 fixed top-0 w-full bg-white  p-2 border-b border-slate-500 border-solid z-20"
    >
      <BusinessSelectModal />
      <div className="flex items-center">
        <P className="  text-slate-600 text-xs font-semibold ">
          {Number(cumulativeIncomes).toFixed(0) || 0}
        </P>
        <P className="  text-slate-600 text-xs font-semibold ">
          &nbsp;{`- ${Number(cumulativeExpenses).toFixed(0) || 0}`}
        </P>
        <div className="border border-solid border-2 border-primary rounded-md px-1 flex ml-1 items-center">
          <P className="text-primary text-xs font-semibold "> $</P>
          <div className="flex items-center pt-1 ">
            <SlotCounter
              separatorClassName="slot"
              charClassName="slot"
              value={(
                Number(cumulativeIncomes) - Number(cumulativeExpenses)
              ).toFixed(0)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
