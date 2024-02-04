export type IncomesQuery = {
  data: Income[];
  metaData: {
    totalEntries: number;
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

export type MonthIncomesQuery = {
  data: MonthIncome[];
  metaData: {
    totalEntries: number;
  };
};

export type MonthIncome = {
  businessId: string;
  userId: string;
  created_at: Date;
  id: string;
  category: string;
  amount: number;
};
