export type ByCategory = {
  name: string;
  value: number;
};

export type ExpensesQuery = {
  data: Expense[];
  metaData: {
    totalEntries: number;
    totalAmount: number;
    byCategory: ByCategory[];
  };
};

export type Expense = {
  businessId: string;
  note: string;
  userId: string;
  created_at: Date;
  id: string;
  category: string;
  amount: number;
};
