import FooterMobile from "@/components/LayoutComponents/FooterMobile";
import Loader from "@/components/Loader";
import useMonthExpenses from "@/hooks/useMonthExpenses";
import useMonthIncomes from "@/hooks/useMonthIncomes";
import DashBoardMobile from "@/modules/Business/DashBoardMobile";

const PreDashBoardMobile = () => {
  const { expensesQuery } = useMonthExpenses();
  const { incomesQuery } = useMonthIncomes();
  return expensesQuery?.isLoading || incomesQuery?.isLoading ? (
    <Loader />
  ) : (
    <>
      <DashBoardMobile />
      <FooterMobile />
    </>
  );
};

export default PreDashBoardMobile;
