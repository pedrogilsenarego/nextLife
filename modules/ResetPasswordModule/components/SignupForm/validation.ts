import { z } from "zod";

// Define the validation schema
export const signupSchema = z
  .object({
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type Signup = z.infer<typeof signupSchema>;
