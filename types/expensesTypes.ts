export type ByCategory = {
  name: string;
  value: number;
};

export type ExpensesQuery = {
  data: Expense[];
  metaData: {
    totalEntries: number;
  };
};

export type Expense = {
  businessId: string;
  note: string;
  user_id: string;
  created_at: Date;
  id: string;
  category: string;
  amount: number;
};

export type MonthExpensesQuery = {
  data: MonthExpense[];
  metaData: {
    totalEntries: number;
  };
};

export type MonthExpense = {
  businessId: string;
  user_id: string;
  created_at: Date;
  id: string;
  category: string;
  amount: number;
};
