import z from "zod";

export const addIncomeSchema = z.object({
  businessId: z.string(),
  note: z.string().optional(),
  category: z.string(),
  amount: z.coerce.number(),
});

export type AddIncome = z.infer<typeof addIncomeSchema>;
