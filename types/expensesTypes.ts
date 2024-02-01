export type ExpensesQuery = {
  data: Expense[];
  metaData: {
    totalEntries: number;
    totalAmount: number;
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
