export const buildData = (expenses: any[], incomes: any[]) => {
  // Convert expenses and incomes to arrays with { date, amount } format
  const expensesData = expenses.map((expense) => ({
    date: new Date(expense.date).toISOString(),
    amount: expense.amount,
  }));

  const incomesData = incomes.map((income) => {
    return {
      date: new Date(income.date).toISOString(),
      amount: income.amount,
    };
  });

  // Create a map to store merged data
  const mergedDataMap = new Map<
    string,
    { xAxis: string; uv: number; pv: number }
  >();

  // Process expenses
  for (const expense of expensesData) {
    const existingDataPoint = mergedDataMap.get(expense.date);
    if (existingDataPoint) {
      existingDataPoint.uv += expense.amount;
    } else {
      mergedDataMap.set(expense.date, {
        xAxis: expense.date,
        uv: expense.amount,
        pv: 0,
      });
    }
  }

  // Process incomes
  for (const income of incomesData) {
    const existingDataPoint = mergedDataMap.get(income.date);
    if (existingDataPoint) {
      existingDataPoint.pv += income.amount;
    } else {
      mergedDataMap.set(income.date, {
        xAxis: income.date,
        uv: 0,
        pv: income.amount,
      });
    }
  }

  // Convert the Map to an array of merged data points
  const mergedData = Array.from(mergedDataMap.values());

  // Sort the merged array based on the 'date' property
  mergedData.sort((a, b) => a.xAxis.localeCompare(b.xAxis));

  return mergedData;
};
