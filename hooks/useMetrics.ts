import useBusinesses from "./useBusinesses";
import useMonthExpenses from "./useMonthExpenses";
import useMonthIncomes from "./useMonthIncomes";

const useMetrics = () => {
  const { businesses: businessesQuery } = useBusinesses();
  const { incomesByBusiness } = useMonthIncomes();
  const { expensesByBusiness } = useMonthExpenses();
  const { incomesByBusiness: incomesByBusinessAnual } =
    useMonthIncomes("1year");
  const { expensesByBusiness: expensesByBusinessAnual } =
    useMonthExpenses("1year");

  const cards = () => {
    if (
      !businessesQuery.data ||
      !incomesByBusiness ||
      !expensesByBusiness ||
      !incomesByBusinessAnual ||
      !expensesByBusinessAnual
    )
      return [];

    const mapedData: any[] = businessesQuery?.data.map((business: any) => {
      const expenseAnual = Math.floor(
        expensesByBusinessAnual?.find(
          (expense) => expense.businessId === business.id
        )?.amount || 0
      );

      const expense = Math.floor(
        expensesByBusiness?.find(
          (expense) => expense.businessId === business.id
        )?.amount || 0
      );

      const rawIncome =
        incomesByBusiness?.find((income) => income.businessId === business.id)
          ?.amount || 0;

      const rawIncomeAnual =
        incomesByBusinessAnual?.find(
          (income) => income.businessId === business.id
        )?.amount || 0;

      const ivaAnual = Math.floor(
        rawIncomeAnual * (business.type === 1 ? 0.23 : 0)
      );
      const iva = Math.floor(rawIncome * (business.type === 1 ? 0.23 : 0));

      const incomeAfterIvaAnual =
        business.type === 1 ? rawIncomeAnual - ivaAnual : 0;
      const incomeAfterIva = business.type === 1 ? rawIncome - iva : 0;

      const anualProfit = incomeAfterIvaAnual - expenseAnual;
      const profit = incomeAfterIva - expense;

      const irsAnual = Math.floor(
        Math.max(anualProfit * (business.type === 1 ? 0.35 : 0), 0)
      );
      const irs = Math.floor(
        Math.max(profit * (business.type === 1 ? 0.35 : 0), 0)
      );
      const ircAnual = Math.floor(
        Math.max(anualProfit * (business.type === 1 ? 0.17 : 0), 0)
      );
      const irc = Math.floor(
        Math.max(profit * (business.type === 1 ? 0.17 : 0), 0)
      );

      const incomeAnual =
        business.type === 1 ? incomeAfterIvaAnual - irsAnual : rawIncomeAnual;

      const income = business.type === 1 ? incomeAfterIva - irs : rawIncome;

      return {
        businessType: business.type,
        businessId: business.id,
        businessName: business.businessName,
        income,
        incomeAnual,
        expense,
        ivaAnual,
        irsAnual,
        ircAnual,
        balance: income - expense,
      };
    });

    return mapedData;
  };

  return { cards };
};

export default useMetrics;
