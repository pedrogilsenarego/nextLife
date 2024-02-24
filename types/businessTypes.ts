export type Business = {
  businessName: string;
  user_id: string;
  created_at: Date;
  id: string;
  type: number;
};

export type BusinessesQuery = Business[];
