export type IncomesQuery = {
  data: Income[];
  metaData: {
    totalEntries: number;
    totalAmount: number;
  };
};

export type Income = {
  businessId: string;
  note: string;
  userId: string;
  created_at: Date;
  id: string;
  category: string;
  amount: number;
};
