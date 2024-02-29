import z from "zod";

export const totalSettingsSchema = z.object({
  balances: z.record(z.boolean().optional()),
});

export type TotalSettings = z.infer<typeof totalSettingsSchema>;
