import z from "zod";

export const addBusinessSchema = z.object({
  businessName: z.string().min(3),
  type: z.coerce.number(),
});

export type AddBusiness = z.infer<typeof addBusinessSchema>;
