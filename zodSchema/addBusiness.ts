import z from "zod";

export const loginSchema = z.object({
  businessName: z.string().min(3),
});

export type AddBusiness = z.infer<typeof loginSchema>;
