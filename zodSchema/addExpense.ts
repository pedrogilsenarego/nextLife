import z from "zod";

export const addExpenseSchema = z.object({
  businessId: z.string(),
  note: z.string().optional(),
  category: z.string(),
  amount: z.coerce.number(),
  created_at: z.date(),
});

export type AddExpense = z.infer<typeof addExpenseSchema>;
