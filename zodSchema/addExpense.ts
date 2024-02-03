import z from "zod";

export const addExpenseSchema = z.object({
  businessId: z.string(),
  note: z.string().optional(),
  category: z.string(),
  amount: z.coerce.number(),
});

export type AddExpense = z.infer<typeof addExpenseSchema>;
